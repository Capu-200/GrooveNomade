import { StarIcon } from '@heroicons/react/20/solid'
import Header from '@/components/header'
import { Footer } from '@/components/footer'

const product = {
  name: 'Garorock',
  price: '192€',
  href: '#',
  images: [
    {
      src: 'https://bullesdeculture.com/bdc-content/uploads/2024/06/garorock-2024-affiche.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://www.vie-economique.com/wp-content/uploads/sites/13/2023/07/Garorock_j2_2023_julien_mivielle_vie_eco-12-scaled.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://www.garorock.com/build/images/2025/plan/plan-garorock-2025.31c959a6.gif',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://livealike.fr/wp-content/uploads/2018/05/the-place-to-be-le-festival-garorock-2019.png',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  transports: [
    { id: 'avion', name: 'Avion'},
    { id: 'bus', name: 'Bus'},
    { id: 'train', name: 'Train'},
  ],
  pass: [
    { id: '1j', name: '1j', inStock: true },
    { id: '2j', name: '2j', inStock: true },
    { id: '3j', name: '3j', inStock: true },
  ],
  hebergement: [
    { id: '1', name: 'Hôtel 4*', inStock: true },
    { id: '2', name: 'Auberge de jeunesse', inStock: true },
    { id: '3', name: 'Camping', inStock: true },
    { id: '4', name: 'Hôtel 3*', inStock: true },
    { id: '5', name: 'Sans hébergement', inStock: true },
  ],
  voyageur: [
    { name: '1', inStock: true },
    { name: '2', inStock: true },
    { name: '3', inStock: true },
    { name: '4', inStock: true },
    { name: '5', inStock: true },
    { name: '6', inStock: true },
    { name: '7', inStock: true },
    { name: '8', inStock: true },
  ],
  description:
    'Garorock est un festival de musique pop, rap, electro et techno qui a lieu à Marmande, en Lot-et-Garonne, en France. Le festival à tendance punk/rock naît en mars 1997, dans les anciens abattoirs de Marmande. Son nom, Garorock est un jeu de mots réunissant Garonne et Rock. Il laisse aussi entendre Gare au Rock.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes : any) {
  return classes.filter(Boolean).join(' ')
}

export default function Festival() {
  return (
    <div className="bg-white h-full flex flex-col justify-center gap-5">
        <Header></Header>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            {/* <div aria-label="">
                <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    {product.breadcrumbs.map((breadcrumb) => (
                    <li key={breadcrumb.id}>
                        <div className="flex items-center">
                        <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                            {breadcrumb.name}
                        </a>
                        <svg
                            fill="currentColor"
                            width={16}
                            height={20}
                            viewBox="0 0 16 20"
                            aria-hidden="true"
                            className="h-5 w-4 text-gray-300"
                        >
                            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                        </svg>
                        </div>
                    </li>
                    ))}
                    <li className="text-sm">
                    <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                        {product.name}
                    </a>
                    </li>
                </ol>
            </div> */}

            {/* Image gallery */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
                <img
                    alt={product.images[0].alt}
                    src={product.images[0].src}
                    className="row-span-2 aspect-3/4 size-full rounded-lg object-cover max-lg:hidden"
                />
                <img
                    alt={product.images[1].alt}
                    src={product.images[1].src}
                    className="col-start-2 aspect-3/2 size-full rounded-lg object-cover max-lg:hidden"
                />
                <img
                    alt={product.images[2].alt}
                    src={product.images[2].src}
                    className="col-start-2 row-start-2 aspect-3/2 size-full rounded-lg object-cover max-lg:hidden"
                />
                <img
                    alt={product.images[3].alt}
                    src={product.images[3].src}
                    className="row-span-2 aspect-4/5 size-full object-cover sm:rounded-lg lg:aspect-3/4"
                />
            </div>

            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-4 lg:px-8 lg:pt-16 lg:pb-24">
                <div className="lg:col-span-2">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                </div>

                {/* Options */}
                <div className="mt-4 lg:row-span-3 lg:mt-0 lg:border-l lg:pl-8 lg:border-gray-200 lg:pb-5">
                    <h2 className="sr-only">Informations sur le festival</h2>
                    <div className='flex flex-row items-end gap-2'>
                        <p className="text-lg tracking-tight text-gray-500">à partir de</p>
                        <p className="text-3xl tracking-tight text-gray-900">{product.price}</p>
                    </div>
                    

                    <form className="mt-10">

                        {/* Colors */}
                        {/* <div>
                            <h3 className="text-sm font-medium text-gray-900">Color</h3>

                            
                            <div className="flex items-center ps-4 border border-gray-200 rounded-sm dark:border-gray-700">
                                <input id="bordered-radio-1" type="radio" value="" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default radio</label>
                            </div>
                            <div className="flex items-center ps-4 border border-gray-200 rounded-sm dark:border-gray-700">
                                <input checked id="bordered-radio-2" type="radio" value="" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                            </div>

                        </div> */}

                        {/* Pass */}
                        <div className="mt-10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-900">Choix du pass</h3>
                            </div>

                            <fieldset aria-label="Choisissez un pass" className="mt-4">
                                <div className="grid grid-cols-4 gap-3">
                                    {product.pass.map((jour) => (
                                    <label
                                        key={jour.name}
                                        aria-label={jour.name}
                                        className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-900 p-3 has-checked:border-purple-600 has-checked:bg-purple-500 has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-purple-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25"
                                    >
                                        <input
                                        defaultValue={jour.name}
                                        defaultChecked={jour === product.pass[2]}
                                        name="pass"
                                        type="radio"
                                        disabled={!jour.inStock}
                                        className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                                        />
                                        <span className="text-sm font-medium group-has-checked:text-white">{jour.name}</span>
                                    </label>
                                    ))}
                                </div>
                            </fieldset>
                        </div>

                        {/* Transport */}
                        <div className="mt-10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-900">Choix du transport</h3>
                            </div>

                            <fieldset aria-label="Choisissez un mode de transport" className="mt-4">
                                <div className="grid grid-cols-4 gap-3">
                                    {product.transports.map((transport) => (
                                    <label
                                        key={transport.name}
                                        aria-label={transport.name}
                                        className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-900 p-3 has-checked:border-purple-600 has-checked:bg-purple-500 has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-purple-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25"
                                    >
                                        <input
                                        defaultValue={transport.name}
                                        defaultChecked={transport === product.pass[2]}
                                        name="transport"
                                        type="radio"
                                        className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                                        />
                                        <span className="text-sm font-medium group-has-checked:text-white">{transport.name}</span>
                                    </label>
                                    ))}
                                </div>
                            </fieldset>
                        </div>

                        {/* Hébergement */}
                        <div className="mt-10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-900">Choix de l'hébergement</h3>
                            </div>

                            <fieldset aria-label="Choisissez un type d'hébergement" className="mt-4">
                                <div className="grid grid-cols-3 gap-3">
                                    {product.hebergement.map((maison) => (
                                    <label
                                        key={maison.name}
                                        aria-label={maison.name}
                                        className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-900 p-3 has-checked:border-purple-600 has-checked:bg-purple-500 has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-purple-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25"
                                    >
                                        <input
                                        defaultValue={maison.name}
                                        defaultChecked={maison === product.pass[2]}
                                        name="maison"
                                        type="radio"
                                        className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                                        />
                                        <span className="text-sm font-medium group-has-checked:text-white">{maison.name}</span>
                                    </label>
                                    ))}
                                </div>
                            </fieldset>
                        </div>

                        {/* Nb de voyageurs */}
                        <div className="mt-10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-900">Nombre de voyageurs</h3>
                            </div>

                            <fieldset aria-label="Choisissez un nombre de voyageur" className="mt-4">
                                <div className="grid grid-cols-4 gap-3">
                                    {product.voyageur.map((nb) => (
                                    <label
                                        key={nb.name}
                                        aria-label={nb.name}
                                        className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-900 p-3 has-checked:border-purple-600 has-checked:bg-purple-500 has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-purple-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25"
                                    >
                                        <input
                                        defaultValue={nb.name}
                                        defaultChecked={nb === product.voyageur[2]}
                                        name="nb_voyageurs"
                                        type="radio"
                                        disabled={!nb.inStock}
                                        className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                                        />
                                        <span className="text-sm font-medium uppercase group-has-checked:text-white">{nb.name}</span>
                                    </label>
                                    ))}
                                </div>
                            </fieldset>
                        </div>

                        <button
                            type="submit"
                            className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-purple-500 px-8 py-3 text-base font-semibold text-white hover:bg-purl-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-hidden"
                        >
                            Demander un devis
                        </button>
                    </form>
                </div>

                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pt-6 lg:pr-2 lg:pb-16">
                    {/* Description and details */}
                    <div>
                    <h3 className="sr-only">Description</h3>

                    <div className="space-y-6">
                        <p className="text-base text-gray-900">{product.description}</p>
                    </div>
                    </div>

                    <div className="mt-10">
                    <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                    <div className="mt-4">
                        <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                        {product.highlights.map((highlight) => (
                            <li key={highlight} className="text-gray-400">
                            <span className="text-gray-600">{highlight}</span>
                            </li>
                        ))}
                        </ul>
                    </div>
                    </div>

                    <div className="mt-10">
                    <h2 className="text-sm font-medium text-gray-900">Details</h2>

                    <div className="mt-4 space-y-6">
                        <p className="text-sm text-gray-600">{product.details}</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
  )
}
