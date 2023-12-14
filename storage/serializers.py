from rest_framework import serializers
from .models import File
from accounts.models import User
from accounts.serializers import UserSerializer


class FileSerializer(serializers.ModelSerializer):
    filename = serializers.CharField(max_length=255, default='')
    upload_datetime = serializers.SerializerMethodField()
    by_user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    share_link = serializers.SerializerMethodField()

    class Meta:
        model = File
        fields = ('id', 'filename', 'file',
                  'upload_datetime', 'by_user', 'share_link')

    def get_upload_datetime(self, obj):
        datetime = obj.upload_datetime
        return datetime

    def get_share_link(self, obj):
        return obj.share_link

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        by_user_id = representation['by_user']
        user = User.objects.filter(pk=by_user_id).values(
            'username').first() if by_user_id else None
        representation['by_user'] = user['username'] if user else None

        return representation
