import React, { useState } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';
import './index.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {user ? (
        // Si hay usuario, mostramos el chat (u otra vista)
        <Chat user={user} />
      ) : (
        // Si no hay usuario, mostramos la pantalla de login
        <Login setUser={setUser} />
      )}
    </div>
  );
}

export default App;
