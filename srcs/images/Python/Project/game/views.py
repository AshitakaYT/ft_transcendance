from django.shortcuts import render, HttpResponse, redirect
from django.conf import settings
import os
import requests
from .models import UserProfile
from django.contrib.auth.decorators import login_required

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
# i'm really starting to feel suicidal because of how that part is confusing
# i tried to send auth_param with wrong parameters (like changing client_id to asddas)
# and 42 still sends me a valid and usable token, how the actual fuck am i supposed to work with that?
# i thought 'huh weird. ill just revoke it and try again' WRONG, still sends me a valid one again
    auth_params = {
        'client_id': client_id, # UID given by the 42 application
        'redirect_uri': redirect_uri, # yes it's called urI, idk why, it's the url used in the application
        'scope': scope,
        'response_type': 'code'
    }
    auth_url = f"{authorization_url}?client_id={client_id}&redirect_uri={redirect_uri}&scope={scope}&response_type=code"
    print('Authentication Successful')
    response = requests.post(TOKEN_URL, data=auth_params)
    print(response.status_code)
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
    response = requests.post(TOKEN_URL, data=token_params)
    if response.status_code == 200:
        try:
            access_token = response.json()['access_token']
            print(1)
            print(os.getenv('API_URL'))
            print(os.getenv('API_UID'))
            print(os.getenv('API_SECRET'))
            user_profile, created = UserProfile.objects.get_or_create(name=request.user)
            print(2)
            user_profile.token = access_token
            print(3)
            user_profile.save()
            print(4)
            print(user_profile.name)
            print(user_profile.token)
            request.session['access_token'] = access_token
            return redirect('/game/')
        except Exception as e:
            print(e)
            print('Error')
            print(access_token)
            return redirect('/error/')
    else:
        return redirect('/error/')
    return redirect('/game/')

def RevokeToken(request):
    revocation_url = 'https://api.intra.42.fr/oauth/revoke'
    user_profile, created = UserProfile.objects.get_or_create(name=request.user)
    data = {'token': user_profile.token}
    user_profile.token = ''
    user_profile.save()
    response = requests.post(revocation_url, data=data)
    if response.status_code == 200:
        print('Token revoked successfully')
    else:
        print('Token revocation failed')
    return redirect("home")
    