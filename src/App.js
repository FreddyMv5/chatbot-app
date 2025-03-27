import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  return (
    <div>
      {user ? <Dashboard user={user} /> : <Login setUser={setUser} />}
    </div>
  );
}

export default App;
