from django.shortcuts import render
from rest_framework import generics
from .serializers import ImageUploadSerializer    
from .models import Image
from rest_framework import status
from rest_framework.response import Response
import requests
#from fer import FER
#import cv2
import os
import numpy as np


class ImageView(generics.CreateAPIView):
    """
    API View gets image from POST request, checks if valid, detects emotion
    and gives meme as response
    HTTP 200: Emotion detected
    HTTP 400: No Face/Emotion detected
    HTTP 415: No Valid POST request
    """

    serializer_class = ImageUploadSerializer

    def post(self, request, format=None):
        #import base64
        #from django.core.files.base import ContentFile
        #imgdata=base64.b64decode(request.data['image'].split(';base64,')[1])
        #print(request.data['image'].split(';base64,')[1][0:50])
        #data = ContentFile(imgdata, name='temp.png')
        print(request.data)
        serializer = ImageUploadSerializer(data=request.data)
        if serializer.is_valid(): 
            try:
                #print(serializer.validated_data['image'])
                image = serializer.validated_data['image'].file.read()
                #print(image)
                npimg = np.fromstring(image, dtype=np.uint8)
                #img = cv2.imdecode(npimg, 1)
                #detector = FER()
                #emotion = detector.top_emotion(img)[0]
                #print(emotion)  
                return Response('https://www.stuttgarter-zeitung.de/media.media.54ec38cb-61d6-407d-98f3-be2003eb33c5.original1024.jpg')
                res = Image.objects.all().filter(emotion=emotion.upper())[0].link
                return Response(res, status=status.HTTP_200_OK)
            except IndexError:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)





"""
IMGFLIP API

'https://api.imgflip.com/caption_image',
                #                    data={
                #                        'template_id':112126428,'username':'konradjan',
                #                        'password':'konradjan1234','text0':'test0',
                #                        'text1':'test1'
                #                        }
"""