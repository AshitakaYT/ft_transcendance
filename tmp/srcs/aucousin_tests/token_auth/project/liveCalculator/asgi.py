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

