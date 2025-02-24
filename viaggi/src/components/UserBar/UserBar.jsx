import React from 'react';
import './UserBar.css'; 
import UserAvatar from './UserAvatar'; // Assicurati di importare il componente UserAvatar

const UserBar = ({ userData, onShowSignInFiliale, onShowSignInUser  , onLogout }) => {
  // Contenuto per i dati dell'utente
  const UserBarData = userData ? (
    <div className="user-data">
      <p>{userData.name}</p> {/* Mostra il nome dell'utente */}
    </div>
  ) : (
    <div className="user-data">
      <p>Non sei loggato.</p> {/* Messaggio se non sei loggato */}
    </div>
  );

  // Contenuto per l'avatar dell'utente
  const UserBarAvatar = userData ? (
    <div className="user-avatar">
      <User Avatar onLogout={onLogout} /> {/* Passa la funzione di logout se l'utente è loggato */}
    </div>
  ) : null; // Non mostrare nulla se non sei loggato

  return (
    <div className="user-bar">
      <div className="left-section">
        <p onClick={onShowSignInFiliale} style={{ cursor: 'pointer' }}>
          TEST USER BAR
        </p>
        <p onClick={onShowSignInUser } style={{ cursor: 'pointer' }}>
        TEST USER BAR 2
        </p>
      </div>

      <div className="center-section">
        {UserBarData} {/* Mostra i dati dell'utente */}
        {UserBarAvatar} {/* Mostra l'avatar dell'utente */}
      </div>
    </div>
  );
};

export default UserBar;