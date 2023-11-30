"""
URL configuration for transcendance project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from django.contrib import admin
from django.urls import path, include
from game import views
from django.contrib.auth.views import LoginView, LogoutView

urlpatterns = [
    path("", views.home, name="home"),
    path("bears/", views.bears, name="bears"),
    path("game/", views.index, name="game"),
    path("admin/", admin.site.urls),
    path('login/', views.authenticate_42, name='authenticate_42'),
    path('callback/', views.callback, name='callback'),
    path('error/', views.error, name='error'),
    # path('login/', LoginView.as_view(), name='login'),
    # path('auth/', include('social_django.urls', namespace='social')),
    # path('logout/', LogoutView.as_view(), name='logout'),
]
