'use client'

const festivals = [
    {
      id: 1,
      name: 'Garorock',
      href: '/festival/id',
      imageSrc: 'https://bullesdeculture.com/bdc-content/uploads/2024/06/garorock-2024-affiche.jpg',
      imageAlt: "Affiche du Lineup du festival Garorock de juin 2024.",
      jour: '3j',
      pass: 'À Marmande',
    },
    {
      id: 2,
      name: 'Château Perché',
      href: '#',
      imageSrc: 'https://chateauperchefestival.com/wp-content/uploads/2025/06/AfficheFinale.png',
      imageAlt: "Affiche de la programmation du festival Château Perché de 2025.",
      jour: '3j',
      pass: 'À Bouville',
    },
    {
      id: 3,
      name: 'Les Plages Électroniques',
      href: '#',
      imageSrc: 'https://d1k4bi32qf3nf2.cloudfront.net/product/2025/05/festival_les_plages_electroniques_billets_cannes_affiche_1747305936.jpg',
      imageAlt: "Front of men's Basic Tee in dark gray.",
      jour: '3j',
      pass: 'À Cannes',
    },
    {
      id: 4,
      name: 'Lollapalooza Paris',
      href: '#',
      imageSrc: 'https://festivawl.com/wp-content/uploads/2024/12/Lollapalooza-Paris-2025-Lineup.webp',
      imageAlt: "Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube.",
      jour: '3j',
      pass: 'À Paris',
    },
  ]
  
  export default function Festivals() {
    return (
      <div className="bg-white">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {festivals.map((festival) => (
              <div key={festival.id} className="group relative">
                <img
                  alt={festival.imageAlt}
                  src={festival.imageSrc}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={festival.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {festival.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{festival.pass}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{festival.jour}</p>
                </div>
              </div>
            ))}
          </div>
      </div>
    )
  }
  