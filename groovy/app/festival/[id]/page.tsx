'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { StarIcon } from '@heroicons/react/20/solid'
import Header from '@/components/header'
import { Footer } from '@/components/footer'
import LoadingSpinner from '@/components/LoadingSpinner'
import { getFestivalById, getHebergementsByFestivalId, getTransportsByFestivalId, Festival } from '@/lib/airtable'

interface Hebergement {
  id: string;
  name: string;
  prix_nuit: number;
  type: string;
}

interface Transport {
  id: string;
  ville_depart: string;
  ville_arrivee: string;
  prix_aller_retour: number;
  duree_estimee: number;
  mode: string;
  compagnie: string;
}

interface FestivalDetailProps {
  params: {
    id: string;
  };
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function FestivalDetail({ params }: FestivalDetailProps) {
  const id = params.id;
  const router = useRouter();
  const [festival, setFestival] = useState<(Festival & { airtableId: string }) | null>(null);
  const [hebergements, setHebergements] = useState<Hebergement[]>([]);
  const [transports, setTransports] = useState<Transport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // États pour les choix de l'utilisateur
  const [selectedDays, setSelectedDays] = useState<string>('');
  const [selectedTransport, setSelectedTransport] = useState<string>('');
  const [selectedHebergement, setSelectedHebergement] = useState<string>('');
  const [nbVoyageurs, setNbVoyageurs] = useState<string>('1');
  const [dureeSejour, setDureeSejour] = useState<string>('1');
  const [activityPrompt, setActivityPrompt] = useState('');
  const [activitySuggestions, setActivitySuggestions] = useState<string | null>(null);
  const [activityLoading, setActivityLoading] = useState(false);

  // États pour le modal de devis
  const [showDevisModal, setShowDevisModal] = useState(false);
  const [devisLoading, setDevisLoading] = useState(false);
  const [nomComplet, setNomComplet] = useState('');
  const [email, setEmail] = useState('');
  const [devisSuccess, setDevisSuccess] = useState(false);

  // Fonction pour initialiser les champs du devis avec les infos utilisateur
  const initializeDevisForm = () => {
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    
    if (userName) setNomComplet(userName);
    if (userEmail) setEmail(userEmail);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Récupérer les données du festival
        const festivalData = await getFestivalById(id);
        if (!festivalData) {
          setError('Festival non trouvé');
          return;
        }
        setFestival(festivalData);

        // Récupérer les hébergements et transports liés avec le champ public (ex: FES019)
        const hebergementsData = await getHebergementsByFestivalId(festivalData.id);
        setHebergements(hebergementsData);

        const transportsData = await getTransportsByFestivalId(festivalData.id);
        setTransports(transportsData);

        // Définir les valeurs par défaut
        if (festivalData.nb_jours) {
          setSelectedDays(festivalData.nb_jours.toString());
        }
        if (hebergementsData.length > 0) {
          setSelectedHebergement(hebergementsData[0].id);
        }
        if (transportsData.length > 0) {
          setSelectedTransport(transportsData[0].id);
        }

      } catch (err) {
        console.error('Erreur lors du chargement:', err);
        setError('Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Calculer le prix total
  const calculateTotalPrice = () => {
    if (!festival) return 0;

    let total = 0;

    // Prix du festival selon le nombre de jours
    if (selectedDays === '1' && festival.price_1_day) {
      total += festival.price_1_day * parseInt(nbVoyageurs);
      ;
    } else if (selectedDays === '2' && festival.price_2_days) {
        total += festival.price_2_days * parseInt(nbVoyageurs);
    } else if (selectedDays === '3' && festival.price_3_days) {
      total += festival.price_3_days * parseInt(nbVoyageurs);
    }

    // Prix de l'hébergement
    const selectedHebergementData = hebergements.find(h => h.id === selectedHebergement);
    if (selectedHebergementData && selectedHebergementData.prix_nuit > 0) {
      total += selectedHebergementData.prix_nuit * parseInt(dureeSejour) * parseInt(nbVoyageurs);
    }

    // Prix du transport
    const selectedTransportData = transports.find(t => t.id === selectedTransport);
    if (selectedTransportData && selectedTransportData.prix_aller_retour > 0) {
      total += selectedTransportData.prix_aller_retour * parseInt(nbVoyageurs);
    }

    return total;
  };

  // Fonction d'appel à l'IA (à adapter avec NextAI SDK ou ton API)
  const handleSuggestActivities = async () => {
    setActivityLoading(true);
    setActivitySuggestions(null);
    // Exemple d'appel API (à remplacer par NextAI SDK si tu l'utilises)
    try {
      // Remplace cette partie par l'appel NextAI SDK si tu l'utilises
      const response = await fetch('/api/ai-suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: activityPrompt,
          festival: festival?.name,
          ville: festival?.city,
          pays: festival?.country,
        }),
      });
      const data = await response.json();
      setActivitySuggestions(data.suggestions);
    } catch (e) {
      setActivitySuggestions("Erreur lors de la génération des suggestions.");
    }
    setActivityLoading(false);
  };

  // Fonction de soumission du devis
  const handleSubmitDevis = async (e: React.FormEvent) => {
    e.preventDefault();
    setDevisLoading(true);

    try {
      const response = await fetch('/api/create-devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nomComplet,
          email,
          festivalName: festival?.name,
          festivalId: festival?.id,
          hebergementId: selectedHebergement,
          transportId: selectedTransport,
          selectedDays: dureeSejour,
          totalFestivalPrix: selectedDays === '1' ? festival?.price_1_day : 
                            selectedDays === '2' ? festival?.price_2_days : 
                            festival?.price_3_days,
          totalHebergementPrix: hebergements.find(h => h.id === selectedHebergement)?.prix_nuit || 0,
          totalTransportPrix: transports.find(t => t.id === selectedTransport)?.prix_aller_retour || 0,
          activiteIA: activitySuggestions,
          nbVoyageurs,
        }),
      });

      if (response.ok) {
        setDevisSuccess(true);
        setDevisLoading(false);
        // Fermer le modal après 2 secondes et rediriger
        setTimeout(() => {
          setShowDevisModal(false);
          setDevisSuccess(false);
          router.push('/mes-devis?success=true');
        }, 2000);
      } else {
        alert('Erreur lors de la création du devis');
        setDevisLoading(false);
      }
    } catch (error) {
      alert('Erreur lors de la création du devis');
      setDevisLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" text="Chargement du festival..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !festival) {
    return (
      <div className="bg-white min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Erreur</h2>
            <p className="text-gray-600">{error || 'Festival non trouvé'}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const totalPrice = calculateTotalPrice();

  const passOptions = [
    festival.price_1_day && { value: '1', label: `1j - ${festival.price_1_day}€` },
    festival.price_2_days && { value: '2', label: `2j - ${festival.price_2_days}€` },
    festival.price_3_days && { value: '3', label: `3j - ${festival.price_3_days}€` },
  ].filter((option): option is { value: string; label: string } => Boolean(option));

  return (
    <div className="bg-white h-full flex flex-col justify-center gap-5">
      <Header />
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            {/* Image gallery */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
          {festival.imageUrl ? (
            <img
              alt={festival.name}
              src={festival.imageUrl}
              className="row-span-2 aspect-3/4 size-full rounded-lg object-cover"
            />
          ) : (
            <div className="row-span-2 aspect-3/4 size-full rounded-lg bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Aucune image</span>
            </div>
          )}
            </div>

            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-4 lg:px-8 lg:pt-16 lg:pb-24">
                <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{festival.name}</h1>
            {festival.city && festival.country && (
              <p className="text-lg text-gray-600 mt-2">📍 {festival.city}, {festival.country}</p>
            )}
            {festival.date_debut && (
              <p className="text-lg text-gray-600 mt-1">📅 du {festival.date_debut} au {festival.date_fin}</p>
            )}
                </div>

                {/* Options */}
                <div className="mt-4 lg:row-span-3 lg:mt-0 lg:border-l lg:pl-8 lg:border-gray-200 lg:pb-5">
                    <h2 className="sr-only">Informations sur le festival</h2>
                    <div className='flex flex-row items-end gap-2'>
                        <p className="text-lg tracking-tight text-gray-500">à partir de</p>
              <p className="text-3xl tracking-tight text-gray-900">{festival.price_1_day}€</p>
                    </div>

                    <form className="mt-10">
              {/* Choix du nombre de jours */}
                        <div className="mt-10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-900">Choix du pass</h3>
                            </div>

                            <fieldset aria-label="Choisissez un pass" className="mt-4">
                  <div className={`grid gap-3 grid-cols-${passOptions.length}`}>
                    {passOptions.map(opt => (
                                    <label
                        key={opt.value}
                        className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-900 p-3 has-checked:border-purple-600 has-checked:bg-purple-500 has-checked:text-white"
                                    >
                                        <input
                          value={opt.value}
                          checked={selectedDays === opt.value}
                          onChange={(e) => setSelectedDays(e.target.value)}
                                        name="pass"
                                        type="radio"
                          className="absolute inset-0 appearance-none focus:outline-none"
                                        />
                        <span className="text-sm font-medium group-has-checked:text-white">{opt.label}</span>
                                    </label>
                                    ))}
                                </div>
                            </fieldset>
                        </div>

                        {/* Transport */}
              {transports.length > 0 && (
                        <div className="mt-10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-900">Choix du transport</h3>
                            </div>

                            <fieldset aria-label="Choisissez un mode de transport" className="mt-4">
                    <div className="grid grid-cols-1 gap-3">
                      {transports.map((transport) => (
                                    <label
                          key={transport.id}
                          className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-900 p-3 has-checked:border-purple-600 has-checked:bg-purple-500 has-checked:text-white"
                                    >
                                        <input
                            value={transport.id}
                            checked={selectedTransport === transport.id}
                            onChange={(e) => setSelectedTransport(e.target.value)}
                                        name="transport"
                                        type="radio"
                            className="absolute inset-0 appearance-none focus:outline-none"
                                        />
                          <span className="text-sm font-medium group-has-checked:text-white">
                            {transport.mode} - {transport.ville_depart} → {transport.ville_arrivee} ({transport.prix_aller_retour}€)
                          </span>
                                    </label>
                                    ))}
                                </div>
                            </fieldset>
                        </div>
              )}

                        {/* Hébergement */}
              {hebergements.length > 0 && (
                        <div className="mt-10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-900">Choix de l'hébergement</h3>
                            </div>

                            <fieldset aria-label="Choisissez un type d'hébergement" className="mt-4">
                    <div className="grid grid-cols-1 gap-3">
                      {hebergements.map((hebergement) => (
                                    <label
                          key={hebergement.id}
                          className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-900 p-3 has-checked:border-purple-600 has-checked:bg-purple-500 has-checked:text-white"
                                    >
                                        <input
                            value={hebergement.id}
                            checked={selectedHebergement === hebergement.id}
                            onChange={(e) => setSelectedHebergement(e.target.value)}
                            name="hebergement"
                                        type="radio"
                            className="absolute inset-0 appearance-none focus:outline-none"
                                        />
                          <span className="text-sm font-medium group-has-checked:text-white">
                            {hebergement.name} - {hebergement.prix_nuit}€/nuit
                          </span>
                                    </label>
                                    ))}
                                </div>
                            </fieldset>
                        </div>
              )}

                        {/* Nb de voyageurs */}
                        <div className="mt-10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-900">Nombre de voyageurs</h3>
                            </div>

                            <fieldset aria-label="Choisissez un nombre de voyageur" className="mt-4">
                                <div className="grid grid-cols-4 gap-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((nb) => (
                                    <label
                        key={nb}
                        className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-900 p-3 has-checked:border-purple-600 has-checked:bg-purple-500 has-checked:text-white"
                                    >
                                        <input
                          value={nb.toString()}
                          checked={nbVoyageurs === nb.toString()}
                          onChange={(e) => setNbVoyageurs(e.target.value)}
                                        name="nb_voyageurs"
                                        type="radio"
                          className="absolute inset-0 appearance-none focus:outline-none"
                                        />
                        <span className="text-sm font-medium uppercase group-has-checked:text-white">{nb}</span>
                                    </label>
                                    ))}
                                </div>
                            </fieldset>
                        </div>

              {/* Durée du séjour */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Durée du séjour (en jours)</h3>
                </div>

                <div className="mt-4">
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={dureeSejour}
                    onChange={(e) => setDureeSejour(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Nombre de jours"
                  />
                </div>
              </div>

                                      <button
                type="button"
                onClick={() => {
                  // Vérifier si l'utilisateur est connecté
                  const token = localStorage.getItem('authToken');
                  if (token) {
                    initializeDevisForm();
                    setShowDevisModal(true);
                  } else {
                    // Rediriger vers le login avec les données du devis
                    const devisData = {
                      festivalName: festival?.name,
                      festivalId: festival?.id,
                      selectedDays,
                      selectedHebergement,
                      selectedTransport,
                      dureeSejour,
                      nbVoyageurs,
                      totalPrice: calculateTotalPrice()
                    };
                    localStorage.setItem('pendingDevis', JSON.stringify(devisData));
                    router.push('/login');
                  }
                }}
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-purple-500 px-8 py-3 text-base font-semibold text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-hidden"
              >
                Demander un devis
              </button>
                    </form>
                </div>

                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pt-6 lg:pr-2 lg:pb-16">
            {/* Description et détails */}
                    <div>
                    <h3 className="sr-only">Description</h3>
                    <div className="space-y-6">
                <p className="text-base text-gray-900">
                  Découvrez {festival.name}, un festival exceptionnel qui vous promet une expérience inoubliable.
                </p>
                    </div>
                    </div>

            {/* Suggestions d'activités */}
                    <div className="mt-10">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Demander des suggestions d'activités à l'IA
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={activityPrompt}
                  onChange={e => setActivityPrompt(e.target.value)}
                  placeholder="Ex : Que faire autour du festival ?"
                  className="flex-1 border border-gray-300 rounded px-3 py-2"
                />
                <button
                  type="button"
                  onClick={handleSuggestActivities}
                  disabled={activityLoading || !activityPrompt}
                  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                >
                  Suggérer
                </button>
              </div>
              {activityLoading && <div className="text-sm text-gray-500 mt-2">Recherche en cours...</div>}
              {activitySuggestions && (
                <div className="mt-3 p-3 bg-gray-50 rounded text-sm text-gray-800">
                  {activitySuggestions}
                    </div>
              )}
                    </div>

            {/* Prix détaillés */}
                    <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Détail des prix</h3>
              <div className="mt-4 space-y-2">
                {selectedDays && (
                  <div className="flex justify-between">
                    <span>Pass festival ({selectedDays} jour{selectedDays !== '1' ? 's' : ''} × {nbVoyageurs} pers.)</span>
                    <span>
                      {selectedDays === '1' && festival.price_1_day ? festival.price_1_day * parseInt(nbVoyageurs) : 
                       selectedDays === '2' && festival.price_2_days ? festival.price_2_days * parseInt(nbVoyageurs) :
                       selectedDays === '3' && festival.price_3_days ? festival.price_3_days * parseInt(nbVoyageurs) : 0}€
                    </span>
                  </div>
                )}
                {selectedHebergement && hebergements.find(h => h.id === selectedHebergement) && (
                  <div className="flex justify-between">
                    <span>Hébergement ({dureeSejour} nuit{dureeSejour !== '1' ? 's' : ''} × {nbVoyageurs} pers.)</span>
                    <span>
                      {(hebergements.find(h => h.id === selectedHebergement)?.prix_nuit || 0) * parseInt(dureeSejour) * parseInt(nbVoyageurs)}€
                    </span>
                  </div>
                )}
                {selectedTransport && transports.find(t => t.id === selectedTransport) && (
                  <div className="flex justify-between">
                    <span>Transport A/R ({nbVoyageurs} pers.)</span>
                    <span>
                      {(transports.find(t => t.id === selectedTransport)?.prix_aller_retour || 0) * parseInt(nbVoyageurs)}€
                    </span>
                  </div>
                )}
                <div className="border-t pt-2 mt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{totalPrice}€</span>
                    </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {showDevisModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            {devisSuccess ? (
              <div className="text-center">
                <div className="text-green-500 text-6xl mb-4">✅</div>
                <h3 className="text-lg font-semibold mb-2 text-green-800">
                  Devis créé avec succès !
                </h3>
                <p className="text-gray-600 mb-4">
                  Votre demande de devis a été enregistrée. Vous allez être redirigé vers votre espace personnel.
                </p>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-4">Demander un devis</h3>
                <div className="mb-4 p-3 bg-blue-50 rounded">
                  <p className="text-sm text-blue-800">
                    <strong>Bonjour {localStorage.getItem('userName') || localStorage.getItem('userEmail')} !</strong><br />
                    Votre devis sera créé avec vos informations de compte.
                  </p>
                </div>
                <form onSubmit={handleSubmitDevis}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      value={nomComplet}
                      onChange={(e) => setNomComplet(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder={localStorage.getItem('userName') || ''}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder={localStorage.getItem('userEmail') || ''}
                    />
                  </div>
                  <div className="mb-4 p-3 bg-gray-50 rounded">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Récapitulatif de votre demande :</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>• Festival : {festival?.name}</p>
                      <p>• Pass : {selectedDays} jour{selectedDays !== '1' ? 's' : ''}</p>
                      <p>• Voyageurs : {nbVoyageurs} personne{nbVoyageurs !== '1' ? 's' : ''}</p>
                      <p>• Durée séjour : {dureeSejour} jour{dureeSejour !== '1' ? 's' : ''}</p>
                      <p>• Total estimé : {calculateTotalPrice()}€</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowDevisModal(false)}
                      className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      disabled={devisLoading}
                      className="flex-1 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
                    >
                      {devisLoading ? 'Création du devis...' : 'Créer le devis'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
