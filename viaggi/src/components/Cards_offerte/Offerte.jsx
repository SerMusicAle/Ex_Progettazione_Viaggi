import React from 'react';
import Card_offerta from './Offerta_card';

const Offerte = () => {
  // Simula dati del database
  const offerte = [
    { id: 1, titolo: 'Vacanza al mare', prezzo: 500 },
    { id: 2, titolo: 'Weekend in montagna', prezzo: 300 },
    { id: 3, titolo: 'Tour città d\'arte', prezzo: 400 },
  ];

  return (
    <div className="offerte-page">
      {offerte.map(offerta => (
        <Card_offerta key={offerta.id} titolo={offerta.titolo} prezzo={offerta.prezzo} />
      ))}
    </div>
  );
};

export default Offerte;
