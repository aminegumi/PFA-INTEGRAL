from rest_framework import generics
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth import authenticate
from rest_framework import status

# Create your views here.



class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer

           
class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        
        if email and password:
            user = authenticate(request, email=email, password=password)
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({
                    'token': token.key,
                    'user_id': user.pk,
                    'email': user.email
                })
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Both email and password are required'}, status=status.HTTP_400_BAD_REQUEST)