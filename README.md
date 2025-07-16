# GrooveNomade

Ce projet est une application web construite avec **Next.js 14**, utilisant **TypeScript** et le **App Router**. Elle se connecte à une base de données **Airtable** via des **API Routes** pour gérer la communication entre le frontend et le backend.

---

## 🚀 Fonctionnalités

- ✅ Application frontend avec Next.js (App Router)
- ✅ Backend via API routes (`/app/api`)
- ✅ Connexion à une base Airtable (CRUD)
- ✅ Rendu SSR/CSR hybride
- ✅ TypeScript + ESLint + Prettier configurés

---

## 🧱 Structure du projet

/app
├── page.tsx               // Page d’accueil
├── api/
│   └── records/
│       ├── route.ts       // API handler pour les opérations Airtable
/lib
└── airtable.ts            // Configuration et méthodes Airtable
/types
└── record.d.ts            // Types TypeScript