from django.contrib.auth.models import User
from django.db import models

# Create your models here.
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE)
    # photo = models.ImageField(null=True, blank=True, default='girl.svg')
    status = models.CharField(default="Hi i'm using dj chat", max_length=255)
    online = models.BooleanField(default=False)
    gender = models.CharField(max_length=10)
    relationship = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    location = models.CharField(max_length=500)
    detaillocation = models.CharField(max_length=500)
    phone_number = models.CharField(max_length=10)
    # date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, *args, **kwargs):
    if created:
        Profile.objects.create(user_id=instance.pk)


class Message(models.Model):
    text = models.TextField()
    date_time = models.DateTimeField(auto_now_add=True, blank=True)
    sender = models.ForeignKey(User, related_name='sender', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='receiver', on_delete=models.CASCADE)



from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail  


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    email_plaintext_message = "{}?token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key)

    send_mail(
        # title:
        "Password Reset for {title}".format(title="Some website title"),
        # message:
        email_plaintext_message,
        # from:
        "lehaquangthinh@gmail.com",
        # to:
        [reset_password_token.user.email]
    )

from django_resized import ResizedImageField
from django.db.models.deletion import CASCADE
class ImageUpload(models.Model):
    title = models.CharField(max_length=50)
    # images = models.ImageField('images')
    images1 = ResizedImageField(scale=0.5, quality=75, upload_to='whatever')
    images2 = ResizedImageField(scale=0.5, quality=75, upload_to='whatever')
    owner = models.OneToOneField(User, related_name="img", null=True, on_delete=CASCADE)
    updated_date = models.DateTimeField(auto_now_add=True)

from datetime import timezone
from rest_framework import viewsets, permissions




class UserProfileModel(models.Model):
    gender = models.CharField(max_length=10)
    relationship = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    location = models.CharField(max_length=500)
    detaillocation = models.CharField(max_length=500)
    user = models.OneToOneField(User, related_name="userprofile", null=True, on_delete=CASCADE)
    phone_number = models.CharField(max_length=10)
    birth_date = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.user

