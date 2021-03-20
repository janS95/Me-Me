from django.shortcuts import render
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import ImageSerializer      
from .models import Image
from django.http import HttpResponse, HttpResponseNotFound
from fer import FER
import cv2
import os




class ImageView(generics.ListCreateAPIView):
    serializer_class = ImageSerializer
    queryset = Image.objects.all()

    def post(self, request, format=None):
        new_image = ImageSerializer(data=request.data)
        if new_image.is_valid(): 
            try:
                new_image.save()
                img = cv2.imread('.\\api\\images\\'+str(request.data['image']))
                detector = FER()
                res=detector.top_emotion(img)[0]  
                os.remove('.\\api\\images\\'+str(request.data['image'])) 
                return HttpResponse(res)
            except IndexError:
                return HttpResponse('Kein Gesicht erkannt')
        return HttpResponse('Fick dich')