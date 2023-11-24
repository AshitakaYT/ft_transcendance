from django.shortcuts import render, HttpResponse
import os

# Create your views here.
def index(request):
    f = open(os.getcwd() + "/game/test.html", "r")
    return HttpResponse(f.read())

def home(request):
    return HttpResponse("T E M P L A T E")