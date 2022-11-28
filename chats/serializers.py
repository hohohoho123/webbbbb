import datetime

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework import serializers

from chats.models import Message
from chats.models import Profile


class MessageSerializer(serializers.Serializer):
    text = serializers.CharField()
    read = serializers.BooleanField(read_only=True)
    date_time = serializers.DateTimeField(required=False)
    sender_id = serializers.IntegerField(read_only=True)
    receiver = serializers.SlugField(write_only=True)

    def create(self, validated_data,):
        try:
            user = User.objects.get(username=validated_data['receiver'])
            message = Message()
            message.text = validated_data['text']
            message.sender = self.context['request'].user
            message.receiver = user
            print(message.receiver)
            message.save()
            # self.__broadcast(message)
            
            
            return validated_data
        except Exception as e:
            raise Exception('Error', e)

    # def __broadcast(self, message: Message):
    #     serializer = MessageModelSerializer(message, many=False)
    #     n_message = serializer.data
    #     n_message['read'] = False
    #     print("[+1]"+str(n_message))
    #     channel_layer = get_channel_layer()
    #     async_to_sync(channel_layer.group_send)(
    #         f'chat_{message.receiver.username}', {
    #             'type': 'new_message',
    #             'message': n_message
    #         }
    #     )


class MessageModelSerializer(serializers.ModelSerializer):
    sender = serializers.CharField(read_only=True, source='sender.username')
    read = serializers.BooleanField(default=True)

    class Meta:
        model = Message
        fields = ('text', 'sender', 'date_time', 'read')


class UsersWithMessageSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    photo = serializers.ImageField(source='profile.photo')
    online = serializers.BooleanField(source='profile.online')
    status = serializers.CharField(source='profile.status')
    messages = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('name', 'username', 'photo', 'online', 'status', 'messages')

    def get_name(self, obj):
        if obj.username:
            return obj.get_full_name()
        return obj.username

    def get_messages(self, obj):
        messages = Message.objects.filter(
            Q(receiver=obj, sender=self.context['request'].user) |
            Q(sender=obj, receiver=self.context['request'].user)).prefetch_related('sender', 'receiver')
        serializer = MessageModelSerializer(messages.order_by('date_time'), many=True)
        return serializer.data

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    photo = serializers.ImageField(source='profile.photo')
    online = serializers.BooleanField(source='profile.online')
    status = serializers.CharField(source='profile.status')
    messages = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('name', 'username', 'photo', 'online', 'status', 'messages')

    def get_name(self, obj):
        if obj.first_name:
            return obj.get_full_name()
        return obj.username

    def get_messages(self, obj):
        return []



class ProfileSerializer(serializers.ModelSerializer):
    # name = serializers.SerializerMethodField()
    photo = serializers.ImageField(source='profile.photo')
    online = serializers.BooleanField(source='profile.online')
    gender = serializers.CharField(source='profile.gender')
    relationship = serializers.CharField(source='profile.relationship')
    location = serializers.CharField(source='profile.location')
    detaillocation = serializers.CharField(source='profile.detaillocation')
    phone_number = serializers.CharField(source='profile.phone_number')
    class Meta:
        model = User
        fields = ( 'username', 'photo', 'online','phone_number','gender','relationship','detaillocation','location')

    # def get_name(self, obj):
    #     if obj.first_name:
    #         return obj.get_full_name()
    #     return obj.username
        # print(obj,"dddd")

    # def perform_create(self, obj):
    #     return []



# class LocationSerializer(serializers.ModelSerializer):
   
#     location = serializers.CharField()
#     detaillocation = serializers.CharField()
#     # location = serializers.CharField(source='profile.location')
#     # detaillocation = serializers.CharField(source='profile.detaillocation')
#     username =  serializers.CharField(source='user.username')
    
    
#     class Meta:
#         model = User
#         fields = ('detaillocation','location',"username")


    # def get_name(self, obj):
    #     pass
        # if obj.location:
        #     print(1)
        #     print(obj.location)
        #     return obj.get_full_name()
        # print(11111111111)
        # return obj.detaillocation


# class UserSerializer(serializers.ModelSerializer):

#     name = serializers.SerializerMethodField()
#     online = serializers.BooleanField(source='profile.online')
#     status = serializers.CharField(source='profile.status')
#     gender = serializers.CharField(source='profile.gender')
#     relationship = serializers.CharField(source='profile.relationship')
#     location = serializers.CharField(source='profile.location')
#     detaillocation = serializers.CharField(source='profile.detaillocation')
#     phone_number = serializers.CharField(source='profile.phone_number')
    
#     class Meta:
#         model = User
#         fields = ('name', 'username','online', 'status', 'gender','relationship','location','detaillocation','phone_number')

class UpdateUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ('name', 'status', 'gender','relationship','location','detaillocation','phone_number')
        # extra_kwargs = {
        #     'first_name': {'required': True},
        #     'last_name': {'required': True},
        # }

    # def validate_email(self, value):
    #     user = self.context['request'].user
    #     if User.objects.exclude(pk=user.pk).filter(email=value).exists():
    #         raise serializers.ValidationError({"email": "This email is already in use."})
    #     return value

    # def validate_username(self, value):
    #     user = self.context['request'].user
    #     if User.objects.exclude(pk=user.pk).filter(username=value).exists():
    #         raise serializers.ValidationError({"username": "This name is already in use."})
    #     return value

    def update(self, instance, validated_data):
        # instance.first_name = validated_data['first_name']
        # instance.last_name = validated_data['last_name']
        # instance.email = validated_data['email']
        instance.name = validated_data['name']
        instance.name = validated_data['status']
        instance.name = validated_data['gender']
        instance.name = validated_data['relationship']
        instance.name = validated_data['detaillocation']
        instance.name = validated_data['location']
        instance.name = validated_data['phone_number']
        instance.save()

        return instance
        
class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password", "first_name", "last_name", "email")
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        user = super(RegistrationSerializer, self).create(validated_data)
        # self.__notify_others(user)
        return validated_data

    def __notify_others(self, user):
        serializer = UserSerializer(user, many=False)
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            'notification', {
                'type': 'new_user_notification',
                'message': serializer.data
            }
        )


class ChangePasswordSerializer(serializers.Serializer):
    model = User

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
