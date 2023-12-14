from django.contrib.auth.models import User
from django.db import models

class UserProfile(models.Model):
    id = models.AutoField(primary_key=True)
    token = models.CharField(max_length=255)
    name = models.CharField(max_length=20)

    def __str__(self):
        return f"UserProfile for {self.name}"

class bgColor(models.Model):
    color = models.CharField(max_length=255)