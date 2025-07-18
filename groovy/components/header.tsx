'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, SparklesIcon, ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon, GlobeEuropeAfricaIcon, UserCircleIcon } from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Assistant IA', href: '/chatbot' },
    { name: 'Festivals', href: '/festivals' },
    { name: 'Mes Devis', href: '/mes-devis' },
    { name: 'À propos', href: '/a-propos' },
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userName, setUserName] = useState('')

    useEffect(() => {
        // Vérifier si l'utilisateur est connecté
        const token = localStorage.getItem('authToken')
        const name = localStorage.getItem('userName')
        const email = localStorage.getItem('userEmail')
        
        if (token) {
            setIsLoggedIn(true)
            setUserName(name || email || 'Utilisateur')
        }
    }, [])

    // Fonction de déconnexion
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        window.location.href = '/';
    }

    return(
        <header className="absolute inset-x-0 top-0 z-50">
            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
              <div className="flex lg:flex-1">
                <a href="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
                  <img src="/logo.svg" alt="GrooveNomad" className="w-10 h-10" />
                  <span className="text-xl font-bold text-gray-900">GrooveNomad</span>
                </a>
              </div>
              <div className="flex lg:hidden">
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(true)}
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                >
                    <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="hidden lg:flex lg:gap-x-12">
                {navigation.map((item) => (
                    <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900">
                        {item.name}
                    </a>
                ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {isLoggedIn ? (
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <UserCircleIcon className="h-5 w-5 text-purple-600" />
                                <span className="text-sm/6 font-semibold text-gray-900">
                                    {userName}
                                </span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="text-sm/4 ml-4 mr-2 font-semibold text-orange-500 hover:text-orange-600 transition"
                            >
                                Se déconnecter
                            </button>
                        </div>
                    ) : (
                        <a href="/login" className="text-sm/6 font-semibold text-gray-900">
                            Se connecter <span aria-hidden="true">&rarr;</span>
                        </a>
                    )}
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
                            <span className="sr-only">GrooveNomad</span>
                            <img src="/logo.svg" alt="GrooveNomad" className="w-6 h-6" />
                            <span className="text-lg font-bold text-gray-900">GrooveNomad</span>
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                        <div className="space-y-2 py-6">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                            >
                                {item.name}
                            </a>
                        ))}
                        </div>
                        <div className="py-6">
                        {isLoggedIn ? (
                            <>
                                <div className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900">
                                    <div className="flex items-center space-x-2">
                                        <UserCircleIcon className="h-5 w-5 text-purple-600" />
                                        <span>{userName}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="mt-2 w-full px-3 py-2 rounded bg-gray-200 text-gray-800 text-base font-medium hover:bg-gray-300 transition"
                                >
                                    Se déconnecter
                                </button>
                            </>
                        ) : (
                            <a
                                href="/login"
                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                            >
                                Se connecter
                            </a>
                        )}
                        </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}