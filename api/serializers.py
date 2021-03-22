from rest_framework import serializers # This is important

class ImageUploadSerializer(serializers.Serializer):
    image = serializers.ImageField()