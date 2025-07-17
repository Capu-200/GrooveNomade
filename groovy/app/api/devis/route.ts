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

    // 1. D'abord récupérer l'utilisateur par email dans la table Utilisateurs
    const userRecords = await base('Utilisateurs').select({
      filterByFormula: `{Email} = '${email}'`
    }).all();

    if (userRecords.length === 0) {
      return NextResponse.json(
        { message: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    const userRecord = userRecords[0];
    const userId = userRecord.get('Nom complet') as string || ''; // ID de l'utilisateur dans Airtable

    // 2. Ensuite récupérer les devis de cet utilisateur dans la table Demandes
    // En utilisant l'ID de l'utilisateur pour la relation
    const devisRecords = await base('Demandes').select({
      filterByFormula: `{Utilisateur} = '${userId}'`,
      sort: [{ field: 'Last Modified Time', direction: 'desc' }]
    }).all();

    const devis = devisRecords.map(record => {
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
        totalPrix: record.get('Prix total') as number || 0,
        activitesIA: record.get('Activites IA') as string || '',
        nbVoyageurs: record.get('Nombre de personnes') as number || 0,
        status: record.get('Status') as string || 'Nouveau',
        createdAt: record.get('Last Modified Time') as string || new Date().toISOString(),
        devisWordUrl,
      };
    });

    console.log(`✅ Récupération de ${devis.length} devis pour l'utilisateur ${email}`);

    return NextResponse.json({ devis });

  } catch (error) {
    console.error('Erreur lors de la récupération des devis:', error);
    return NextResponse.json(
      { message: 'Erreur lors de la récupération des devis' },
      { status: 500 }
    );
  }
} 