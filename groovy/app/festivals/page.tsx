'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, SparklesIcon, ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon, GlobeEuropeAfricaIcon } from '@heroicons/react/24/outline'

import {Footer} from "@/components/footer"
import Header from "@/components/header"
import FestivalCard from "@/components/FestivalCard"
import LoadingSpinner from "@/components/LoadingSpinner"
import EmptyState from "@/components/EmptyState"
import ErrorMessage from "@/components/ErrorMessage"
import { getFestivals, Festival } from "@/lib/airtable"

export default function FestivalsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [festivals, setFestivals] = useState<Festival[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFestivals = async () => {
    try {
      setLoading(true)
      console.log('🚀 Début du chargement des festivals...');
      console.log('Variables env:', {
        apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY ? '✅ Présente' : '❌ Manquante',
        baseId: process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID ? '✅ Présente' : '❌ Manquante'
      });
      
      const data = await getFestivals()
      console.log('📊 Données reçues:', data.length, 'festivals');
      setFestivals(data)
      setError(null)
    } catch (err) {
      console.error('❌ Erreur détaillée:', err);
      setError('Erreur lors du chargement des festivals')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFestivals()
  }, [])

  return (
    <div className="bg-white min-h-screen">
      <Header/>

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Les prochains festivals
          </h2>
          {loading && (
            <LoadingSpinner size="sm" text="Chargement des festivals..." />
          )}
        </div>

        {error && (
          <ErrorMessage 
            title="Erreur de chargement"
            message={error}
            onRetry={() => {
              setError(null)
              setLoading(true)
              fetchFestivals()
            }}
          />
        )}

        {!loading && festivals.length === 0 && !error && (
          <EmptyState 
            title="Aucun festival trouvé"
            description="Il n'y a actuellement aucun festival à afficher. Revenez plus tard !"
          />
        )}

        {!loading && festivals.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {festivals.map((festival) => (
              <FestivalCard key={festival.id} festival={festival} />
            ))}
          </div>
        )}
      </div>

      <Footer/>
    </div>
  )
}
  