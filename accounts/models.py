from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from rest_framework.response import Response

class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    joined_at = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    
    def __str__(self):
        return self.username