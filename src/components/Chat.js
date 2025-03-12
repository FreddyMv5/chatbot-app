import React, { useState } from "react";
import axios from "axios";
import "../styles/Chat.css";

const API_KEY =
  "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"; // API de OpenAI
const API_URL = "https://api.openai.com/v1/chat/completions";

// URL de tu backend (ajústala según donde la despliegues)
const BACKEND_URL = "http://localhost:5000";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Función para enviar mensaje al modelo de OpenAI
  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
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
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error al llamar a la API:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error en la respuesta del chatbot.", sender: "bot" },
      ]);
    }
  };

  // Función para guardar el chat actual y reiniciar la conversación
  const startNewChat = async () => {
    if (messages.length === 0) return;

    // Puedes pedir un título al usuario o usar uno por defecto
    const title = prompt("Dale un nombre a este chat") || "Chat sin título";

    try {
      const chatToSave = { title, messages };
      await axios.post(`${BACKEND_URL}/chats`, chatToSave);
      // Una vez guardado, reiniciamos el chat actual
      setMessages([]);
    } catch (error) {
      console.error("Error guardando el chat:", error);
      alert("No se pudo guardar el chat. Inténtalo de nuevo.");
    }
  };

  return (
    <div
      className="chat-container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/images/billar3.jpg"})`,
      }}
    >
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: darkMode ? "#FFD700" : "#333",
          color: darkMode ? "#000" : "#FFF",
          padding: "5px 10px",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
      </button>

      <h2>Billar ChatBot</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender === "user" ? "user-message" : "bot-message"
            }`}
          >
            <strong>{msg.sender === "user" ? "Tú" : "Bot"}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="chat-input"
        />
        <button onClick={sendMessage} className="send-button">
          Enviar
        </button>
      </div>

      {/* Botón para iniciar un nuevo chat */}
      <button onClick={startNewChat} className="new-chat-button">
        Nuevo Chat
      </button>

      <Footer />
    </div>
  );
};

// Componente Footer
const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-links">
        <a
          href="https://instagram.com/tu_instagram"
          target="_blank"
          rel="noopener noreferrer"
        >
          📷 Instagram
        </a>
        <a
          href="https://twitter.com/tu_twitter"
          target="_blank"
          rel="noopener noreferrer"
        >
          🐦 Twitter
        </a>
        <a
          href="https://www.facebook.com/tu_facebook"
          target="_blank"
          rel="noopener noreferrer"
        >
          📘 Facebook
        </a>
      </div>
      <p className="copyright">
        © 2025 Billar-BOT. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Chat;
