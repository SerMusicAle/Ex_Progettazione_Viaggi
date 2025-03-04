// components/Utente.jsx
import React from 'react';
import './Utente.css'; 
import Home from '../Home/Home'; 

const Utente = ({ visible, onClose, userData, onLogout }) => {
  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button onClick={onClose} className="close-button btn btn-danger">X</button>
        <div className="login-form">
          <p>Nome: {userData?.nome}</p>
          <p>Cognome: {userData?.cognome}</p>
          <p>Email: {userData?.email}</p>
          
          <button onClick={() => { onLogout(); onClose(); }} className="disconnect-button btn btn-primary">Disconnetti</button>
        </div>
      </div>
    </div>
  );
};

export default Utente;