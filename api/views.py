from django.shortcuts import render
from rest_framework import generics
from .serializers import ImageSerializer      
from .models import Image
from rest_framework import status
from rest_framework.response import Response
from fer import FER
import cv2
import os




class ImageView(generics.ListCreateAPIView):
    """
    API View gets image from POST request, checks if valid and detects emotion
    HTTP 200: Emotion detected
    HTTP 400: No Face/Emotion detected
    HTTP 415: No Valid POST request
    """
    serializer_class = ImageSerializer
    queryset = Image.objects.all()

    def post(self, request, format=None):
        new_image = ImageSerializer(data=request.data)
        if new_image.is_valid(): 
            try:
                new_image.save()
                img = cv2.imread('.\\api\\images\\'+str(request.data['image']))
                detector = FER()
                res = detector.top_emotion(img)[0]  
                os.remove('.\\api\\images\\'+str(request.data['image'])) 
                return Response(res, status=status.HTTP_200_OK)
            except IndexError:
                os.remove('.\\api\\images\\'+str(request.data['image'])) 
                return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(new_image.errors, status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)