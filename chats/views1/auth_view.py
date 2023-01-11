import json

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.contrib.auth.models import User
from django.core import serializers
from django.http import HttpResponse

# Create your views here.
from django.shortcuts import render
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication, BasicAuthentication, SessionAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from chats.authentication import BearerAuthentication
from chats.serializers import RegistrationSerializer, UsersWithMessageSerializer, UserSerializer, UpdateUserSerializer


from rest_framework import viewsets, permissions
from chats.serializers import *
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from chats.models import Profile
from django.utils import timezone
from django.conf import settings
from datetime import timedelta



class Login(ObtainAuthToken):

    def post(self, request):

        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)



        #test code

        # is_expired, token = token_expire_handler(token)


        #============



        self.__change_status(user)
        serialize_user = UserSerializer(user, many=False)
        return Response({
            'token': token.key,
            'user': serialize_user.data,
            'expires_in': expires_in(token),
        })
   
    def __change_status(self, user: User):

        profile = user.profile
        profile.online = True
        profile.save()
        print(user)
        a=User.objects.filter(username=profile.user).first()
        notify_others(a)

    # def notify_others(self,user: User,is_online):

    #     # serializer = UserSerializer(user, many=False)
    #     aa=Profile.objects.filter(online=is_online)
    #     bb=""
    #     for i in aa:
    #         bb+=str(i)+","
    #     print(bb)
    #     channel_layer = get_channel_layer()
    #     async_to_sync(channel_layer.group_send)(
    #         'notification', {
    #             'type': 'new_messagechat',
    #             'message': bb[0:-1]
    #         }
    #     )
    
    # def new_messagechat(self, event):
    #     print("vao khi login ne")
    #     message = event['message']
    #     self.send(text_data=json.dumps({
    #         'online': True,
    #         "user":str(message)
            
    #     }))




def expires_in(token):
    time_elapsed = timezone.now() - token.created
    left_time = timedelta(seconds = settings.TOKEN_EXPIRED_AFTER_SECONDS) - time_elapsed
    return left_time

# token checker if token expired or not
def is_token_expired(token):
    return expires_in(token) < timedelta(seconds = 0)

# if token is expired new token will be established
# If token is expired then it will be removed
# and new one with different key will be created
def token_expire_handler(token):
    is_expired = is_token_expired(token)
    if is_expired:
        token.delete()
        token = Token.objects.create(user = token.user)
    return is_expired, token




class Profilene(generics.ListAPIView):
    def get(self,requests):
         return Response({
            "oke":1
        })



class RegisterView(CreateAPIView):
    serializer_class = RegistrationSerializer

    def post(self, request, *args, **kwargs):
        super(RegisterView, self).post(request, *args, **kwargs)
        return Response({'message': 'Registration success, now you can login'})


class LogOutView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication, BearerAuthentication]

    def post(self, request, format=None):
        profile = request.user.profile
        profile.online = False
        profile.save()
        print("user la ",request.user)
        # aaa = Login()
        

        
        a=User.objects.filter(username=request.user).first()
        notify_others(a)
        
        
        # notify_others(request.user)
        return Response({'message': 'logout'})

def notify_others(user: User):


    serializer = UserSerializer(user, many=False)
    channel_layer = get_channel_layer()
    print("notify after log out")
    bb=""
    aa=Profile.objects.filter(online=True)
    for i in aa:
        bb+=str(i)+","
    async_to_sync(channel_layer.group_send)(
        'notification', {
            'type': 'new_messagechat',
            'message': bb[0:-1]
        }
    )

    #     # serializer = UserSerializer(user, many=False)
    #     aa=Profile.objects.filter(online=is_online)
    #     bb=""
    #     print("debug 11111")
    #     for i in aa:
    #         bb+=str(i)+","
    #     channel_layer = get_channel_layer()
    #     print(bb)
    #     async_to_sync(channel_layer.group_send)(
    #         'notification', {
    #             'type': 'new_messagechat',
    #             'message': bb[0:-1]
    #         }
    #     )
    
    # def new_messagechat(self, event):
    #     print("thong bao khi log out")
    #     message = event['message']
    #     self.send(text_data=json.dumps({
    #         'online': True,
    #         "user":str(message)
            
    #     }))



class UsersView(generics.ListAPIView):
    serializer_class = UsersWithMessageSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication, BearerAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        users = User.objects.exclude(pk=self.request.user.pk).order_by('-profile__online').all()
        # print(users)
        return users


# def notify_others(user: User):
#     serializer = UserSerializer(user, many=False)
#     channel_layer = get_channel_layer()
#     print('noti neeeeeee')
#     async_to_sync(channel_layer.group_send)(
#         'notification', {
#             'type': 'user_online',
#             'message': serializer.data
#         }
#     )


def room(request, room_name):
    return render(request, "testroom.html", {"room_name": room_name})

# Change Password
from rest_framework import status
from chats.serializers import ChangePasswordSerializer
from rest_framework.permissions import IsAuthenticated   

class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User

    authentication_classes = [SessionAuthentication, BasicAuthentication, BearerAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# from django.dispatch import receiver
# from django.urls import reverse
# from django_rest_passwordreset.signals import reset_password_token_created
# from django.core.mail import send_mail  
# @receiver(reset_password_token_created)
# def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

#     email_plaintext_message = "{}?token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key)

#     send_mail(
#         # title:
#         "Password Reset for {title}".format(title="Some website title"),
#         # message:
#         email_plaintext_message,
#         # from:
#         "noreply@somehost.local",
#         # to:
#         [reset_password_token.user.email]
#     )
#Profile



class LeadViewset(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    authentication_classes =[SessionAuthentication, BasicAuthentication, BearerAuthentication]
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def get_queryset(self):
        a=User.objects.filter(username=self.request.user)
        return a

    # def perform_create(self, serializer):
    #     print("[+]debug ")
        # serializer.save(user=self.request.user)

    # def get_queryset(self):
    #     a=User.objects.filter(username=self.request.user.username).first()
    #     return self.request.profile.objects.get(user)
    # serialize_user = UserSerializer(user, many=False)
    # user = serializer.validate(user)
    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)

    # def get_queryset(self):
    #     users = User.objects.exclude(pk=self.request.user.pk).order_by('-profile__online').all()
    #     return users
    #     print(a)
    #     return Profile.objects.filter(user=a).update(online=status)

class UpdateProfileView(generics.UpdateAPIView):
    model = User
    authentication_classes = [SessionAuthentication, BasicAuthentication, BearerAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = UpdateUserSerializer
    def get_queryset(self):
        return self.request.user.profile.objects.all()
    






# class Location(viewsets.ModelViewSet):
#     serializer_class = LocationSerializer
#     authentication_classes =[BearerAuthentication]
#     permission_classes = [
#         permissions.IsAuthenticated
#     ]
#     def get_queryset(self):
#         # a=User.objects.filter(username=self.request.user)
#         # result =User.objects.exclude(pk=self.request.user.pk)
#         result =Profile.objects.exclude(pk=self.request.user.pk)
        
#         print(result.values())
#         # print(a.values("location"))

#         aaaa=[{'id': 1, 'user_id': 1, 'photo': 'girl.svg', 'status': "Hi i'm using dj chat", 'online': False, 'gender': 'dwdw', 'relationship': 'dwd', 'description': 'dwdw', 'location': '67.094812, 67.507628', 'detaillocation': 'dwdw', 'phone_number': 'dwdw'}, {'id': 2, 'user_id': 2, 'photo': 'girl.svg', 'status': "Hi i'm using dj chat", 'online': True, 'gender': 'dwdw', 'relationship': 'dwdw', 'description': 'dwdw', 'location': '52.568328, 270.285677', 'detaillocation': 'wdwdw', 'phone_number': 'dwdw'}, {'id': 3, 'user_id': 3, 'photo': 
# 'girl.svg', 'status': "Hi i'm using dj chat", 'online': False, 'gender': 'sqsq', 'relationship': 'sqsq', 'description': 'sqsq', 'location': '20.764320, 108.458947', 'detaillocation': 'sqsq', 'phone_number': 'sqsqsq'}]
#         return aaaa


# class Location(APIView):
#     authentication_classes =[BearerAuthentication]
#     permission_classes = [
#         permissions.IsAuthenticated
#     ]
#     def get(self, request, *args, **kwargs):
#         '''
#         List all the todo items for given requested user
#         '''
#         todos = User.objects.filter(user = request.user.id)
#         serializer = LocationSerializer(todos, many=True)

#         return Response(serializer.data, status=status.HTTP_200_OK)

