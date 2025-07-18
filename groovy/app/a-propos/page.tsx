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
            Votre partenaire de confiance pour découvrir les meilleurs festivals du monde
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Notre Mission</h2>
            <p className="text-gray-600 mb-4">
              Chez GrooveNomad, nous croyons que la musique a le pouvoir de rassembler les gens et de créer des expériences inoubliables. Notre mission est de vous faciliter l'accès aux meilleurs festivals du monde en vous proposant des devis personnalisés incluant transport, hébergement et pass festival.
            </p>
            <p className="text-gray-600">
              Nous travaillons en partenariat avec les organisateurs de festivals les plus réputés pour vous garantir des expériences authentiques et des prix compétitifs.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pourquoi nous choisir ?</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center">
                    <span className="text-purple-500 text-sm font-semibold">1</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Devis personnalisés</h3>
                  <p className="text-gray-600">Recevez des devis sur mesure selon vos préférences et votre budget.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center">
                    <span className="text-purple-500 text-sm font-semibold">2</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Packages complets</h3>
                  <p className="text-gray-600">Transport, hébergement et pass festival inclus dans une seule offre.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center">
                    <span className="text-purple-500 text-sm font-semibold">3</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Support IA</h3>
                  <p className="text-gray-600">Suggestions d'activités personnalisées grâce à notre intelligence artificielle.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Nos Chiffres</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-500 mb-2">50+</div>
              <div className="text-gray-600">Festivals partenaires</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-500 mb-2">1000+</div>
              <div className="text-gray-600">Voyageurs satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-500 mb-2">25</div>
              <div className="text-gray-600">Pays couverts</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Prêt à vivre l'aventure ?</h2>
          <p className="text-gray-600 mb-8">
            Découvrez nos festivals et commencez à planifier votre prochaine aventure musicale dès aujourd'hui.
          </p>
          <a
            href="/festivals"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-500 hover:bg-purple-600"
          >
            Voir les festivals
          </a>
        </div>
      </div>
      
      <Footer />
    </div>
  )
} 