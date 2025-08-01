// app/api/chat/route.js
//this is for openAPI key
// import { NextResponse } from 'next/server';

// export async function POST(req) {
//   const { message } = await req.json();

//   const res = await fetch('https://api.openai.com/v1/chat/completions', {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       model: 'gpt-3.5-turbo',
//       messages: [{ role: 'user', content: message }],
//       temperature: 0.7
//     })
//   });

//   const data = await res.json();
//   return NextResponse.json({ reply: data.choices?.[0]?.message?.content || "Sorry, I didn't get that." });
// }


//this is for HuggingFace api key
// export async function POST(req) {
//   const { message } = await req.json();

//   const response = await fetch("https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ inputs: message }),
//   });

//   const data = await response.json();

//   const reply =
//     data.generated_text ||
//     (Array.isArray(data) && data[0]?.generated_text) ||
//     "Sorry, I didn’t get that.";

//   return new Response(JSON.stringify({ reply }), { status: 200 });
// }


// export async function POST(req) {
//   const { message } = await req.json();

//   try {
//     const res = await fetch("https://facebook-blenderbot-3.hf.space/run/predict", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ data: [message] }),
//     });

//     const result = await res.json();
//     const reply = result.data?.[0] || "🤖 I didn't quite understand that.";

//     return new Response(JSON.stringify({ reply }), { status: 200 });
//   } catch (err) {
//     console.error("Chatbot error:", err);
//     return new Response(JSON.stringify({ reply: "Server error." }), { status: 500 });
//   }
// }



export async function POST(req) {
  const { message } = await req.json();

  try {
    const res = await fetch("https://yuntian-deng-chatgpt.hf.space/api/predict/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: [
          message, // your message
          null     // chatbot history (set to null for a stateless session)
        ]
      })
    });

    const result = await res.json();
    const reply = result.data?.[0]?.generated_text || "🤖 Sorry, I didn’t get that.";

    return new Response(JSON.stringify({ reply }), { status: 200 });

  } catch (err) {
    console.error("Chatbot error:", err);
    return new Response(JSON.stringify({ reply: "⚠️ Server error." }), { status: 500 });
  }
}
