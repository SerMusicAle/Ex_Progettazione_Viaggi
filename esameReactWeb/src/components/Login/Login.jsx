// components/Login.jsx
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    try {
      const response = await fetch('http://localhost:5010/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Errore durante il login');
      }

      const data = await response.json();
      console.log(data.message);
      onLogin({ nome: data.user.nome, cognome: data.user.cognome, email: data.user.email });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Email:</label>
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Password:</label>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleLogin}>Accedi</button>
    </div>
  );
};

export default Login;