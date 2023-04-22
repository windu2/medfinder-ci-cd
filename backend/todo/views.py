# This is an example for the todo app
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo


# this is an example for todo app, where viewsets create the JSON view
class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()