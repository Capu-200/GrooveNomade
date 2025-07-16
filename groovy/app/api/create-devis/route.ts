import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY
}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || '');

export async function POST(req: NextRequest) {
  const {
    nomComplet,
    email,
    festivalName,
    festivalId,
    hebergementId,
    transportId,
    selectedDays,
    totalFestivalPrix,
    totalHebergementPrix,
    totalTransportPrix,
    activiteIA,
    nbVoyageurs,
  } = await req.json();

  try {
    console.log('🔍 Recherche des IDs Airtable...');
    console.log('Festival ID reçu:', festivalId);
    console.log('Hébergement ID reçu:', hebergementId);
    console.log('Transport ID reçu:', transportId);
    
    // Récupérer l'ID interne du festival si fourni
    let festivalAirtableId = null;
    if (festivalId) {
      const festivalRecords = await base('Festivals').select({
        filterByFormula: `{FestivalID} = '${festivalId}'`
      }).all();
      if (festivalRecords.length > 0) {
        festivalAirtableId = festivalRecords[0].id;
        console.log('✅ Festival Airtable ID trouvé:', festivalAirtableId);
      } else {
        console.log('❌ Festival non trouvé avec ID:', festivalId);
      }
    }
    
    // Récupérer l'ID interne de l'hébergement si fourni
    let hebergementAirtableId = null;
    if (hebergementId) {
      const hebergementRecords = await base('Hebergements').select({
        filterByFormula: `{HebergementID} = '${hebergementId}'`
      }).all();
      if (hebergementRecords.length > 0) {
        hebergementAirtableId = hebergementRecords[0].id;
      }
    }

    // Récupérer l'ID interne du transport si fourni
    let transportAirtableId = null;
    if (transportId) {
      const transportRecords = await base('Transports').select({
        filterByFormula: `{TransportID} = '${transportId}'`
      }).all();
      if (transportRecords.length > 0) {
        transportAirtableId = transportRecords[0].id;
      }
    }

    const fields: any = {
      'Nom complet': nomComplet,
      'Email': email,
      'Nom Festival': festivalName, // Texte, pas un lien
      'Duree sejour': parseInt(selectedDays),
      'Total Festival Prix': totalFestivalPrix,
      'Total Hebergement Prix': totalHebergementPrix,
      'Total Transport Prix': totalTransportPrix,
      'Activites IA': activiteIA || '',
      'Nombre de personnes': parseInt(nbVoyageurs),
      'Status': 'Nouveau' // Sélection unique
    };

    // Ajouter les liens seulement s'ils existent
    if (festivalAirtableId) {
      fields['Festival'] = [festivalAirtableId];
    }
    
    if (hebergementAirtableId) {
      fields['Hebergements'] = [hebergementAirtableId];
    }
    
    if (transportAirtableId) {
      fields['Transport'] = [transportAirtableId];
    }

    await base('Demandes').create([
      {
        fields
      }
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur création devis:', error);
    return NextResponse.json({ error: 'Erreur lors de la création du devis' }, { status: 500 });
  }
} 