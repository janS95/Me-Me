from django.db import models
# Create your models here.


class Image(models.Model):
    image = models.ImageField(upload_to='.\\api\\images\\')
    link = models.CharField(max_length=200, default=0)
