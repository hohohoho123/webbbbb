from django.contrib import admin

# Register your models here.
from chats.models import UserProfileModel, ImageUpload, Profile
from chats.models import Message

class ProfileModelAdmin(admin.ModelAdmin):
    pass
admin.site.register(UserProfileModel, ProfileModelAdmin)

@admin.register(Profile)
class Profile(admin.ModelAdmin):
    list_display = ('user',  'status', 'online')
admin.register(Message)
class ImageUploadAdmin(admin.ModelAdmin):
    pass
admin.site.register(ImageUpload, ImageUploadAdmin)