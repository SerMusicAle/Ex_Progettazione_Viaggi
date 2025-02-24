import React from 'react';

const Card_offerta = ({ titolo, prezzo }) => {
  return (
    <div className="card">
      <h2>{titolo}</h2>
      <p>Prezzo: {prezzo}€</p>
    </div>
  );
};

export default Card_offerta;
