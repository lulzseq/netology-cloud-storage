from django.contrib import admin
from django.urls import path, include
from .routers import router
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from storage.views import redirect_to_file


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(
        template_name='templates/index.html'), name='Home'),
    path('api/', include(router.urls)),
    path('s/<str:hash>/', redirect_to_file, name='redirect_to_file'),
]

if settings.DEBUG:

    urlpatterns += static(
        settings.STATIC_URL,
        document_root=settings.STATIC_ROOT)

    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT)
