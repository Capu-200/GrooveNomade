import { NextRequest, NextResponse } from 'next/server';

// Utilisateurs de test (en production, utilisez une base de données)
const USERS = [
  { email: 'test@example.com', password: 'password123', name: 'Utilisateur Test' },
  { email: 'admin@groovenomad.com', password: 'admin123', name: 'Admin' }
];

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

    // Recherche de l'utilisateur
    const user = USERS.find(u => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json(
        { message: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Génération d'un token simple (en production, utilisez JWT)
    const token = Buffer.from(`${user.email}:${Date.now()}`).toString('base64');

    return NextResponse.json({
      success: true,
      token,
      user: {
        email: user.email,
        name: user.name
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