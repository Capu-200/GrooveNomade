'use client'

import Header from '@/components/header'
import { Footer } from '@/components/footer'

export default function AProposPage() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mt-20">
            À propos de GrooveNomad
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Votre assistant IA intelligent pour découvrir et organiser vos voyages de festivals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Notre Mission</h2>
            <p className="text-gray-600 mb-4">
              Chez GrooveNomad, nous révolutionnons l'organisation de voyages pour les festivals de musique grâce à l'intelligence artificielle. Notre mission est de vous faire découvrir les meilleurs festivals du monde et de vous accompagner dans la création d'expériences inoubliables.
            </p>
            <p className="text-gray-600">
              Notre assistant IA intelligent analyse vos préférences musicales, votre budget et vos envies pour vous proposer des festivals parfaitement adaptés, avec des devis personnalisés incluant transport, hébergement et pass festival.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pourquoi nous choisir ?</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center">
                    <span className="text-purple-500 text-sm font-semibold">🤖</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Assistant IA Intelligent</h3>
                  <p className="text-gray-600">Chatbot personnalisé qui comprend vos envies et vous guide vers les meilleurs festivals.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center">
                    <span className="text-purple-500 text-sm font-semibold">💡</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Suggestions d'activités IA</h3>
                  <p className="text-gray-600">L'IA génère des activités personnalisées autour de chaque festival pour enrichir votre expérience.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center">
                    <span className="text-purple-500 text-sm font-semibold">💰</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Devis automatiques</h3>
                  <p className="text-gray-600">Calcul automatique des prix incluant festival, hébergement et transport selon vos critères.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center">
                    <span className="text-purple-500 text-sm font-semibold">💾</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Conversation persistante</h3>
                  <p className="text-gray-600">Votre conversation avec l'IA est sauvegardée automatiquement pour une expérience continue.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Fonctionnalités Innovantes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="text-3xl mb-3">🎪</div>
              <h3 className="font-semibold text-gray-900 mb-2">Catalogue Intelligent</h3>
              <p className="text-sm text-gray-600">Festivals filtrés par style, pays, budget et dates</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-3">🏨</div>
              <h3 className="font-semibold text-gray-900 mb-2">Hébergements Variés</h3>
              <p className="text-sm text-gray-600">Hôtels, camping, appartements pour tous les budgets</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-3">🚗</div>
              <h3 className="font-semibold text-gray-900 mb-2">Transports Optimisés</h3>
              <p className="text-sm text-gray-600">Train, bus, avion avec prix et durées</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-semibold text-gray-900 mb-2">Gestion des Devis</h3>
              <p className="text-sm text-gray-600">Acceptation, refus avec motifs, suivi complet</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Technologies Avancées</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-500 mb-2">GPT-4o</div>
              <div className="text-gray-600">IA de pointe pour des recommandations intelligentes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-500 mb-2">Next.js 15</div>
              <div className="text-gray-600">Framework moderne pour des performances optimales</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-500 mb-2">Airtable</div>
              <div className="text-gray-600">Base de données flexible et évolutive</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Prêt à vivre l'aventure ?</h2>
          <p className="text-gray-600 mb-8">
            Découvrez nos festivals avec l'assistant IA ou explorez notre catalogue. Commencez à planifier votre prochaine aventure musicale dès aujourd'hui !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/chatbot"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-500 hover:bg-purple-600"
            >
              🤖 Tester l'assistant IA
            </a>
            <a
              href="/festivals"
              className="inline-flex items-center px-6 py-3 border border-purple-500 text-base font-medium rounded-md text-purple-500 bg-white hover:bg-purple-50"
            >
              🎪 Voir les festivals
            </a>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
} 