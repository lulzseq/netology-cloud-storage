from rest_framework import serializers
from .models import User
from storage.models import File
from rest_framework.response import Response
from rest_framework import permissions, status
import logging
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password

logger = logging.getLogger(__name__)


class UserSerializer(serializers.ModelSerializer):
    files = serializers.SerializerMethodField(source=File.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'joined_at',
                  'is_active', 'is_staff', 'files')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        try:
            new_user = User.objects.create_user(**validated_data)
            logger.info(f"User '{new_user}' was successfully created.")
        except Exception as e:
            logger.error(f"User '{new_user}' was not created. Error: {e}.")
        return new_user

    def get_files(self, obj):
        user_files = File.objects.filter(by_user=obj)
        filenames = [file.filename for file in user_files if file.file]
        return filenames


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            raise serializers.ValidationError('Both username and password are required.')

        user = authenticate(username=username, password=password)
        if user and user.is_active:
            data['user'] = user
        else:
            raise serializers.ValidationError('Invalid Credentials')

        return data
    
    def to_representation(self, instance):
        return {
            'detail': 'Invalid username or password'
        }


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')

    def create(self, validated_data):
        user_obj = user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user_obj
