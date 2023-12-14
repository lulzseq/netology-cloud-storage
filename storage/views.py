from django.shortcuts import redirect
from django.conf import settings
from django.http import HttpResponse
from .models import File
import logging

logger = logging.getLogger(__name__)


def redirect_to_file(request, hash):
    try:
        share_link = f'{settings.BASE_URL}/s/{hash}'
        file_obj = File.objects.get(share_link=share_link)
        response = HttpResponse(file_obj.file)
        response['Content-Disposition'] = f'attachment; filename="{file_obj.filename}"'
        logger.info(f"File '{file_obj.filename}' was provided for download.")
        return response
    except File.DoesNotExist:
        logger.error("Share link not found.")
        return HttpResponse("Share link not found", status=404)
