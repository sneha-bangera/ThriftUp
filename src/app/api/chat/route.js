// app/api/chat/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { message } = await req.json();

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
      temperature: 0.7
    })
  });

  const data = await res.json();
  return NextResponse.json({ reply: data.choices?.[0]?.message?.content || "Sorry, I didn't get that." });
}
