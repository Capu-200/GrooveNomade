'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/header'
import { Footer } from '@/components/footer'
import LoadingSpinner from '@/components/LoadingSpinner'

interface Devis {
  id: string;
  nomComplet: string;
  email: string;
  nomFestival: string;
  dureeSejour: number;
  totalFestivalPrix: number;
  totalHebergementPrix: number;
  totalTransportPrix: number;
  activitesIA: string;
  nbVoyageurs: number;
  status: string;
  createdAt: string;
}

export default function MesDevisPage() {
  const [devis, setDevis] = useState<Devis[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showPendingMessage, setShowPendingMessage] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Vérifier l'authentification
    const token = localStorage.getItem('authToken')
    const email = localStorage.getItem('userEmail')
    const name = localStorage.getItem('userName')
    
    if (!token || !email) {
      router.push('/login')
      return
    }

    setUserEmail(email)
    setUserName(name)
    fetchDevis(email)
    
    // Vérifier les paramètres d'URL
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('success') === 'true') {
      setShowSuccessMessage(true)
    }
    if (urlParams.get('pending') === 'true') {
      setShowPendingMessage(true)
    }
  }, [router])

  const fetchDevis = async (email: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/devis?email=${encodeURIComponent(email)}`)
      
      if (response.ok) {
        const data = await response.json()
        setDevis(data.devis)
      } else {
        setError('Erreur lors du chargement des devis')
      }
    } catch (err) {
      setError('Erreur lors du chargement des devis')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userEmail')
    router.push('/login')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Nouveau':
        return 'bg-blue-100 text-blue-800'
      case 'En cours':
        return 'bg-yellow-100 text-yellow-800'
      case 'Validé':
        return 'bg-green-100 text-green-800'
      case 'Refusé':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleUpdateDevisStatus = async (devisId: string, newStatus: string) => {
    setActionLoading(devisId)
    
    try {
      const response = await fetch('/api/devis/update-status', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          devisId,
          status: newStatus
        })
      })

      if (response.ok) {
        // Mettre à jour le statut localement
        setDevis(prevDevis => 
          prevDevis.map(devis => 
            devis.id === devisId 
              ? { ...devis, status: newStatus }
              : devis
          )
        )
      } else {
        alert('Erreur lors de la mise à jour du statut')
      }
    } catch (error) {
      alert('Erreur lors de la mise à jour du statut')
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" text="Chargement de vos devis..." />
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      <Header />
      
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Mes devis
            </h1>
            <p className="text-gray-600 mt-2">
              Bonjour {userName || userEmail}, voici l'historique de vos demandes de devis
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
          >
            Se déconnecter
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {showSuccessMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
            ✅ Votre devis a été créé avec succès ! Il sera traité dans les plus brefs délais.
          </div>
        )}

        {showPendingMessage && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-6">
            🔄 Votre demande de devis est en cours de traitement. Vous recevrez une notification dès qu'elle sera prête.
          </div>
        )}

        {devis.length === 0 && !error ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun devis trouvé
            </h3>
            <p className="text-gray-600 mb-6">
              Vous n'avez pas encore demandé de devis. Commencez par explorer nos festivals !
            </p>
            <a
              href="/festivals"
              className="bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-600"
            >
              Voir les festivals
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {devis.map((devis) => (
              <div key={devis.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {devis.nomFestival}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Demande de {devis.nomComplet} • {formatDate(devis.createdAt)}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(devis.status)}`}>
                    {devis.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Durée</p>
                    <p className="font-semibold">{devis.dureeSejour} jour{devis.dureeSejour > 1 ? 's' : ''}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Voyageurs</p>
                    <p className="font-semibold">{devis.nbVoyageurs} personne{devis.nbVoyageurs > 1 ? 's' : ''}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Total estimé</p>
                    <p className="font-semibold text-purple-600">
                      {devis.totalFestivalPrix + devis.totalHebergementPrix + devis.totalTransportPrix}€
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Festival:</span>
                      <span className="ml-2 font-medium">{devis.totalFestivalPrix}€</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Hébergement:</span>
                      <span className="ml-2 font-medium">{devis.totalHebergementPrix}€</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Transport:</span>
                      <span className="ml-2 font-medium">{devis.totalTransportPrix}€</span>
                    </div>
                  </div>
                </div>

                {devis.activitesIA && (
                  <div className="mt-4 p-3 bg-purple-50 rounded">
                    <p className="text-sm font-medium text-purple-800 mb-1">Suggestions d'activités IA:</p>
                    <p className="text-sm text-purple-700">{devis.activitesIA}</p>
                  </div>
                )}

                {/* Boutons d'action pour les devis en cours */}
                {devis.status === 'En cours' && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleUpdateDevisStatus(devis.id, 'Validé')}
                        disabled={actionLoading === devis.id}
                        className="flex-1 bg-emeraude-300 text-white px-4 py-2 rounded-md hover:bg-emeraude-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {actionLoading === devis.id ? 'Traitement...' : '✅ Accepter le devis'}
                      </button>
                      <button
                        onClick={() => handleUpdateDevisStatus(devis.id, 'Refusé')}
                        disabled={actionLoading === devis.id}
                        className="flex-1 bg-neutral-300 text-white px-4 py-2 rounded-md hover:bg-stone-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {actionLoading === devis.id ? 'Traitement...' : '❌ Refuser le devis'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Message de confirmation pour les devis acceptés */}
                {devis.status === 'Validé' && (
                  <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
                    <p className="text-sm text-green-800">
                      ✅ Votre devis a été accepté ! Vous recevrez bientôt les détails de votre voyage.
                    </p>
                  </div>
                )}

                {/* Message pour les devis refusés */}
                {devis.status === 'Refusé' && (
                  <div className="mt-4 p-3 bg-red-50 rounded border border-red-200">
                    <p className="text-sm text-red-800">
                      ❌ Ce devis a été refusé. N'hésitez pas à demander un nouveau devis pour un autre festival.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  )
} 