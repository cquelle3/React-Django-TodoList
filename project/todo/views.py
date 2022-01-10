from django.shortcuts import render
from . import models
from rest_framework import viewsets
from . import serializers

# Create your views here.

class TodoView(viewsets.ModelViewSet):
    queryset = models.TodoModel.objects.all()
    serializer_class = serializers.TodoSerializer