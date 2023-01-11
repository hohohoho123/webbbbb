from django.contrib.auth.models import User
from rest_framework.generics import CreateAPIView
from chats.authentication import BearerAuthentication
from chats.serializers import MessageModelSerializer, MessageSerializer
from rest_framework import viewsets, permissions

class MessageView(CreateAPIView):
    serializer_class = MessageSerializer
    authentication_classes =[BearerAuthentication]
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def post(self, request, *args, **kwargs):
        # user = User.objects.get(pk=1)
        # print("[+-+]"+str(user))
        return self.create(request, *args, **kwargs)
