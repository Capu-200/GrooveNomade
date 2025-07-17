import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY
}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || '');

export async function POST(req: NextRequest) {
  try {
    const { nomComplet, email, password } = await req.json();

    // Validation des champs
    if (!nomComplet || !email || !password) {
      return NextResponse.json(
        { message: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Validation du mot de passe
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Le mot de passe doit contenir au moins 6 caractères' },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà dans Airtable
    const existingRecords = await base('Utilisateurs').select({
      filterByFormula: `{Email} = '${email}'`
    }).all();

    if (existingRecords.length > 0) {
      return NextResponse.json(
        { message: 'Un compte avec cet email existe déjà' },
        { status: 409 }
      );
    }

    // Créer le nouvel utilisateur dans Airtable
    const newRecord = await base('Utilisateurs').create([
      {
        fields: {
          'Nom complet': nomComplet,
          'Email': email,
          'Mot de passe': password
        }
      }
    ]);

    // Génération d'un token simple (en production, utilisez JWT)
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');

    console.log('✅ Nouvel utilisateur créé:', email);

    return NextResponse.json({
      success: true,
      token,
      user: {
        email: email,
        name: nomComplet
      }
    });

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return NextResponse.json(
      { message: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
} 