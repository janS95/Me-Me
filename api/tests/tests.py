from django.test import TestCase
from rest_framework import status
from PIL import Image
import os

# Create your tests here.
class ImageViewTests(TestCase):
    def test_happy_emotion(self):
        """
        ImageView returns Status Code HTTP 200 OK if Face and Emotion
        was detected. Test Image Elon Musk Happy. Returns Emotion Happy
        """
        # Open Image and Send
        with open('api\\tests\\happy.jpg','rb') as image:
            response = self.client.post('/api/image/', {'image':image})
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(response.json(), 'happy')
    
    def test_no_face(self):
        """
        ImageView returns Status Code HTTP 400 BAD REQUEST if no face or emotion
        could be detected. Test Image just randomly generated
        """
        # Create Image
        image = Image.new('RGB', (100,100))
        image.save('api\\tests\\test_no_face.png')

        # Open Image and Send
        with open('api\\tests\\test_no_face.png','rb') as image:
            response = self.client.post('/api/image/', {'image':image})
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        os.remove('api\\tests\\test_no_face.png')
    
    def test_unsupported_media_type(self):
        """
        ImageView returns Status Code HTTP 415 UNSUPPORTED MEDIA TYPE
        if payload is not characterized as 'image'
        """
        # Create Image
        image = Image.new('RGB', (100,100))
        image.save('api\\tests\\test_no_face.png')

        # Open Image and Send
        with open('api\\tests\\test_no_face.png','rb') as image:
            response = self.client.post('/api/image/', {'blob':image})
            self.assertEqual(response.status_code, status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)
        
        os.remove('api\\tests\\test_no_face.png')