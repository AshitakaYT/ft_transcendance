from django.urls import path
from . import views

urlpatterns = [
	path("", views.home, name="home"),
	path("test", views.test, name="test"),
	path("good", views.AuthSuccessful, name="AuthSuccessful"),
	path("bad", views.AuthFailed, name="AuthFailed")
]
