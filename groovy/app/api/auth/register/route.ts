import { NextRequest, NextResponse } from 'next/server';

// Utilisateurs de test (en production, utilisez une base de données)
let USERS = [
  { email: 'test@example.com', password: 'password123', name: 'Utilisateur Test' },
  { email: 'admin@groovenomad.com', password: 'admin123', name: 'Admin' }
];

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

    // Vérifier si l'email existe déjà
    const existingUser = USERS.find(u => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { message: 'Un compte avec cet email existe déjà' },
        { status: 409 }
      );
    }

    // Créer le nouvel utilisateur
    const newUser = {
      email,
      password,
      name: nomComplet
    };

    // Ajouter à la liste des utilisateurs
    USERS.push(newUser);

    // Génération d'un token simple (en production, utilisez JWT)
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');

    console.log('✅ Nouvel utilisateur créé:', email);

    return NextResponse.json({
      success: true,
      token,
      user: {
        email: newUser.email,
        name: newUser.name
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