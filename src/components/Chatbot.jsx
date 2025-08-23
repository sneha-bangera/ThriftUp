"use client";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

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
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 bg-black text-white p-4 rounded-full shadow-lg z-50 
                     border-2 border-white hover:scale-110 hover:shadow-xl transition-all"
          aria-label="Open Chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-5 right-5 w-80 max-h-[75vh] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-peach-pink">
          {/* Header */}
          <div className="flex justify-between items-center bg-gradient-to-r from-hot-pink to-peach-pink text-white px-4 py-3 rounded-t-2xl">
            <h2 className="text-sm flex font-semibold text-hot-pink">ThriftBot <MessageCircle className="w-5 h-5 ml-2"/></h2>
            <button
              onClick={() => setOpen(false)}
              className="text-hot-pink"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 text-sm space-y-3 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-xl max-w-[75%] shadow-sm text-sm leading-relaxed ${
                    msg.from === "user"
                      ? "bg-hot-pink text-white rounded-br-none"
                      : "bg-white border border-gray-200 rounded-bl-none"
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
          <div className="p-3 border-t flex gap-2 bg-white rounded-b-2xl">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 border border-gray-300 px-3 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-hot-pink"
              placeholder="Type your message…"
            />
            <button
              onClick={sendMessage}
              className="bg-hot-pink hover:bg-peach-pink text-white px-4 py-2 rounded-full text-sm font-medium transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
