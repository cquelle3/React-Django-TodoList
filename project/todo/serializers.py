from rest_framework import serializers
from . import models

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TodoModel
        fields = ('id', 'task', 'completed')