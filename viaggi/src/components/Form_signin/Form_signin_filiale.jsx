import React from 'react';
import './Form_signin_filiale.css'; // Assicurati di creare anche il file CSS

const Form_signin_filiale = () => {
  return (
    <div className="form-signin-filiale">
      <h2>Registrazione Agenzia</h2>
      <form className="">
        <input type="text" placeholder="Nome Agenzia" />
        <input type="text" placeholder="Indirizzo Email" />
        <input type="text" placeholder="Partita IVA" />
        <button type="submit">Registrati</button>
      </form>
    </div>
  );
};

export default Form_signin_filiale;
