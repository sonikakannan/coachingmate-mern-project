import React, { useState, useRef, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { ImSpinner2 } from "react-icons/im";
import { Link } from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";

const ChatSection = ({ pdfId }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    if (!pdfId) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "📄 Please upload a PDF first." },
      ]);
      return;
    }

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/ask-question",
        {
          pdfId,
          question: input,
        }
      );

      const aiMessage = {
        role: "ai",
        text: response.data.answer || "🤖 No response received.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Failed to get answer:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "❌ Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full md:w-1/2 h-full border border-gray-300 rounded-xl flex flex-col shadow-lg bg-indigo-50">
      <Link to={`/ai-chatpdf`}>
        <FaCircleArrowLeft className="text-indigo-500 m-2 text-2xl cursor-pointer" />
      </Link>
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-gray-400 italic text-center">
            💬 Chat messages will appear here...
          </div>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-4 rounded-xl max-w-[75%] leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-indigo-100 text-left"
                  : "bg-indigo-100 text-left"
              }`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-gray-500">
            <ImSpinner2 className="animate-spin text-lg" />
            <span>AI is thinking...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input box */}
      <div className="p-4 border-t border-gray-200 flex gap-3 items-center bg-gray-50">
        <input
          type="text"
          placeholder="Ask something about this PDF..."
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button
          className={`p-3 rounded-full text-white transition ${
            loading
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
          onClick={handleSend}
          disabled={loading}
        >
          <IoSend className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default ChatSection;
