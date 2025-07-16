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
import FestivalFilters from "@/components/FestivalFilters"
import FestivalSort from "@/components/FestivalSort"
import { getFestivals, Festival } from "@/lib/airtable"

export default function FestivalsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [festivals, setFestivals] = useState<Festival[]>([])
  const [filteredFestivals, setFilteredFestivals] = useState<Festival[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentSort, setCurrentSort] = useState('date_asc')

  const fetchFestivals = async () => {
    try {
      setLoading(true)
      console.log('🚀 Début du chargement des festivals...');
      const data = await getFestivals()
      setFestivals(data)
      setFilteredFestivals(data)
      setError(null)
    } catch (err) {
      console.error('❌ Erreur détaillée:', err);
      setError('Erreur lors du chargement des festivals')
    } finally {
      setLoading(false)
    }
  }

  const parseDate = (dateString: string) => {
    if (!dateString) return new Date(0);
    
    // Gestion du format français DD/MM/YYYY
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/');
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }
    
    // Format standard YYYY-MM-DD
    return new Date(dateString);
  };

  const sortFestivals = (festivalsToSort: Festival[], sortBy: string) => {
    const sorted = [...festivalsToSort];
    
    switch (sortBy) {
      case 'date_asc':
        return sorted.sort((a, b) => parseDate(a.date_debut || '').getTime() - parseDate(b.date_debut || '').getTime());
      case 'date_desc':
        return sorted.sort((a, b) => parseDate(b.date_debut || '').getTime() - parseDate(a.date_debut || '').getTime());
      case 'name_asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name_desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'price_asc':
        return sorted.sort((a, b) => (a.price_1_day || 0) - (b.price_1_day || 0));
      case 'price_desc':
        return sorted.sort((a, b) => (b.price_1_day || 0) - (a.price_1_day || 0));
      case 'days_asc':
        return sorted.sort((a, b) => (a.nb_jours || 0) - (b.nb_jours || 0));
      case 'days_desc':
        return sorted.sort((a, b) => (b.nb_jours || 0) - (a.nb_jours || 0));
      default:
        return sorted;
    }
  };

  const handleFiltersChange = (filtered: Festival[]) => {
    const sorted = sortFestivals(filtered, currentSort);
    setFilteredFestivals(sorted);
  };

  const handleSortChange = (sortBy: string) => {
    setCurrentSort(sortBy);
    const sorted = sortFestivals(filteredFestivals, sortBy);
    setFilteredFestivals(sorted);
  };

  useEffect(() => {
    fetchFestivals()
  }, [])

  return (
    <div className="bg-white min-h-screen">
      <Header/>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
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
          <div className="flex gap-8">
            {/* Filtres sur le côté */}
            <div className="w-80 flex-shrink-0">
              <FestivalFilters 
                festivals={festivals} 
                onFiltersChange={handleFiltersChange}
              />
            </div>

            {/* Contenu principal */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-gray-600">
                  {filteredFestivals.length} festival{filteredFestivals.length > 1 ? 's' : ''} trouvé{filteredFestivals.length > 1 ? 's' : ''}
                </p>
                <FestivalSort 
                  onSortChange={handleSortChange}
                  currentSort={currentSort}
                />
              </div>

              {filteredFestivals.length === 0 && (
                <EmptyState 
                  title="Aucun résultat"
                  description="Aucun festival ne correspond à vos critères de recherche. Essayez de modifier vos filtres."
                />
              )}

              {filteredFestivals.length > 0 && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredFestivals.map((festival) => (
                    <FestivalCard key={festival.id} festival={festival} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer/>
    </div>
  )
}
  