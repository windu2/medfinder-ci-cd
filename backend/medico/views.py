#from django.shortcuts import render

#from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from medico import serializers



#CRUD medico imports
from .serializers import MedicoSerializer
from .models import Medico


# Create your views here.
# Medico JSON view
#class MedicoView(viewsets.ModelViewSet):
#   serializer_class = MedicoSerializer
#    queryset = Medico.objects.all()

@api_view(['GET'])
def getMedicos(request):
    medico = Medico.objects.all()
    serializer = MedicoSerializer(medico, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getMedico(request, rut):
    medico = Medico.objects.get(id=rut)
    serializer = MedicoSerializer(medico, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def postMedico(request):
    data = request.data
    new_rut = data['rut']

    try:
        another_medico = Medico.objects.get(rut=new_rut)
        return Response("Rut actualmente en uso") 
    
    except:
        medico = Medico.objects.create(
            rut = data['rut'],
            nombre = data['nombre'],
            apellido_P = data['apellido_P'], 
            apellido_M = data['apellido_M'],
            edad = data['edad'], 
            especialidad = data['especialidad'],
            profesion = data['profesion'],
            ubicacion = data['ubicacion'],
            credencial = data['credencial'],
        )
        serializer = MedicoSerializer(medico, many=False)
        return Response(serializer.data)         



@api_view(['PUT'])
def putMedico(request, rut):
    data = request.data
    medico = Medico.objects.get(id=rut)
    new_rut = data['rut']
    # En caso de que el rut se mantenga no tengo conflictos
    if(new_rut == medico.rut):
        serializer = MedicoSerializer(instance=medico, data=data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    # En caso de que el Rut cambie, hay que ver que no sea el de otra persona
    try:
        other_medico = Medico.objects.get(rut=new_rut)
        return Response("Rut actualmente en uso")  
    except:
        serializer = MedicoSerializer(instance=medico, data=data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
        
        

@api_view(['DELETE'])
def deleteMedico(request,rut):
    try:
        medico = Medico.objects.get(id=rut)
        medico.delete()
        return Response("Medico Eliminado")  
    except:
        return Response("Este médico no existe")
     