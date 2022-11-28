from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from chats.authentication import BearerAuthentication

from rest_framework.decorators import api_view,authentication_classes
from chats.models import Profile
from math import sin, cos, sqrt, atan2, radians


def calculate_distance(pointA, pointB):

    # approximate radius of earth in km
    R = 6371.0

    lat1 = radians(pointA[0])
    lon1 = radians(pointA[1])
    lat2 = radians(pointB[0])
    lon2 = radians(pointB[1])

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    distance = R * c
    return distance

def str2list(rawstr):
    temp = rawstr.split(",")
    return [float((temp[0]).strip()), float(temp[1].strip())]

from itertools import chain
@api_view(['GET'])
@authentication_classes([BearerAuthentication])
def location(request):
    print(request.user)

    aaa=Profile.objects.all().exclude(pk=request.user.pk).values("location")
    bbb= User.objects.all().exclude(pk=request.user.pk).values("username")

    user_list = aaa.union(bbb)
    print(user_list)
    # exit(0)
    a={}
    # for i in list(user_list):
    # # print(i.get("location"))  

    #     temp_username = i.get("user_id")
    #     temp_location = i.get("location")
    #     print(i)
    #     exit(0)
    #     print(f"the distance from Meee to {temp_username} la "+str(calculate_distance(aaa, str2list(temp_location))))
    #     # print(temp_username)

    #     a.update({temp_username:temp_location+"|"+str(calculate_distance(aaa, str2list(temp_location)))})


    
    
    return JsonResponse(list(a),safe=False)