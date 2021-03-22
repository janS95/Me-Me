from django.db import models
# Create your models here.

class MemeCategory(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Image(models.Model):
    EMOTION_CHOICES = (
        ('HAPPY','HAPPY'),
        ('ANGRY','ANGRY'),
        ('SUPRISE','SUPRISE'),
        ('NEUTRAL','NEUTRAL'),
    )

    category = models.ForeignKey(MemeCategory, on_delete=models.CASCADE)
    emotion = models.CharField(choices=EMOTION_CHOICES, max_length=200, default='NEUTRAL')
    link = models.CharField(max_length=200, default='NO LINK')
