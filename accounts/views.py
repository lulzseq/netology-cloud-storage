from django.shortcuts import render
from django.http import JsonResponse
from django.middleware.csrf import get_token
import logging
from django.contrib.auth import authenticate, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserLoginSerializer, UserSerializer, UserRegisterSerializer
from rest_framework import permissions, status
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.contrib.auth.decorators import login_required
from django.middleware.csrf import get_token


logger = logging.getLogger(__name__)


@csrf_exempt
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
# @authentication_classes([SessionAuthentication])
def login_view(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            response_message = f"User '{user.username}' was successfully logged in."
            logger.info(response_message)
            return Response({'detail': response_message, "username": user.username}, status=status.HTTP_200_OK)

    response_message = f"User login failed. Error: {serializer.errors.get('non_field_errors', ['Invalid credentials'])[0]}"
    logger.error(response_message)
    return Response({'detail': response_message}, status=status.HTTP_400_BAD_REQUEST)


@login_required
# @authentication_classes([SessionAuthentication])
def logout_view(request):
    logout(request)
    return Response({'detail': 'Logout successful'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
# @authentication_classes([SessionAuthentication])
def signup_view(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        if user:
            response_message = f"User '{user.username}' was successfully created."
            logger.info(response_message)
            return Response({'detail': response_message, "username": user.username}, status=status.HTTP_201_CREATED)
    response_message = f"User '{user.username}' was not created. Error: {serializer.errors}."
    logger.error(response_message)
    return Response(response_message, status=status.HTTP_400_BAD_REQUEST)


@login_required
@permission_classes([permissions.AllowAny])
# @authentication_classes([SessionAuthentication])
def user_view(request):
    serializer = UserSerializer(request.user)
    return Response({'user': serializer.data}, status=status.HTTP_200_OK)
