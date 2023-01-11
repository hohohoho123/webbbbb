from django.contrib import admin

# Register your models here.
from chats.models import UserProfileModel, ImageUpload1, Profile, ImageUpload2
from chats.models import Message

class ProfileModelAdmin(admin.ModelAdmin):
    pass
admin.site.register(UserProfileModel, ProfileModelAdmin)

@admin.register(Profile)
class Profile(admin.ModelAdmin):
    list_display = ('user',  'status', 'online')
admin.register(Message)
class ImageUploadAdmin1(admin.ModelAdmin):
    pass
admin.site.register(ImageUpload1, ImageUploadAdmin1)

class ImageUploadAdmin2(admin.ModelAdmin):
    pass
admin.site.register(ImageUpload2, ImageUploadAdmin2)