import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message } = await req.json();

    const faq = {
      hi: "Hello! 👋 How can I help you today?",
      "what is your name. who are you. what is thriftbot": "I'm ThriftBot, your shopping assistant 🤖",
      bye: "Goodbye! Have a great day 🌸",
      "what is thriftup": "ThriftUp is a thrifting platform where you can buy and sell products.",
      "features of thriftup": "Community discussion (start, like, and comment on posts) + Listing items 🛍️",
    };

    const lowerMsg = message.toLowerCase();

    let customReply = null;
    for (const key in faq) {
      if (lowerMsg.includes(key)) {
        customReply = faq[key];
        break;
      }
    }

    if (customReply) {
      return NextResponse.json({ reply: customReply });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      return new Response(JSON.stringify({ reply: "Missing Gemini API key." }), { status: 500 });
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: `Keep it short (max 3 sentences). ${message}` }] },
          ],
          generationConfig: {
            maxOutputTokens: 80, // 🔥 keeps replies short
          },
        }),
      }
    );

    const data = await res.json();

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn’t generate a response.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ reply: "Error processing your request." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
