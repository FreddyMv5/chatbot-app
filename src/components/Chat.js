import React, { useState } from "react";
import axios from "axios";
import "../styles/Chat.css";



const API_KEY = "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"; // API de OpenAI
const API_URL = "https://api.openai.com/v1/chat/completions";

const Chat = ({ activeChat, setActiveChat }) => {
  const [input, setInput] = useState("");

  // Función para enviar mensaje al modelo de OpenAI y actualizar el chat activo
  const sendMessage = async () => {
    if (input.trim() === "") return;

    // Añadir mensaje del usuario al chat activo
    const userMessage = { text: input, sender: "user" };
    const updatedChat = {
      ...activeChat,
      messages: [...activeChat.messages, userMessage]
    };
    setActiveChat(updatedChat);
    setInput("");

    try {
      const response = await axios.post(
        API_URL,
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: input }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      const botMessage = {
        text: response.data.choices[0].message.content,
        sender: "bot",
      };

      // Actualizar el chat activo con la respuesta del bot
      setActiveChat(prevChat => ({
        ...prevChat,
        messages: [...prevChat.messages, botMessage]
      }));
    } catch (error) {
      console.error("Error al llamar a la API:", error);
      setActiveChat(prevChat => ({
        ...prevChat,
        messages: [
          ...prevChat.messages,
          { text: "Error en la respuesta del chatbot.", sender: "bot" }
        ]
      }));
    }
  };

  return (
    <div className="chat">
      <div className="chat-box">
        {activeChat &&
          activeChat.messages.map((msg, index) => (
            <div
              key={index}
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
