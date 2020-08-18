from datetime import timedelta

from django.conf import settings
from django.utils import timezone
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import AuthenticationFailed


def expires_in(token):
    """Returns time left in seconds of given token"""
    time_elapsed = timezone.now() - token.created
    time_left = timedelta(seconds=settings.TOKEN_EXPIRED_AFTER_SECONDS) - time_elapsed

    return time_left


def is_token_expired(token):
    """Checks whether given token is already expired"""
    return expires_in(token) < timedelta(seconds=0)


def token_expire_handler(token):
    """Returns the token itself if not yet expired. If expired, deletes the token, creates a new one and return it"""
    is_expired = is_token_expired(token)
    if is_expired:
        token.delete()
        token = Token.objects.create(user=token.user)

    return is_expired, token

class ExpiringTokenAuthentication(TokenAuthentication):
    """
    Extends default token authentication to have time-based expiration
    Based on https://medium.com/@yerkebulan199/django-rest-framework-drf-token-authentication-with-expires-in-a05c1d2b7e05
    """

    def authenticate_credentials(self, key):
        try:
            token = Token.objects.get(key=key)
        except Token.DoesNotExist:
            raise AuthenticationFailed("Invalid Token")

        if not token.user.is_active:
            raise AuthenticationFailed("User is not active")

        is_expired, token = token_expire_handler(token)
        if is_expired:
            raise AuthenticationFailed("The Token is expired")

        return (token.user, token)
