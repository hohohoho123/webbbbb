from django.urls import path

# from chats.views.auth_view import *
from rest_framework.authtoken import views
from django.urls import path, include
from chats.views1.call_view import *
from chats.views1.message_view import *
from chats.views1.auth_view import *
from chats.views1.auth_view import ProfileViewset
from . import views_second
# from chat_app import settings
from rest_framework.routers import DefaultRouter
from rest_framework import routers

img1 = DefaultRouter()
img2 = DefaultRouter()
img1.register(r'imageupload1', ImageUploadViewSet1)
img2.register(r'imageupload2', ImageUploadViewSet2)
router = routers.DefaultRouter()
router.register('profile', LeadViewset, 'profile')
router.register('userprofile', ProfileViewset, 'userprofile')


urlpatterns = [
    path('api-token-auth/', views.obtain_auth_token),
    path('login/', Login.as_view()),
    path('registration/', RegisterView.as_view()),
    path('logout/', LogOutView.as_view()),
    path('users/', UsersView.as_view()),
    path('images/', ImagesView.as_view()),
    path('message/', MessageView.as_view()),
    path('start-call/', StartCall.as_view()),
    path('end-call/', EndCall.as_view()),
    path('', include(img1.urls)),
    path('', include(img2.urls)),
    # path('location/', Location.as_view()),
    path('location/', views_second.location, name='location'),
    path('', include(router.urls)),
    # path('profile/', LeadViewset.as_view()),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    # path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    # path('update_profile/', UpdateProfileView.as_view(), name='auth_update_profile'),
    # path('test-socket/', test_socket),
    # path("<str:room_name>/",room , name="room"),

]
