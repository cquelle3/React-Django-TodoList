from django.contrib import admin
from . import models

# Register your models here.
class TodoAdmin(admin.ModelAdmin):
    list_display = ('id', 'task', 'completed')

admin.site.register(models.TodoModel, TodoAdmin)