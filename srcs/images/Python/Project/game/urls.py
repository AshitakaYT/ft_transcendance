from django.urls import path
from . import views
from django.contrib.auth.views import LoginView, LogoutView

urlpatterns = [
    path("", views.index, name="home"),
    path("bears/", views.index, name="index"),
    path('login/', views.authenticate_42, name='authenticate_42'),
    path('callback/', views.callback, name='callback'),
    # path('login/', LoginView.as_view(), name='login'),
    # path('auth/', include('social_django.urls', namespace='social')),
    # path('logout/', LogoutView.as_view(), name='logout'),
]