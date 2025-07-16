import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { prompt, festival, ville, pays } = await req.json();

  const systemPrompt = `Propose une liste d'activité locale originale et fun à faire autour du festival (5 maximums). Ces activités doivent plaire à des jeunes adultes curieux et fêtards. Sois clair et concis dans tes réponses
                        Il faut que tu ecrives en français et que le style ne soit pas en markdown.`;
  const userPrompt = `Festival : ${festival} à ${ville}, ${pays}. Demande : ${prompt}`;

  const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 300,
      temperature: 0.8,
    }),
  });

  if (!openaiRes.ok) {
    return NextResponse.json({ suggestions: "Erreur OpenAI" }, { status: 500 });
  }

  const data = await openaiRes.json();
  const suggestions = data.choices?.[0]?.message?.content || "Aucune suggestion trouvée.";

  return NextResponse.json({ suggestions });
} 