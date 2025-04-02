import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaUser, FaRobot } from "react-icons/fa";

const API_KEY = "AIzaSyDdinyCgOTLeBoeL1mzMrU8vBE3Ik_wEs8";

const Agribot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef(null);

  const key = import.meta.env.VITE_APP_GEMINI_API;

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          contents: [
            {
              parts: [
                {
                  text: `You are an AI assistant do not mention your model name.  
                First, greet the user and ask them to enter their question in any language. and suggest random crops like wheat, rice, maize, sugarcane, etc. 

                User Question: ${input}`,
                },
              ],
            },
          ],
        },
        { params: { key } }
      );

      const botReply =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I couldn't understand. Please ask something about farming, crops, or soil nutrients.";

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 429) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Too many requests! Please wait a moment before asking again." },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Error fetching response. Try again later." },
        ]);
      }
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="mx-auto p-6 bg-secondary">
      <h2 className="text-2xl font-bold text-center mb-4">🌱 Agribot - Your Farming Assistant</h2>

      {/* Chatbox */}
      <div ref={chatBoxRef} className="h-[65vh] overflow-y-auto border p-3 rounded-md bg-white">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-center mb-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>

            {/* Agribot Icon */}
            {msg.sender === "bot" && (
              <div className="flex items-center mr-2">
                {/* <FaRobot className="text-primary-shade text-xl" /> */}
              </div>
            )}

            {/* Chat Bubble */}
            <div className={`p-3 rounded-lg max-w-xs text-white ${msg.sender === "user" ? "bg-blue-500" : "bg-green-500"}`}>
              <strong>{msg.sender === "user" ? "👨‍🌾 You: " : "🤖 Agribot: "}</strong> {msg.text}
            </div>

            {/* User Icon */}
            {msg.sender === "user" && (
              <div className="ml-2">
                <FaUser className="text-blue-500 text-xl" />
              </div>
            )}

          </div>
        ))}
      </div>

      {/* Input Box */}
      <form className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          handleSend()
        }
        }
      >
        <input
          type="text"
          className="flex-1 border p-2 rounded-l-md bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Ask about crops, soil, or weather..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:cursor-pointer" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Agribot;
