import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';

const Dashboard = ({ user }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [activeChat, setActiveChat] = useState({ id: Date.now(), title: 'Nuevo Chat', messages: [] });

  // Ejemplo: cargar historial desde localStorage si lo deseas
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem(`chatHistory_${user.uid}`)) || [];
    setChatHistory(storedHistory);
  }, [user]);

  // Función para guardar el chat actual en el historial (opcional)
  const saveCurrentChat = () => {
    if (activeChat && activeChat.messages.length > 0) {
      const updatedHistory = [activeChat, ...chatHistory];
      setChatHistory(updatedHistory);
      localStorage.setItem(`chatHistory_${user.uid}`, JSON.stringify(updatedHistory));
    }
  };

  // Función para iniciar un nuevo chat
  const handleNewChat = () => {
    saveCurrentChat();
    setActiveChat({ id: Date.now(), title: 'Nuevo Chat', messages: [] });
  };

  return (
    <div className="dashboard">
      <Sidebar chatHistory={chatHistory} onSelectChat={setActiveChat} onNewChat={handleNewChat} />
      <Chat activeChat={activeChat} setActiveChat={setActiveChat} />
    </div>
  );
};

export default Dashboard;
