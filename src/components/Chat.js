import React, { useState } from "react";
import openai from "../api/openaiClient" // Asegúrate de que la ruta sea correcta
import "../styles/Chat.css";

const Chat = ({ activeChat, setActiveChat }) => {
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setActiveChat({
      ...activeChat,
      messages: [...activeChat.messages, userMessage]
    });
    setInput("");

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: input }],
      });

      const botMessage = {
        text: response.choices[0].message.content,
        sender: "bot",
      };

      setActiveChat(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage]
      }));
    } catch (error) {
      console.error("Error con OpenAI:", error);
      setActiveChat(prev => ({
        ...prev,
        messages: [...prev.messages, { text: "Error en la respuesta del chatbot.", sender: "bot" }]
      }));
    }
  };

  return (
    <div className="chat">
      <div className="chat-box">
        {activeChat &&
          activeChat.messages.map((msg, i) => (
            <div
              key={i}
              className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
            >
              <strong>{msg.sender === "user" ? "Tú" : "Bot"}:</strong> {msg.text}
            </div>
          ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={sendMessage} className="send-button">
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
