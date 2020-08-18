from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
    """
    Django requires that custom users define their own Manager class. By
    inheriting from `BaseUserManager`, we get a lot of the same code used by
    Django to create a `User` for free. 
    All we have to do is override the `create_user` function which we will use
    to create `User` objects.
    """

    def create_user(self, username, password=None):
        """
        Create and return a `User` with an email, username and password.
        """
        if username is None:
            raise TypeError('Users must have a username.')

        user = self.model(username=username, is_active=True)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username, password):
        """
        Create and return a `User` with superuser powers.
        Superuser powers means that this use is an admin that can do anything
        they want.
        """
        if password is None:
            raise TypeError('Superusers must have a password.')

        user = self.create_user(username, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user
