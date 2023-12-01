"""
ASGI config for project project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""
"""
import os 

import django 
from channels.http import AsgiHandler 
from channels.routing import ProtocolTypeRouter 

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sampleProject.settings') 
django.setup() 

application = ProtocolTypeRouter({ 
"http": AsgiHandler(), 
# Just HTTP for now. (We can add other protocols later.) 
})

import os 

from channels.auth import AuthMiddlewareStack 
from channels.routing import ProtocolTypeRouter, URLRouter 
from django.core.asgi import get_asgi_application 
import liveCalculator.routing 

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sampleProject.settings") 

application = ProtocolTypeRouter({ 
"http": get_asgi_application(), 
"websocket": AuthMiddlewareStack( 
		URLRouter( 
			liveCalculator.routing.websocket_urlpatterns 
		) 
	), 
}) 
"""
