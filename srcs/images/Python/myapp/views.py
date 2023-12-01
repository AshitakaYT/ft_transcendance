from django.shortcuts import render, HttpResponse
import os

def home(request):
    return HttpResponse(os.getenv('POSTGRES_HOST'))

def test(request):
	return HttpResponse("I hate this garbage project")

def AuthSuccessful(request):
	return HttpResponse("Authentication successful!")

def AuthFailed(request):
	return HttpResponse("Authentication failed...")