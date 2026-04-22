from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # On définit les rôles possibles
    ROLE_CHOICES = (
        ('admin', 'Administrateur'),
        ('moniteur', 'Moniteur'),
        ('eleve', 'Élève'),
    )
    
    # On ajoute nos champs personnalisés
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='eleve')
    telephone = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
