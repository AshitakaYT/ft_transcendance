from django.shortcuts import render
from django.http import HttpResponse
import os

# Create your views here.
def index(request):
    f = open(os.getcwd() + "/game/test.html", "r")
    return HttpResponse(f.read())