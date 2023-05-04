from django.db import models

# Create your models here.
# Medicos model
class Medico(models.Model):
    rut = models.CharField(max_length=120)
    nombre = models.CharField(max_length=120)
    apellido_P = models.CharField(max_length=120)
    apellido_M = models.CharField(max_length=120)
    edad = models.IntegerField()
    especialidad = models.CharField(max_length=120)
    profesion = models.CharField(max_length=120)
    ubicacion = models.CharField(max_length=120, default="")
    credencial = models.CharField(max_length=120)

    def _str_(self):
        return self.rut