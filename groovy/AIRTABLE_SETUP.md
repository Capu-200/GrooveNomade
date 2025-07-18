# 🗄️ Structure des Données Airtable - GrooveNomad

Ce document décrit la structure complète de la base de données Airtable utilisée par GrooveNomad pour gérer les festivals, hébergements, transports et utilisateurs.

## 📊 Vue d'ensemble

GrooveNomad utilise **4 tables principales** dans Airtable :
- **Festivals** : Catalogue des festivals de musique
- **Hébergements** : Options d'hébergement par festival
- **Transports** : Solutions de transport vers les festivals
- **Utilisateurs** : Comptes utilisateurs et authentification
- **Demandes** : Devis et demandes des utilisateurs

## 🎪 Table : Festivals

### Colonnes requises :
| Colonne | Type | Description | Exemple |
|---------|------|-------------|---------|
| `FestivalID` | Single line text | Identifiant unique | `FES001` |
| `Nom` | Single line text | Nom du festival | `Rock en Seine` |
| `Ville` | Single line text | Ville du festival | `Saint-Cloud` |
| `Pays` | Single line text | Pays du festival | `France` |
| `Date_debut` | Date | Date de début | `2024-08-25` |
| `Date_fin` | Date | Date de fin (optionnel) | `2024-08-27` |
| `Image` | URL | Image du festival | `https://...` |
| `Prix_1_jour` | Currency | Prix 1 jour | `45€` |
| `Prix_2_jours` | Currency | Prix 2 jours | `80€` |
| `Prix_3_jours` | Currency | Prix 3 jours | `110€` |
| `Nb_jours` | Number | Nombre de jours | `3` |
| `Genre` | Single select | Style musical | `Rock` |

### Exemple de données :
```
FestivalID: FES001
Nom: Rock en Seine
Ville: Saint-Cloud
Pays: France
Date_debut: 2024-08-25
Date_fin: 2024-08-27
Prix_1_jour: 45€
Prix_2_jours: 80€
Prix_3_jours: 110€
Nb_jours: 3
Genre: Rock
```

## 🏨 Table : Hébergements

### Colonnes requises :
| Colonne | Type | Description | Exemple |
|---------|------|-------------|---------|
| `HebergementID` | Single line text | Identifiant unique | `HEB001` |
| `Nom` | Single line text | Nom de l'hébergement | `Hôtel Central` |
| `Prix par nuit` | Currency | Prix par nuit | `120€` |
| `Type` | Single select | Type d'hébergement | `Hôtel` |
| `Festival` | Link to Festivals | Festival associé | `FES001` |

### Types d'hébergement disponibles :
- Hôtel
- Camping
- Appartement
- Auberge de jeunesse
- Résidence

## 🚗 Table : Transports

### Colonnes requises :
| Colonne | Type | Description | Exemple |
|---------|------|-------------|---------|
| `TransportID` | Single line text | Identifiant unique | `TRP001` |
| `Ville_depart` | Single line text | Ville de départ | `Paris` |
| `Ville_arrivee` | Single line text | Ville d'arrivée | `Saint-Cloud` |
| `Prix_A/R` | Currency | Prix aller-retour | `25€` |
| `Duree_estimee` | Number | Durée en heures | `1.5` |
| `Mode` | Single select | Mode de transport | `Train` |
| `Compagnie` | Single line text | Compagnie | `SNCF` |
| `Festival` | Link to Festivals | Festival associé | `FES001` |

### Modes de transport disponibles :
- Train
- Bus
- Avion
- Voiture
- Métro

## 👤 Table : Utilisateurs

### Colonnes requises :
| Colonne | Type | Description | Exemple |
|---------|------|-------------|---------|
| `UserID` | Single line text | Identifiant unique | `USR001` |
| `Email` | Email | Email utilisateur | `user@example.com` |
| `Nom` | Single line text | Nom complet | `Jean Dupont` |
| `Mot_de_passe` | Single line text | Mot de passe hashé | `hash...` |
| `Date_creation` | Date | Date d'inscription | `2024-01-15` |

## 💰 Table : Demandes

### Colonnes requises :
| Colonne | Type | Description | Exemple |
|---------|------|-------------|---------|
| `DemandeID` | Single line text | Identifiant unique | `DEM001` |
| `Utilisateur` | Link to Utilisateurs | Utilisateur | `USR001` |
| `Festival` | Link to Festivals | Festival | `FES001` |
| `Hébergement` | Link to Hébergements | Hébergement | `HEB001` |
| `Transport` | Link to Transports | Transport | `TRP001` |
| `Nb_voyageurs` | Number | Nombre de voyageurs | `2` |
| `Durée_séjour` | Number | Durée en jours | `3` |
| `Prix_total` | Currency | Prix total calculé | `450€` |
| `Statut` | Single select | Statut du devis | `En cours` |
| `Date_creation` | Date | Date de création | `2024-01-15` |
| `Motif_refus` | Long text | Motif si refusé | `Budget trop élevé` |
| `Commentaires` | Long text | Commentaires | `...` |
| `Fichier_Word` | Attachment | Devis Word | `devis.pdf` |

### Statuts disponibles :
- En cours
- Accepté
- Refusé

## 🔗 Relations entre tables

```
Festivals (1) ←→ (N) Hébergements
Festivals (1) ←→ (N) Transports
Utilisateurs (1) ←→ (N) Demandes
Festivals (1) ←→ (N) Demandes
Hébergements (1) ←→ (N) Demandes
Transports (1) ←→ (N) Demandes
```

## ⚙️ Configuration

### 1. Variables d'environnement
Créez un fichier `.env.local` :
```env
NEXT_PUBLIC_AIRTABLE_API_KEY=votre_clé_api
NEXT_PUBLIC_AIRTABLE_BASE_ID=votre_base_id
```

### 2. Permissions Airtable
- **Lecture** : Toutes les tables
- **Écriture** : Utilisateurs, Demandes
- **API** : Activée pour toutes les tables

### 3. Vues recommandées
- **Festivals** : "Grid view" (vue par défaut)
- **Hébergements** : "Grid view" 
- **Transports** : "Grid view"
- **Utilisateurs** : "Grid view"
- **Demandes** : "Grid view" + "Par statut"

## 🚀 Déploiement

### Variables Vercel
Ajoutez ces variables dans votre projet Vercel :
- `NEXT_PUBLIC_AIRTABLE_API_KEY`
- `NEXT_PUBLIC_AIRTABLE_BASE_ID`

### Sécurité
- Les clés API sont exposées côté client (NEXT_PUBLIC_)
- Utilisez des restrictions IP si nécessaire
- Surveillez l'utilisation de l'API Airtable

---

*Cette structure permet à GrooveNomad de gérer l'ensemble du parcours utilisateur, de la découverte de festivals à la gestion des devis.* 🎵 