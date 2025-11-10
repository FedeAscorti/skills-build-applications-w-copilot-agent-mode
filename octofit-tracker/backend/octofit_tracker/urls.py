"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

import os

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, TeamViewSet, ActivityViewSet, WorkoutViewSet, LeaderboardViewSet
from rest_framework.response import Response
from rest_framework.decorators import api_view

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'activities', ActivityViewSet)
router.register(r'workouts', WorkoutViewSet)
router.register(r'leaderboard', LeaderboardViewSet)

@api_view(['GET'])
def api_root(request):
    """
    Return API root links. If running in Codespaces, prefer the external HTTPS URL based on
    the CODESPACE_NAME environment variable to ensure returned URLs match the codespace URL
    (format: https://$CODESPACE_NAME-8000.app.github.dev/api/[component]/). If not present,
    fall back to request.build_absolute_uri for local runs.
    """
    codespace_name = os.environ.get('CODESPACE_NAME')
    if codespace_name:
        base = f"https://{codespace_name}-8000.app.github.dev/api/"
    else:
        # fallback to the request host/URL (will include scheme and host)
        base = request.build_absolute_uri('/api/')

    return Response({
        'users': base + 'users/',
        'teams': base + 'teams/',
        'activities': base + 'activities/',
        'workouts': base + 'workouts/',
        'leaderboard': base + 'leaderboard/',
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    # expose all API endpoints under /api/
    path('api/', api_root, name='api-root'),
    path('api/', include(router.urls)),
]
