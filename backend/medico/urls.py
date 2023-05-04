from django.urls import path
from . import views



# Routes for obtain and refresh token for the frontend


urlpatterns =  [
    path('get/', views.getMedicos),
    path('get/<str:rut>/', views.getMedico),
    path('post/', views.postMedico),
    path('put/<str:rut>/', views.putMedico),
    path('delete/<str:rut>/', views.deleteMedico),
]