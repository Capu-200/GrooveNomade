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
  price_1_day?: string;
  price_2_days?: string;
  price_3_days?: string;
  nb_jours?: number;
  genre?: string;    
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
      price_1_day: record.get('Price_1_day') as string || '',
      price_2_days: record.get('Price_2_days') as string || '',
      price_3_days: record.get('Price_3_days') as string || '',
      nb_jours: record.get('Nb_jours') as number || 0,
      genre: record.get('Genre') as string || ''
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des festivals:', error);
    return [];
  }
}

export async function getFestivalById(id: string): Promise<Festival | null> {
  try {
    const record = await base('Festivals').find(id);
    
    return {
      id: record.get('FestivalID') as string || '',
      name: record.get('Nom') as string || '',
      city: record.get('Ville') as string || '',
      country: record.get('Pays') as string || '',
      date_debut: record.get('Date_debut') as string || '',
      date_fin: record.get('Date_fin') as string || '',
      nb_jours : record.get('Nb_jours') as number || 0,
      imageUrl: record.get('Image') as string || '',
      price_1_day: record.get('Price_1_day') as string || '',
      price_2_days: record.get('Price_2_days') as string || '',
      price_3_days: record.get('Price_3_days') as string || '',
      genre: record.get('Genre') as string || ''
    };
  } catch (error) {
    console.error('Erreur lors de la récupération du festival:', error);
    return null;
  }
} 