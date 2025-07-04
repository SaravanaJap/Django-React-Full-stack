from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer,NoteSerializer
from .models import Note

# Create your views here.


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated] 

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author = user)
    
    def perform_create(self,serializer):
        if serializer.is_valid():
            serializer.save(author  = self.request.user)
        else:
            return serializer.errors
     
class NoteDelete(generics.DestroyAPIView):

     serializer_class = NoteSerializer
     permission_classes = [IsAuthenticated] 

     def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author = user)


    


class UserCreateView(generics.CreateAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Allow any user to create an account






