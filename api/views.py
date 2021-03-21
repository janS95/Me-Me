from django.shortcuts import render
from rest_framework import generics
from .serializers import ImageSerializer      
from .models import Image
from rest_framework import status
from rest_framework.response import Response
from . import forms
import requests
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
                form = forms.ImageForm(data=request.data)
                image = form.data['image'].file.read()
                #import base64
                #b64 = base64.b64decode(image)
                import numpy as np
                npimg = np.fromstring(image, dtype=np.uint8)
                #bild = new_image.validated_data['image']
                #new_image.save()
                #with open(str(bild)) as b:
                img = cv2.imdecode(npimg, 1)
                #img = cv2.imread(image)#'.\\api\\images\\'+str(request.data['image']))
                detector = FER()
                res = detector.top_emotion(img)[0]  
                print(res)
                #os.remove('.\\api\\images\\'+str(request.data['image']))
                #r = requests.post('https://api.imgflip.com/caption_image',
                #                    data={
                #                        'template_id':112126428,'username':'konradjan',
                #                        'password':'konradjan1234','text0':'test0',
                #                        'text1':'test1'
                #                        }) 
                #print(r)
                res = Image.objects.all().filter(pk=139)[0].link
                return Response(res, status=status.HTTP_200_OK)
            except IndexError:
                os.remove('.\\api\\images\\'+str(request.data['image'])) 
                return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(new_image.errors, status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)