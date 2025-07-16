# 🎵 Festivals Dynamiques - GrooveNomad

Votre page festivals est maintenant entièrement dynamique et connectée à Airtable ! 

## ✨ Fonctionnalités

- **Données dynamiques** : Les festivals sont récupérés en temps réel depuis Airtable
- **Interface moderne** : Cartes élégantes avec images, descriptions, dates et prix
- **États de chargement** : Indicateurs visuels pendant le chargement des données
- **Gestion d'erreurs** : Messages d'erreur clairs avec possibilité de réessayer
- **Responsive** : S'adapte parfaitement à tous les écrans
- **Animations** : Transitions fluides et effets de survol

## 🚀 Comment ça marche

### 1. Configuration Airtable

Suivez le guide complet dans `AIRTABLE_SETUP.md` pour configurer votre base Airtable.

### 2. Variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_AIRTABLE_API_KEY=votre_clé_api_ici
NEXT_PUBLIC_AIRTABLE_BASE_ID=votre_base_id_ici
```

### 3. Structure des données

Votre table Airtable "Festivals" doit contenir ces colonnes :

| Colonne | Type | Description | Obligatoire |
|---------|------|-------------|-------------|
| Name | Single line text | Nom du festival | ✅ |
| Description | Long text | Description du festival | ❌ |
| Date | Date | Date du festival | ❌ |
| Location | Single line text | Lieu du festival | ❌ |
| Image | URL | URL de l'image | ❌ |
| Price | Single line text | Prix (ex: "25€", "Gratuit") | ❌ |
| Website | URL | Site web du festival | ❌ |
| Category | Single select | Catégorie (ex: "Rock", "Jazz") | ❌ |

## 🎨 Composants créés

### `FestivalCard`
Affiche une carte élégante pour chaque festival avec :
- Image du festival
- Nom et description
- Date et lieu
- Prix et catégorie
- Lien vers le site web
- Effets de survol

### `LoadingSpinner`
Indicateur de chargement animé avec icône et texte personnalisable.

### `EmptyState`
Affichage élégant quand aucun festival n'est trouvé.

### `ErrorMessage`
Gestion d'erreurs avec possibilité de réessayer.

## 🔧 Personnalisation

### Modifier l'apparence des cartes

Éditez `components/FestivalCard.tsx` pour changer :
- Les couleurs
- La disposition
- Les animations
- Les informations affichées

### Ajouter des filtres

Vous pouvez ajouter des filtres par :
- Catégorie
- Date
- Prix
- Localisation

### Ajouter une recherche

Implémentez une barre de recherche pour filtrer les festivals par nom.

## 🐛 Dépannage

### Erreurs courantes

1. **"API key invalid"**
   - Vérifiez votre clé API dans `.env.local`
   - Assurez-vous que la clé est correcte

2. **"Base not found"**
   - Vérifiez votre Base ID
   - Assurez-vous que la base existe

3. **Aucun festival affiché**
   - Vérifiez que votre table s'appelle exactement "Festivals"
   - Vérifiez que vous avez des données dans la table

4. **Images ne s'affichent pas**
   - Vérifiez que les URLs d'images sont valides
   - Assurez-vous que les images sont accessibles publiquement

### Debug

Ouvrez la console du navigateur (F12) pour voir les erreurs détaillées.

## 📱 Responsive

La page s'adapte automatiquement :
- **Mobile** : 1 colonne
- **Tablet** : 2 colonnes  
- **Desktop** : 3-4 colonnes

## 🎯 Prochaines étapes

1. **Ajouter des filtres** par catégorie et date
2. **Implémenter une recherche** en temps réel
3. **Ajouter une pagination** pour de nombreux festivals
4. **Créer des pages détaillées** pour chaque festival
5. **Ajouter des favoris** pour les utilisateurs

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez la configuration Airtable
2. Consultez les logs dans la console
3. Vérifiez les variables d'environnement
4. Testez avec des données de test simples 