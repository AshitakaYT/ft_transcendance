from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    f = open("/home/belam/42cursus/transcendance/game/test", "r")
    return HttpResponse(f.read())