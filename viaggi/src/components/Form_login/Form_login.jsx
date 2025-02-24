import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import './Form_login.css';
//import UserBar from '../User Bar/UserBar'; // Assicurati che il percorso sia corretto


const Form_login = ({ onLoginSuccess, onShowSignInFiliale, onShowSignInUser  }) => 
{
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userData, setUserData] = useState(null); 

  const handleLogin = async (event) => 
  {
    event.preventDefault();
    setLoading(true);
    setErrMsg('');

    try {
      const response = await axios.post('http://localhost:5001/login', { email, password });
      if (response.data.success) 
      {
        //CONFERMA TOKEN
        const token = response.data.token;
        console.log('Token ricevuto', token);

        //MEMORIZZA TOKEN
        localStorage.setItem('token', token); 

        setUserData(response.data.user);
        onLoginSuccess();
        setIsLoggedIn(true);
      } 
      else 
      {
        setErrMsg('Email o password errati.');
      }
    } 
    catch (error) 
    {
      setErrMsg('Errore nella comunicazione con il server.');
    } 
    finally 
    {
      setLoading(false);
    }
  };

  useEffect(() => 
  {
    emailRef.current.focus();
  }, []);

  return (
    <>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
        {errMsg}
      </p>

      <div className="login-bar">
        <div className="left-section">
          <p onClick={onShowSignInFiliale} style={{ cursor: 'pointer' }}>
            Sei un'agenzia e vuoi collaborare?
          </p>
          <p onClick={onShowSignInUser } style={{ cursor: 'pointer' }}>
            Ti occorre un preventivo di viaggio?
          </p>
        </div>

        <div className="center-section">
          {isLoggedIn ? (
            <User Bar user={userData} /> // Mostra i dati dell'utente se loggato
          ) : (
            <form className="login-form" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                id="email"
                ref={emailRef}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="off"
                required
              />
              <input
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Caricamento...' : 'Accedi'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Form_login;