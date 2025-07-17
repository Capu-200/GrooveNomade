import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY
}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || '');

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Validation des champs
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    // Recherche de l'utilisateur dans Airtable
    const records = await base('Utilisateurs').select({
      filterByFormula: `{Email} = '${email}'`
    }).all();

    if (records.length === 0) {
      return NextResponse.json(
        { message: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    const userRecord = records[0];
    const storedPassword = userRecord.get('Mot de passe') as string;
    const userName = userRecord.get('Nom complet') as string;

    // Vérification du mot de passe
    if (storedPassword !== password) {
      return NextResponse.json(
        { message: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Génération d'un token simple (en production, utilisez JWT)
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');

    console.log('✅ Connexion réussie pour:', email);

    return NextResponse.json({
      success: true,
      token,
      user: {
        email: email,
        name: userName
      }
    });

  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return NextResponse.json(
      { message: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
} 