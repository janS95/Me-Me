from django.urls import path
from api import views                                 
  

urlpatterns = [
    path('image/', views.ImageView.as_view()),
]