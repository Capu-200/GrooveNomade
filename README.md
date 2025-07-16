# 🎧 GrooveNomad – Travel. Rave. Repeat.

GrooveNomad est une plateforme immersive pensée pour les jeunes voyageurs en quête d’expériences uniques.
Notre mission : centraliser l’organisation de séjours musicaux personnalisés autour des plus grands festivals du monde, tout en proposant des activités culturelles locales et un accompagnement technologique basé sur l’intelligence artificielle.

Ce projet est une application web construite avec **Next.js 14**, utilisant **TypeScript** et le **App Router**. Elle se connecte à une base de données **Airtable** via des **API Routes** pour gérer la communication entre le frontend et le backend.

## 🚀 Ce que propose GrooveNomad :

- Un moteur de recommandation IA basé sur les goûts musicaux
- Un catalogue de festivals filtrables (date, style musical, lieu…)
- Des packages combinant festival + hébergement + découverte
- Un système de réservation et de devis automatisé
- Une interface responsive, multilingue et connectée à WhatsApp & e-mail

GrooveNomad, c’est bien plus qu’un site de voyage : c’est une aventure à ton image, entre musique, exploration et simplicité.


## Fonctionnalités techniques

- ✅ Application frontend avec Next.js (App Router)
- ✅ Backend via API routes (`/app/api`)
- ✅ Connexion à une base Airtable (CRUD)
- ✅ Rendu SSR/CSR hybride
- ✅ TypeScript + ESLint + Prettier configurés


## ⚙️ Prérequis

- Node.js `>=18`
- Yarn ou npm
- Un compte Airtable
- Une base de données Airtable avec une table (ex: `Records`)



## 🔑 Configuration

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
NEXT_PUBLIC_AIRTABLE_API_KEY=your_airtable_api_key
NEXT_PUBLIC_AIRTABLE_BASE_ID=your_airtable_base_id
````

## Installation

```bash
git clone https://github.com/votre-utilisateur/nextjs-airtable-app.git
cd nextjs-airtable-app
npm install
# ou
yarn
````

## Lancement

Pour lancer le projet, il suffit d'utiliser les commandes suivantes :

```bash
npm run dev
# ou
yarn dev
```

L'application sera disponible sur http://localhost:3000/
