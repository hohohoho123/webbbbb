from django.contrib.auth.models import User
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated

from chats.serializers import MessageModelSerializer, MessageSerializer


class MessageView(CreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # user = User.objects.get(pk=1)
        # print("[+-+]"+str(user))
        return self.create(request, *args, **kwargs)
