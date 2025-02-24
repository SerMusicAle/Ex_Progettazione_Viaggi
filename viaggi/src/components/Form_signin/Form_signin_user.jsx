import React from 'react';
import './Form_signin_user.css'; // Assicurati di creare anche il file CSS

const Form_signin_user = () => {
  return (
    <div className="form-signin-user">
      <h2>Benvenuto nella pagina per a registrazione. Con l'augurio che questo sarà uno splendido viaggio </h2>
      <form className="">
        <input type="text" placeholder="Nome Agenzia" />
        <input type="text" placeholder="Indirizzo Email" />
        <input type="text" placeholder="Partita IVA" />
        <button type="submit">Registrati</button>
      </form>
    </div>
  );
};

export default Form_signin_user;
