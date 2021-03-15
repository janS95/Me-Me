from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import TodoSerializer      # add this
from .models import Todo                     # add this
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os

class TodoView(viewsets.ModelViewSet):       # add this
    serializer_class = TodoSerializer          # add this
    queryset = Todo.objects.all()              # add this

# Add this CBV
class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()