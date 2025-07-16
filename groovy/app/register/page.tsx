'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/header'
import { Footer } from '@/components/footer'

export default function RegisterPage() {
  const [nomComplet, setNomComplet] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validation des champs
    if (!nomComplet || !email || !password || !confirmPassword) {
      setError('Tous les champs sont requis')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nomComplet, email, password })
      })

      if (response.ok) {
        const data = await response.json()
        // Stocker le token dans localStorage
        localStorage.setItem('authToken', data.token)
        localStorage.setItem('userEmail', email)
        localStorage.setItem('userName', nomComplet)
        
        // Vérifier s'il y a un devis en attente
        const pendingDevis = localStorage.getItem('pendingDevis')
        if (pendingDevis) {
          localStorage.removeItem('pendingDevis')
          router.push('/mes-devis?pending=true')
        } else {
          router.push('/mes-devis')
        }
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Erreur lors de l\'inscription')
      }
    } catch (err) {
      setError('Erreur lors de l\'inscription')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <Header />
      
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-25 mb-25">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col justify-center items-center">
          <svg width="40" height="40" viewBox="0 0 113 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.83559 92.2684C-1.49188 84.8824 0.987592 75.3867 8.37364 71.0592L88.9742 23.8355C96.3603 19.508 105.856 21.9875 110.183 29.3736C114.511 36.7596 112.031 46.2553 104.645 50.5828L24.0448 97.8065C16.6587 102.134 7.16306 99.6544 2.83559 92.2684Z" fill="url(#paint0_linear_7_43)" fillOpacity="0.4"/>
            <path d="M2.72822 29.5576C7.03037 22.1568 16.5175 19.6448 23.9183 23.947L104.68 70.8943C112.081 75.1965 114.593 84.6836 110.291 92.0844C105.989 99.4853 96.5015 101.997 89.1007 97.6951L8.33886 50.7477C0.938036 46.4456 -1.57393 36.9584 2.72822 29.5576Z" fill="url(#paint1_linear_7_43)" fillOpacity="0.4"/>
            <path d="M72 15.5C72 24.0604 65.0604 31 56.5 31C47.9396 31 41 24.0604 41 15.5C41 6.93959 47.9396 0 56.5 0C65.0604 0 72 6.93959 72 15.5Z" fill="#4339F7"/>
            <path d="M113 36.5C113 45.0604 106.06 52 97.5 52C88.9396 52 82 45.0604 82 36.5C82 27.9396 88.9396 21 97.5 21C106.06 21 113 27.9396 113 36.5Z" fill="#58A5EF"/>
            <path d="M112 84.5C112 93.0604 105.06 100 96.5 100C87.9396 100 81 93.0604 81 84.5C81 75.9396 87.9396 69 96.5 69C105.06 69 112 75.9396 112 84.5Z" fill="#FF2F96"/>
            <path d="M72 108.5C72 117.06 65.0604 124 56.5 124C47.9396 124 41 117.06 41 108.5C41 99.9396 47.9396 93 56.5 93C65.0604 93 72 99.9396 72 108.5Z" fill="#FE8253"/>
            <path d="M32 84.5C32 93.0604 25.0604 100 16.5 100C7.93959 100 1 93.0604 1 84.5C1 75.9396 7.93959 69 16.5 69C25.0604 69 32 75.9396 32 84.5Z" fill="#009480"/>
            <path d="M31 36.5C31 45.0604 24.0604 52 15.5 52C6.93959 52 0 45.0604 0 36.5C0 27.9396 6.93959 21 15.5 21C24.0604 21 31 27.9396 31 36.5Z" fill="#8927F5"/>
            <defs>
            <linearGradient id="paint0_linear_7_43" x1="0" y1="62" x2="113" y2="62" gradientUnits="userSpaceOnUse">
            <stop stopColor="#009480"/>
            <stop offset="1" stopColor="#58A5EF"/>
            </linearGradient>
            <linearGradient id="paint1_linear_7_43" x1="0" y1="62" x2="113" y2="62" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8927F5"/>
            <stop offset="1" stopColor="#FF2F96"/>
            </linearGradient>
            </defs>
          </svg>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Créer votre compte
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="nomComplet" className="block text-sm/6 font-medium text-gray-900">
                Nom complet
              </label>
              <div className="mt-2">
                <input
                  id="nomComplet"
                  name="nomComplet"
                  type="text"
                  required
                  value={nomComplet}
                  onChange={(e) => setNomComplet(e.target.value)}
                  autoComplete="name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Adresse mail
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Mot de passe
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-purple-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-900">
                Confirmer le mot de passe
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-purple-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-purple-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-purple-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 disabled:opacity-50"
              >
                {loading ? 'Création du compte...' : 'Créer mon compte'}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Vous avez déjà un compte ?{' '}
            <a href="/login" className="font-semibold text-purple-500 hover:text-indigo-600">
              Connectez-vous !
            </a>
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  )
} 