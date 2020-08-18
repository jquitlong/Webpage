from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils.translation import ugettext_lazy as _

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(db_index=True, max_length=100, unique=True)
    first_name = models.CharField(max_length=100,null=True)
    last_name = models.CharField(max_length=100,null=True)
    address = models.CharField(max_length=100,null=True)
    email_address = models.CharField(max_length=50,null=True)

    USERNAME_FIELD = 'username'
    # USERNAME_FIELD and password are required by default
    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:
        default_permissions = ('add', 'change', 'delete', 'view')
        ordering = ['username']
    
    def __str__(self):
        """
        Returns a string representation of this `User`.
        This string is used when a `User` is printed in the console.
        """
        return self.username