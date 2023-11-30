from django.shortcuts import render, HttpResponse, redirect
from django.conf import settings
import os
import requests

# Create your views here.
def index(request):
    return render(request, "test.html")
    # f = open(os.getcwd() + "/game/templates/test.html", "r")
    # return HttpResponse(f.read())

def home(request):
    return render(request, "home.html")
    # d = open(os.getcwd() + "/game/templates/home.htm", "r")
    # return HttpResponse(d.read())

def bears(request):
    return render(request, "bears.html")
    # b = open(os.getcwd() + "/game/templates/bears.html", "r")
    # return HttpResponse(b.read())

def error(request):
    return render(request, "error.html")

TOKEN_URL = 'https://api.intra.42.fr/oauth/token'

def authenticate_42(request):
    authorization_url = 'https://api.intra.42.fr/oauth/authorize'

    client_id = settings.CLIENT_ID
    redirect_uri = 'https://localhost:8000/callback/'
    scope = 'public'

    auth_params = {
        'client_id': client_id,
        'redirect_uri': redirect_uri,
        'scope': scope,
        'response_type': 'code'
    }
    auth_url = f"{authorization_url}?client_id={client_id}&redirect_uri={redirect_uri}&scope={scope}&response_type=code"
    print('Authentication Successful')
    return redirect(auth_url)


def callback(request):
    authorization_code = request.GET.get('code')

    token_params = {
        'grant_type': 'authorization_code',
        'code': authorization_code,
        'redirect_uri': 'https://localhost:8000/callback/',
        'client_id': settings.CLIENT_ID,
        'client_secret': settings.CLIENT_SECRET 
    }
    print('TOKEN_URL:', TOKEN_URL)
    response = requests.post(TOKEN_URL, data=token_params)
    print(response.status_code)
    print(response.json()['access_token'])
    if response.status_code == 200:
        print('Callback Successful')
        access_token = response.json()['access_token']
        request.session['access_token'] = access_token
        return redirect('/game/')
    else:
        return redirect('/error/')