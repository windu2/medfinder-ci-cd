from rest_framework import serializers

#Medico import
from .models import Medico

#Crud medico serializer (Convierte dastos a JSON no los parsea)
class MedicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medico
        fields = '__all__'