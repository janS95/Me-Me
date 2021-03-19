from django.shortcuts import render
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import ImageSerializer      
from .models import Image
from django.http import HttpResponse, HttpResponseNotFound

class ImageView(generics.ListCreateAPIView):
    serializer_class = ImageSerializer
    queryset = Image.objects.all()

    def post(self, request, format=None):
        new_image = ImageSerializer(data=request.data)
        if new_image.is_valid():            
            return HttpResponse('Gespeichert')
        return HttpResponse('Fick dich')