from django.contrib import admin

# Register your models here.
from chats.models import Profile
from chats.models import Message
@admin.register(Profile)
class Profile(admin.ModelAdmin):
    list_display = ('user', 'photo', 'status', 'online')
admin.register(Message)