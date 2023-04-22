from django.urls import path
from . import views
import auth

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

# Routes for obtain and refresh token for the frontend

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('', views.getRoutes)
]