import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY
}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || '');

export async function PUT(req: NextRequest) {
  try {
    const { devisId, status, motif, commentaires } = await req.json();

    if (!devisId || !status) {
      return NextResponse.json(
        { message: 'ID du devis et statut requis' },
        { status: 400 }
      );
    }

    // Préparer les champs à mettre à jour
    const fieldsToUpdate: any = {
      'Status': status
    };

    // Si c'est un refus, ajouter le motif et les commentaires
    if (status === 'Refusé') {
      if (motif) {
        fieldsToUpdate['Motif'] = motif;
      }
      if (commentaires) {
        fieldsToUpdate['Commentaires'] = commentaires;
      }
    }

    // Mettre à jour le devis dans Airtable
    await base('Demandes').update([
      {
        id: devisId,
        fields: fieldsToUpdate
      }
    ]);

    console.log(`✅ Statut du devis ${devisId} mis à jour vers: ${status}`);
    if (status === 'Refusé') {
      console.log(`📝 Motif: ${motif}, Commentaires: ${commentaires}`);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Statut mis à jour avec succès' 
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut:', error);
    return NextResponse.json(
      { message: 'Erreur lors de la mise à jour du statut' },
      { status: 500 }
    );
  }
} 