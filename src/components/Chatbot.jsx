'use client';

import { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([{ sender: 'bot', text: "Hi! I'm your thrift assistant. Ask me anything!" }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();
    const botMessage = { sender: 'bot', text: data.reply };
    setMessages((prev) => [...prev, botMessage]);
    setInput('');
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white border rounded-xl shadow-lg z-50">
      <div className="p-4 border-b font-bold bg-peach-pink text-deep-plum">Thrift Chat</div>
      <div className="max-h-64 overflow-y-auto p-3 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`text-sm p-2 rounded-lg ${msg.sender === 'user' ? 'bg-hot-pink text-white self-end ml-auto' : 'bg-gray-100 text-gray-800'}`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="text-xs text-gray-400">Typing...</div>}
      </div>
      <div className="flex border-t p-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 text-sm p-2 border rounded-md"
          placeholder="Ask me about dresses..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-3 py-2 text-sm bg-hot-pink text-white rounded-md hover:bg-peach-pink"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
