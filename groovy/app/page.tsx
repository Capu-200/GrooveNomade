'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, SparklesIcon, ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon, GlobeEuropeAfricaIcon } from '@heroicons/react/24/outline'
import {Footer} from "@/components/footer"
import Header from "@/components/header"
import Festivals from '@/components/festivals'
import Newsletter from "@/components/newsletter"

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

export default function Home() {

  return (
    <div className="bg-white h-fit">
      <Header></Header>
      
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
            Vivez les plus grands festivals du monde tout en explorant les cultures locales.
            Personnalisé. Immersif. Inoubliable.
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

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Les prochains festivals</h2>
        <Festivals></Festivals>
      </div>

      <Newsletter></Newsletter>
      
      <Footer/>
    </div>
  )
}
