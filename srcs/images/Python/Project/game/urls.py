from django.urls import path
from django.conf.urls import url
from . import views
from django.contrib.auth.views import LoginView, LogoutView

urlpatterns = [
    path("", views.index, name="home"),
    path("bears/", views.index, name="index"),
    path("update_color/", views.update_color, name="update_color"),
    # path('login/', LoginView.as_view(), name='login'),
    # path('auth/', include('social_django.urls', namespace='social')),
    # path('logout/', LogoutView.as_view(), name='logout'),
]
