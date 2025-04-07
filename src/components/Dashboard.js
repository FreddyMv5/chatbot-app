import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Dashboard = ({ user, setUser }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [activeChat, setActiveChat] = useState({
    id: Date.now(),
    title: "Nuevo Chat",
    messages: [],
  });

  // Cargar historial desde localStorage al montar el componente
  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem(`chatHistory_${user.uid}`)) || [];
    setChatHistory(storedHistory);
  }, [user]);

  // Cada vez que activeChat cambia y tiene mensajes, se actualiza el historial
  useEffect(() => {
    if (activeChat && activeChat.messages.length > 0) {
      const filteredHistory = chatHistory.filter(
        (chat) => chat.id !== activeChat.id
      );
      const updatedHistory = [activeChat, ...filteredHistory];
      setChatHistory(updatedHistory);
      localStorage.setItem(
        `chatHistory_${user.uid}`,
        JSON.stringify(updatedHistory)
      );
    }
  }, [activeChat, user.uid, chatHistory]);

  // Función para iniciar un nuevo chat solicitando un nombre personalizado
  const handleNewChat = () => {
    let title = prompt("Dale un nombre a este chat:");
    if (title === null) return; // Si cancela, no hacemos nada
    title = title.trim();
    if (!title) title = "Nuevo Chat";
    setActiveChat({ id: Date.now(), title, messages: [] });
  };

  // Función para eliminar un chat del historial
  const handleDeleteChat = (chatId) => {
    const updatedHistory = chatHistory.filter((chat) => chat.id !== chatId);
    setChatHistory(updatedHistory);
    localStorage.setItem(
      `chatHistory_${user.uid}`,
      JSON.stringify(updatedHistory)
    );
    if (activeChat && activeChat.id === chatId) {
      setActiveChat({ id: Date.now(), title: "Nuevo Chat", messages: [] });
    }
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null); // Regresa al login
      })
      .catch((error) => {
        console.error("Error durante el logout:", error);
      });
  };

  return (
    <div className="dashboard">
      <Sidebar
        chatHistory={chatHistory}
        activeChat={activeChat}
        onSelectChat={setActiveChat}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
        onLogout={handleLogout}
      />
      <Chat activeChat={activeChat} setActiveChat={setActiveChat} />
    </div>
  );
};

export default Dashboard;
