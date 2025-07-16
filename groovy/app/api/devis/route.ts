import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY
}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || '');

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { message: 'Email requis' },
        { status: 400 }
      );
    }

    // Récupérer les devis de l'utilisateur
    const records = await base('Demandes').select({
      filterByFormula: `{Email} = '${email}'`,
      sort: [{ field: 'Last Modified Time', direction: 'desc' }]
    }).all();

    const devis = records.map(record => {
      // Le champ peut être une URL string ou un array d'attachments
      const devisWord = record.get('Devis Url');
      let devisWordUrl = '';
      if (Array.isArray(devisWord) && devisWord.length > 0 && devisWord[0].url) {
        devisWordUrl = devisWord[0].url;
      } else if (typeof devisWord === 'string') {
        devisWordUrl = devisWord;
      }
      return {
        id: record.id,
        nomComplet: record.get('Nom complet') as string || '',
        email: record.get('Email') as string || '',
        nomFestival: record.get('Nom Festival') as string || '',
        dureeSejour: record.get('Duree sejour') as number || 0,
        totalFestivalPrix: record.get('Total Festival Prix') as number || 0,
        totalHebergementPrix: record.get('Total Hebergement Prix') as number || 0,
        totalTransportPrix: record.get('Total Transport Prix') as number || 0,
        activitesIA: record.get('Activites IA') as string || '',
        nbVoyageurs: record.get('Nombre de personnes') as number || 0,
        status: record.get('Status') as string || 'Nouveau',
        createdAt: record.get('Last Modified Time') as string || new Date().toISOString(),
        devisWordUrl,
      };
    });

    return NextResponse.json({ devis });

  } catch (error) {
    console.error('Erreur lors de la récupération des devis:', error);
    return NextResponse.json(
      { message: 'Erreur lors de la récupération des devis' },
      { status: 500 }
    );
  }
} 