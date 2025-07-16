import Airtable from 'airtable';

// Configuration Airtable
const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY
}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || '');

export interface Festival {
  id: string;
  name: string;
  city?: string;
  country?: string;
  date_debut?: string;
  date_fin?: string;
  location?: string;
  imageUrl?: string;
  price_1_day?: number;
  price_2_days?: number;
  price_3_days?: number;
  nb_jours?: number;
  genre?: string;    
}
export interface Hebergement {
  id: string;
  name: string;
  prix_nuit?: number;
  type?: string;
}

export interface Transport {
  id: string;
  ville_depart?: string;
  ville_arrivee?: string;
  prix_aller_retour?: number;
  duree_estimee?: number;
  mode?: string;
  compagnie?: string;    
}

export async function getFestivals(): Promise<Festival[]> {
  try {
    console.log('🔍 Tentative de connexion à Airtable...');
    console.log('Base ID:', process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);
    console.log('API Key:', process.env.NEXT_PUBLIC_AIRTABLE_API_KEY ? '✅ Présente' : '❌ Manquante');
    
    const records = await base('Festivals').select({
      view: 'Grid view',
      sort: [{ field: 'Date_debut', direction: 'asc' }]
    }).all();

    console.log('📊 Nombre de festivals récupérés:', records.length);
    
    return records.map(record => ({
      id: record.get('FestivalID') as string || '',
      name: record.get('Nom') as string || '',
      city: record.get('Ville') as string || '',
      country: record.get('Pays') as string || '',
      date_debut: record.get('Date_debut') as string || '',
      date_fin: record.get('Date_fin') as string || '',
      imageUrl: record.get('Image') as string || '',
      price_1_day: record.get('Prix_1_jour') as number || 0,
      price_2_days: record.get('Prix_2_jours') as number || 0,
      price_3_days: record.get('Prix_3_jours') as number || 0,
      nb_jours: record.get('Nb_jours') as number || 0,
      genre: record.get('Genre') as string || ''
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des festivals:', error);
    return [];
  }
}

export async function getFestivalById(festivalId: string): Promise<(Festival & { airtableId: string }) | null> {
  try {
    const records = await base('Festivals').select({
      filterByFormula: `{FestivalID} = '${festivalId}'`
    }).all();

    if (records.length === 0) return null;
    const record = records[0];

    return {
      id: record.get('FestivalID') as string || '',
      airtableId: record.id,
      name: record.get('Nom') as string || '',
      city: record.get('Ville') as string || '',
      country: record.get('Pays') as string || '',
      date_debut: record.get('Date_debut') as string || '',
      date_fin: record.get('Date_fin') as string || '',
      nb_jours : record.get('Nb_jours') as number || 0,
      imageUrl: record.get('Image') as string || '',
      price_1_day: record.get('Prix_1_jour') as number || 0,
      price_2_days: record.get('Prix_2_jours') as number || 0,
      price_3_days: record.get('Prix_3_jours') as number || 0,
      genre: record.get('Genre') as string || ''
    };
  } catch (error) {
    console.error('Erreur lors de la récupération du festival:', error);
    return null;
  }
} 

export async function getHebergementsByFestivalId(festivalId: string) {
  console.log('Recherche hebergements pour festivalId:', festivalId);
  const records = await base('Hebergements').select({
    filterByFormula: `{Festival} = '${festivalId}'`
  }).all();
  return records.map(record => ({
    id: record.get('HebergementID') as string || '',
    name: record.get('Nom') as string || '',
    prix_nuit: record.get('Prix par nuit') as number || 0,
    type: record.get('Type') as string || '',
    // autres champs...
  }));
}

export async function getTransportsByFestivalId(festivalId: string) {
  console.log('Recherche transports pour festivalId:', festivalId);
  const records = await base('Transports').select({
    filterByFormula: `{Festival} = '${festivalId}'`
  }).all();
  return records.map(record => ({
    id: record.get('TransportID') as string || '',
    ville_depart: record.get('Ville_depart') as string || '',
    ville_arrivee: record.get('Ville_arrivee') as string || '',
    prix_aller_retour: record.get('Prix_A/R') as number || 0,
    duree_estimee: record.get('Duree_estimee') as number || 0,
    mode: record.get('Mode') as string || '',
    compagnie: record.get('Compagnie') as string || '',
    // autres champs...
  }));
} 