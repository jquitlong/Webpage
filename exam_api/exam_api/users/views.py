from django.contrib.auth import authenticate
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from .authentication import token_expire_handler
from .models import User
from .serializers import UserLoginSerializer, UserSerializer


@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    login_serializer = UserLoginSerializer(data=request.data)
    login_serializer.is_valid(raise_exception=True)

    user = authenticate(
        username=login_serializer.data['username'],
        password=login_serializer.data['password']
    )

    if not user:
        raise AuthenticationFailed()

    token, _ = Token.objects.get_or_create(user=user)

    is_expired, token = token_expire_handler(token)
    user_serialized = UserSerializer(user)

    return Response({
        'user': user_serialized.data,
        'token': token.key,
    }, status=HTTP_200_OK)

@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def logout(request):
    """Force logout the user by deleting the token from the database"""
    request.user.auth_token.delete()

    return Response({}, status=HTTP_200_OK)
    
# Create your views here.
@permission_classes((AllowAny,))
class UserViewSet(viewsets.ModelViewSet):
    app_name = 'users'
    model_name = 'user'
    queryset = User.objects.all()
    serializer_class = UserSerializer
