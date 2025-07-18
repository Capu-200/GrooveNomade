import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY
}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || '');

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Récupérer toutes les données nécessaires
    const [festivals, hebergements, transports] = await Promise.all([
      base('Festivals').select({ view: 'Grid view' }).all(),
      base('Hebergements').select({ view: 'Grid view' }).all(),
      base('Transports').select({ view: 'Grid view' }).all()
    ]);

    // Préparer les données pour l'IA
    const festivalsData = festivals.map(record => ({
      id: record.get('FestivalID') as string,
      name: record.get('Nom') as string,
      city: record.get('Ville') as string,
      country: record.get('Pays') as string,
      date_debut: record.get('Date_debut') as string,
      date_fin: record.get('Date_fin') as string,
      genre: record.get('Genre') as string,
      price_1_day: record.get('Prix_1_jour') as number,
      price_2_days: record.get('Prix_2_jours') as number,
      price_3_days: record.get('Prix_3_jours') as number,
      nb_jours: record.get('Nb_jours') as number,
      imageUrl: record.get('Image') as string
    }));

    const hebergementsData = hebergements.map(record => ({
      id: record.get('HebergementID') as string,
      name: record.get('Nom') as string,
      prix_nuit: record.get('Prix par nuit') as number,
      type: record.get('Type') as string,
      festival: record.get('Festival') as string
    }));

    const transportsData = transports.map(record => ({
      id: record.get('TransportID') as string,
      ville_depart: record.get('Ville_depart') as string,
      ville_arrivee: record.get('Ville_arrivee') as string,
      prix_aller_retour: record.get('Prix_A/R') as number,
      duree_estimee: record.get('Duree_estimee') as number,
      mode: record.get('Mode') as string,
      compagnie: record.get('Compagnie') as string,
      festival: record.get('Festival') as string
    }));

    const systemPrompt = `Tu es un assistant voyage spécialisé dans les festivals de musique pour l'agence GrooveNomad. Tu as accès aux données suivantes :

FESTIVALS DISPONIBLES :
${festivalsData.map(f => `${f.name} à ${f.city}
  📍 ${f.city}, ${f.country}
  📅 ${f.date_debut}${f.date_fin ? ` - ${f.date_fin}` : ''}
  🎵 ${f.genre || 'Non spécifié'}
  💰 ${f.price_1_day ? `${f.price_1_day}€ (1j)` : ''}${f.price_2_days ? `, ${f.price_2_days}€ (2j)` : ''}${f.price_3_days ? `, ${f.price_3_days}€ (3j)` : ''}
  🔗 http://localhost:3000/festival/${f.id}`).join('\n')}

HÉBERGEMENTS :
${hebergementsData.map(h => `- ${h.name} (Festival: ${h.festival})
  💰 ${h.prix_nuit}€/nuit
  🏠 Type: ${h.type}`).join('\n')}

TRANSPORTS :
${transportsData.map(t => `- ${t.mode} ${t.ville_depart} → ${t.ville_arrivee} (Festival: ${t.festival})
  💰 ${t.prix_aller_retour}€ A/R
  ⏱️ ${t.duree_estimee}h
  🚗 ${t.compagnie}`).join('\n')}

INSTRUCTIONS :
1. Réponds toujours de manière naturelle et amicale, même pour un simple "Bonjour". N'hésite pas à tutoyer l'utilisateur.
2. **IMPORTANT** : Base tes réponses uniquement sur les festivals listés ci-dessus. Ne propose que des festivals qui sont dans cette liste.
3. Si l'utilisateur mentionne un pays (comme "Espagne"), propose les festivals de ce pays
4. Si l'utilisateur mentionne un style de musique (comme "Pop"), propose les festivals de ce style
5. Analyse les préférences de l'utilisateur dans son message
6. Propose 1-3 festivals qui correspondent le mieux
7. Pour chaque festival, suggère des hébergements et transports associés 
8. Pour chaque ville ou lieu, suggère également 1-3 activités à faire autour du festival. Si les festivals sont dans des villes similaires, n'en propose pas plusieurs (jusqu'à 3).
9. Sois naturel, amical et enthousiaste
10. À la fin, recommande le festival principal et invite à visiter sa page
11. Réponds en français de manière conversationnelle, sans utiliser de markdown
12. Si aucune donnée ne correspond, propose des alternatives autour de sa demande ou demande plus de précisions
13. N'affiche pas les IDs des festivals, seulement les noms
14. Pour les liens, utilise les URLs fournies pour créer des liens cliquables
15. N'utilise jamais de crochets [] ni de parenthèses () pour les liens, affiche simplement le texte du lien sans formatage`;


    const result = streamText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      messages,
    });

    return result.toDataStreamResponse();

  } catch (error) {
    console.error('Erreur chatbot:', error);
    return new Response(
      JSON.stringify({ error: "Désolé, je rencontre des difficultés techniques. Pouvez-vous reformuler votre demande ?" }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
} 