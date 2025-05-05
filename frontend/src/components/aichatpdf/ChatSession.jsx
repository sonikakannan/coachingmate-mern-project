import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const ChatSection = ({ pdfId }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    if (!pdfId) {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: 'Please upload a PDF first.' },
      ]);
      return;
    }

    const userMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post('http://localhost:5001/api/ask-question', {
        pdfId,
        question: input,
      });

      const aiMessage = {
        role: 'ai',
        text: response.data.answer,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to get answer:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: 'Something went wrong. Please try again.' },
      ]);
    }

    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="w-1/2 border border-gray-300 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-gray-500">Chat messages will appear here...</div>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-md max-w-[80%] whitespace-pre-wrap ${
              msg.role === 'user'
                ? 'bg-indigo-100 self-end text-right'
                : 'bg-gray-200 self-start text-left'
            }`}
          >
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}
      </div>
      <div className="p-4 flex gap-3 items-center border-t border-gray-300">
        <input
          type="text"
          placeholder="Type your question..."
          className="w-full px-4 py-3 rounded-md border border-gray-300"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div
          className="bg-indigo-700 text-white rounded-full p-3 flex items-center justify-center cursor-pointer"
          onClick={handleSend}
        >
          <IoSend className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
