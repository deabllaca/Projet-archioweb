# Projet-archioweb

## Notre projet

Le but de notre API consiste à développer une application mobile qui répertorie les places de parking disponibles. Les utilisateurs peuvent mettre à disposition leur place de parking et peuvent louer les places d’autres utilisateurs. L’utilisateur qui met en location sa place (bailleur), définit leur heures et dates de disponibilités pour les autres. Il pourra par la suite regarder quelle voiture utilise sa place de parc.

L’utilisateur qui souhaite louer une place va rechercher des places disponibles selon la date, l’heure et la localisation qu’il souhaite et pourra la réserver pour x temps.

Le lien de notre app : https://parking-app-jc1u.onrender.com

### Structure

```markdown
Users:

- firstName
- lastName
- userName
- password

Place de parc:

- description
- type
- geolocation
- picture
- date de disponibilité (jour, mois, année, heure, minute)

Véhicule :

- type
- numéro d'immatriculation
- couleur
- marque
```

**Paginated list :**

1. Liste toutes les places disponibles
2. Liste des personnes qui ont réservé la place

**Filtres :**

- Les places
  - Géolocalisation - trouver toutes les places dans un rayon
  - type de place
  - date
  - heure

**Aggregated data :**

- Number of réservation for a parking à venir

**Real Time :**

1. L’utilisateur est notifié quand lorsqu’il y a un nouvelle réservation sur sa place.
2. L’utiliseur est notifé 30 min avant la fin de la réservation de parking (pour qu’il se souvienne qu’il doit partir).

Dea, Andy, Lara
