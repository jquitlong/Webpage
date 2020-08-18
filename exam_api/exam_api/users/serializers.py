from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'first_name', 'last_name', 'address', 'email_address')

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        
        return user

    def update(self, instance, validated_data):
        for item in validated_data:
            if(not User._meta.get_field(item)):
                continue

            if item == 'password':
                instance.set_password(validated_data['password'])
            else:
                setattr(instance, item, validated_data[item])

        instance.save()
        
        return instance

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, trim_whitespace=False)