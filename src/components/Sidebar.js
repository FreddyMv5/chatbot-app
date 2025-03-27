import React from 'react';

const Sidebar = ({ chatHistory, onSelectChat, onNewChat }) => {
  return (
    <div className="sidebar">
      <h3>Historial de Chats</h3>
      <button className="new-chat-btn" onClick={onNewChat}>
        + Nuevo Chat
      </button>
      <ul className="chat-list">
        {chatHistory.map((chat) => (
          <li key={chat.id} onClick={() => onSelectChat(chat)} className="chat-item">
            {chat.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
