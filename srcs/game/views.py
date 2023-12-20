from django.shortcuts import render
from django.http import HttpResponse
import os
from django.template import loader

# Create your views here.
def index(request):
    #f = open(os.getcwd() + "/game/test.html", "r")
    template = loader.get_template("game/game.html")
    context = {
        "width": 1000,
        "height": 600,
        "paddleh" : 150,
        "paddlew" : 20,
        "paddled" : 20,
        "paddlespeed" : 250,
        "ballv" : 50,
        "recoil" : 150,
        "paddlefriction" : 1.1,
        "ballfriction" : 1.0002,
        "smash" : 1.4,
        "recovertime" : 2,
        "lengoal" : 200
    }
    return HttpResponse(template.render(context, request))
    #return HttpResponse(f.read())