# Configuration Airtable pour GrooveNomad

## Étapes de configuration

### 1. Créer une base Airtable

1. Allez sur [Airtable.com](https://airtable.com)
2. Créez une nouvelle base de données
3. Créez une table nommée "Festivals" avec les colonnes suivantes :
   - **FestivalID** (Single line text) - Identifiant unique du festival
   - **Nom** (Single line text) - Nom du festival
   - **Ville** (Single line text) - Ville du festival
   - **Pays** (Single line text) - Pays du festival
   - **Date_debut** (Date) - Date de début du festival
   - **Date_fin** (Date) - Date de fin du festival (optionnel)
   - **Image** (URL) - URL de l'image du festival
   - **Price_1_day** (Currency) - Prix pour 1 jour
   - **Price_2_days** (Currency) - Prix pour 2 jours
   - **Price_3_days** (Currency) - Prix pour 3 jours
   - **Nb_jours** (Number) - Nombre de jours du festival
   - **Genre** (Single select) - Genre musical (ex: "Rock", "Jazz", "Électro")

### 2. Obtenir vos clés API

1. Allez dans votre compte Airtable
2. Cliquez sur votre avatar en haut à droite
3. Sélectionnez "Account"
4. Allez dans l'onglet "API"
5. Cliquez sur "Generate API key"
6. Copiez votre clé API

### 3. Obtenir votre Base ID

1. Dans votre base Airtable, cliquez sur "Help" en haut à droite
2. Sélectionnez "API Documentation"
3. Notez votre "Base ID" (ex: `appXXXXXXXXXXXXXX`)

### 4. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec :

```env
NEXT_PUBLIC_AIRTABLE_API_KEY=votre_clé_api_ici
NEXT_PUBLIC_AIRTABLE_BASE_ID=votre_base_id_ici
```

### 5. Ajouter des données de test

Ajoutez quelques festivals dans votre table Airtable pour tester :

| FestivalID | Nom | Ville | Pays | Date_debut | Date_fin | Image | Price_1_day | Price_2_days | Price_3_days | Nb_jours | Genre |
|------------|-----|-------|------|------------|----------|-------|-------------|--------------|--------------|----------|-------|
| FEST001 | Festival de Jazz | Paris | France | 2024-07-15 | 2024-07-17 | https://example.com/image.jpg | 25€ | 45€ | 60€ | 3 | Jazz |
| FEST002 | Rock en Seine | Saint-Cloud | France | 2024-08-25 | 2024-08-27 | https://example.com/image2.jpg | 45€ | 80€ | 110€ | 3 | Rock |

### 6. Redémarrer le serveur

```bash
npm run dev
```

Votre page festivals devrait maintenant afficher les données dynamiques d'Airtable !

## Structure de la base Airtable

Votre table "Festivals" doit avoir exactement ces noms de colonnes :
- `FestivalID` - Identifiant unique du festival
- `Nom` - Nom du festival
- `Ville` - Ville du festival (optionnel)
- `Pays` - Pays du festival (optionnel)
- `Date_debut` - Date de début du festival (format YYYY-MM-DD)
- `Date_fin` - Date de fin du festival (optionnel, format YYYY-MM-DD)
- `Image` - URL de l'image (optionnel)
- `Price_1_day` - Prix pour 1 jour (devise)
- `Price_2_days` - Prix pour 2 jours (devise)
- `Price_3_days` - Prix pour 3 jours (devise)
- `Nb_jours` - Nombre de jours (nombre)
- `Genre` - Genre musical (sélection unique)

## Types de données Airtable

- **FestivalID** : Single line text
- **Nom** : Single line text
- **Ville** : Single line text
- **Pays** : Single line text
- **Date_debut** : Date
- **Date_fin** : Date
- **Image** : URL
- **Price_1_day** : Currency
- **Price_2_days** : Currency
- **Price_3_days** : Currency
- **Nb_jours** : Number
- **Genre** : Single select

## Dépannage

- **Erreur "API key invalid"** : Vérifiez votre clé API dans `.env.local`
- **Erreur "Base not found"** : Vérifiez votre Base ID
- **Aucun festival affiché** : Vérifiez que votre table s'appelle exactement "Festivals"
- **Images ne s'affichent pas** : Vérifiez que les URLs d'images sont valides et accessibles publiquement
- **Prix ne s'affichent pas** : Vérifiez que les champs de prix sont bien de type "Currency" dans Airtable
- **Dates ne s'affichent pas** : Vérifiez que les champs de date sont bien de type "Date" dans Airtable 