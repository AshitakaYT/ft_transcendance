from django.urls import path, include
from . import views 

urlpatterns = [ 
	path('', views.calculator, name="calculator"),
]
