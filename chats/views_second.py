
from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from django.contrib.auth.models import User
from chats.authentication import BearerAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication, BasicAuthentication, SessionAuthentication

from rest_framework.decorators import *
from chats.models import Profile
from math import sin, cos, sqrt, atan2, radians
from django.core import serializers


def calculate_distance(pointA, pointB):

    R = 6371.0
    print(pointA,pointB)
    lat1 = radians(float(pointA[0]))
    lon1 = radians(float(pointA[1]))
    lat2 = radians(float(pointB[0]))
    lon2 = radians(float(pointB[1]))

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    distance = R * c
    return distance


def str2list(rawstr):
    temp = rawstr.split(",")
    return [float((temp[0]).strip()), float(temp[1].strip())]

from rest_framework import viewsets, permissions
@api_view(['GET'])
@authentication_classes([BearerAuthentication,SessionAuthentication])
@permission_classes([permissions.IsAuthenticated])
def location(request):

    all_location = Profile.objects.all()
    user_excluse_me =all_location.exclude(pk=request.user.pk)
    
    my_location = all_location.difference(user_excluse_me)

    list_name = []
    index = 0
    result_query = []
    my_detail_location = ((my_location.values())[
                          0]["location"]).split(",")

    for i in user_excluse_me:
        list_name.append(str(i))

    for i in user_excluse_me.values():

        i["username"] = list_name[index]
        result_query.append(i)

        index += 1
        print(i)

    response_result=[]
    for i in result_query:
        # print(i)
        result = {}

        temp_username = i["username"]
        temp_location = i["location"]
        if temp_location=="":continue
        if my_detail_location ==[""]:
            return JsonResponse([{"error":"ban chua update location"}], safe=False)
        # print(temp_location)
        temp_detaillocation = i["detaillocation"]
        temp_relationship = i["relationship"]
        temp_photo = i["photo"]

        result.update({"name": temp_username})
        result.update({"detaillocation": temp_detaillocation})
        result.update({"relationship": temp_relationship})
        result.update({"photo": "http://127.0.0.1:8000/media/"+temp_photo})
        result.update({"distance":  str(calculate_distance(my_detail_location, str2list(temp_location)))})
                    
        # result.update({temp_username: temp_location+"|" +
        #               str(calculate_distance(my_detail_location, str2list(temp_location)))})

        response_result.append(result)
    
    
    return JsonResponse(response_result, safe=False)






@api_view(['POST'])
@authentication_classes([BearerAuthentication])
@permission_classes([permissions.IsAuthenticated])
def upload_location(request):
    print("aaa")
    return JsonResponse({"oke":1}, safe=False)