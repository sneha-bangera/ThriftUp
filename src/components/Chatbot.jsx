//this is for openAI api key
// 'use client';
// import { useState } from 'react';

// const Chatbot = () => {
//   const [messages, setMessages] = useState([{ sender: 'bot', text: "Hi! I'm your thrift assistant. Ask me anything!" }]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: 'user', text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setLoading(true);

//     const res = await fetch('/api/chat', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ message: input })
//     });

//     const data = await res.json();
//     const botMessage = { sender: 'bot', text: data.reply };
//     setMessages((prev) => [...prev, botMessage]);
//     setInput('');
//     setLoading(false);
//   };

//   return (
//     <div className="fixed bottom-6 right-6 w-80 bg-white border rounded-xl shadow-lg z-50">
//       <div className="p-4 border-b font-bold bg-peach-pink text-deep-plum">Thrift Chat</div>
//       <div className="max-h-64 overflow-y-auto p-3 space-y-2">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`text-sm p-2 rounded-lg ${msg.sender === 'user' ? 'bg-hot-pink text-white self-end ml-auto' : 'bg-gray-100 text-gray-800'}`}
//           >
//             {msg.text}
//           </div>
//         ))}
//         {loading && <div className="text-xs text-gray-400">Typing...</div>}
//       </div>
//       <div className="flex border-t p-2">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="flex-1 text-sm p-2 border rounded-md"
//           placeholder="Ask me about dresses..."
//         />
//         <button
//           onClick={sendMessage}
//           className="ml-2 px-3 py-2 text-sm bg-hot-pink text-white rounded-md hover:bg-peach-pink"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;


//HuggingFace API key
"use client";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react"; // for icons

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi there 👋 Looking for something special today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setMessages([...newMessages, { from: "bot", text: data.reply }]);
    setLoading(false);
  };

  return (
    <>
      {/* Floating Bubble Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 bg-black border-2 cursor-pointer hover:bg-pink-600 text-white p-4 rounded-full shadow-lg z-50"
          aria-label="Open Chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-4 right-4 w-80 max-h-[75vh] bg-white rounded-xl shadow-2xl flex flex-col z-50 border border-pink-300">
          {/* Header */}
          <div className="flex justify-between items-center bg-pink-500 text-white px-4 py-2 rounded-t-xl">
            <h2 className="text-sm font-semibold">ThriftBot 💬</h2>
            <button onClick={() => setOpen(false)}>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-2 text-sm space-y-2 bg-pink-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-1 rounded-lg max-w-[70%] ${
                    msg.from === "user"
                      ? "bg-pink-400 text-white"
                      : "bg-white border"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-xs italic text-gray-400">Typing…</div>
            )}
          </div>

          {/* Input Box */}
          <div className="p-2 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 border border-gray-300 px-2 py-1 rounded text-sm"
              placeholder="Type your message…"
            />
            <button
              onClick={sendMessage}
              className="bg-pink-500 hover:bg-pink-600 text-white px-3 rounded text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
