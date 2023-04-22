from django.views import generic
from django.contrib.auth import login
from django.shortcuts import redirect

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import User
# from .models import Medic, Patient

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['is_admin'] = user.is_superuser
        # ...
        return token

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2')
    
    def get_is_admin_user(self, obj):
        return obj.is_staff # this will return true for self.is_staff user

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username']
        )

        user.set_password(validated_data['password'])
        user.is_staff = True # set staff status to true
        user.save()

        is_medic = validated_data.pop('is_medic', False)
        is_patient = validated_data.pop('is_patient', False)

        if is_medic:
            speciality = validated_data.pop('speciality')
            area = validated_data.pop('area')

            medic = Medic.objects.create(
                user=user,
                speciality=speciality,
                area=area
            )
            return medic

        if is_patient:
            age = validated_data.pop('age')
            gender = validated_data.pop('gender')

            patient = Patient.objects.create(
                user=user,
                age=age,
                gender=gender
            )
            return patient

        return user
