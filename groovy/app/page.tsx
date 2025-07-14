'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, SparklesIcon, ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon, GlobeEuropeAfricaIcon } from '@heroicons/react/24/outline'
import {Footer} from "@/components/footer"

const features = [
  {
    name: 'IA musicale',
    description:
      'Recommandations selon vos goûts et vos vibes.',
    icon: SparklesIcon,
  },
  {
    name: 'Expérience locale',
    description:
      'Activités culturelles autour des festivals.',
    icon: GlobeEuropeAfricaIcon,
  },
  {
    name: 'Organisation simplifiée',
    description:
      'Transport, hébergement, billets… Tout est centralisé.',
    icon: ArrowPathIcon,
  },
]

const navigation = [
  { name: 'Festivals', href: '/festivals' },
  { name: 'Destinations', href: '#' },
  { name: 'À propos', href: '#' },
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white h-fit">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
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
            <a href="/login" className="text-sm/6 font-semibold text-gray-900">
              Se connecter <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Groove Nomad</span>
                <svg width="24" height="24" viewBox="0 0 113 124" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                  <a
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Se connecter
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
      
      
      <div className="relative isolate px-6 py-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Recommandation personnalisée par IA. {' '}
              <a href="#" className="font-semibold text-purple-500">
                <span aria-hidden="true" className="absolute inset-0" />
                Lire plus <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              Vivez les festivals du monde entier
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Découvrez des expériences musicales uniques avec des voyages sur-mesure. Notre IA vous recommande les festivals parfaits selon vos goûts musicaux et vos envies d'aventure.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/login"
                className="rounded-md bg-purple-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-purple-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Créer mon profil musical
              </a>
              <a href="#" className="text-sm/6 font-semibold text-gray-900">
                En apprendre plus <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-14 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-purple-500">Pourquoi Groove Nomad ?</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
            Bien plus qu’un voyage, une aventure musicale sur-mesure
          </p>
          <p className="mt-6 text-lg/8 text-gray-700">
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
            pulvinar et feugiat blandit at. In mi viverra elit nunc.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className={`absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-blue-500`}>
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      
      <Footer/>
    </div>
  )
}
