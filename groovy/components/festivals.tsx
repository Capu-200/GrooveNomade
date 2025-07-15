'use client'

const festivals = [
    {
      id: 1,
      name: 'Garorock',
      href: '#',
      imageSrc: 'https://bullesdeculture.com/bdc-content/uploads/2024/06/garorock-2024-affiche.jpg',
      imageAlt: "Affiche du Lineup du festival Garorock de juin 2024",
      price: '$40',
      pass: 'Pass un jour',
    },
    {
      id: 2,
      name: 'Basic Tee',
      href: '#',
      imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg',
      imageAlt: "Front of men's Basic Tee in white.",
      price: '$35',
      pass: 'Aspen White',
    },
    {
      id: 3,
      name: 'Basic Tee',
      href: '#',
      imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg',
      imageAlt: "Front of men's Basic Tee in dark gray.",
      price: '$35',
      pass: 'Charcoal',
    },
    {
      id: 4,
      name: 'Artwork Tee',
      href: '#',
      imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg',
      imageAlt: "Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube.",
      price: '$35',
      pass: 'Iso Dots',
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
                  <p className="text-sm font-medium text-gray-900">{festival.price}</p>
                </div>
              </div>
            ))}
          </div>
      </div>
    )
  }
  