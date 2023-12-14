from django.shortcuts import render
from django.http import HttpResponse
import os
from django.template import loader

# Create your views here.
def index(request):
    #f = open(os.getcwd() + "/game/test.html", "r")
    template = loader.get_template("game/game.html")
    context = {
        "width_canvas": 1020,
        "height_canvas": 620,
        "width": 1000,
        "height": 600,
        "paddleh" : 200,
        "paddlew" : 200,
        "paddled" : 20,
        "paddlespeed" : 50,
        "vx" : 50,
        "vy" : 50
    }
    return HttpResponse(template.render(context, request))
    #return HttpResponse(f.read())