from django.contrib import admin

from .models import Medico

class MedicoAdmin(admin.ModelAdmin):
    list_display = ('rut', 'nombre', 'apellido_P', 'apellido_M', 'edad', 'especialidad','profesion','ubicacion', 'credencial')

# Register your models here.
admin.site.register(Medico, MedicoAdmin)