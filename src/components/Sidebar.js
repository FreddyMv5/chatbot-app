import React from 'react';

const Sidebar = ({ chatHistory, activeChat, onSelectChat, onNewChat, onDeleteChat, onLogout }) => {
  return (
    <div className="sidebar">
      <h3>Historial de Chats</h3>
      <button className="new-chat-btn" onClick={onNewChat}>
        + Nuevo Chat
      </button>
      <ul className="chat-list">
        {chatHistory.map((chat) => (
          <li 
            key={chat.id} 
            className={`chat-item ${activeChat && activeChat.id === chat.id ? 'active' : ''}`}
          >
            <span onClick={() => onSelectChat(chat)}>{chat.title}</span>
            <button 
              className="delete-chat-btn" 
              onClick={() => onDeleteChat(chat.id)}
              title="Eliminar chat"
            >
              &#x2715;
            </button>
          </li>
        ))}
      </ul>
      <div className="sidebar-footer">
        <button className="logout-button" onClick={onLogout}>Salir</button>
      </div>
    </div>
  );
};

export default Sidebar;
