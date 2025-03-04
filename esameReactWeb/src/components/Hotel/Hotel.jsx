// components/Hotel.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './Hotel.css';

const Hotel = () => {
  const [city, setCity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [hotelResults, setHotelResults] = useState([]); 
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(true);

  const handleSearch = async () => 
  {
    // Controllo degli errori
    if (!city) {
      setErrorMessage('Seleziona una città.');
      setShowError(true);
      return;
    }

    if (minPrice === '' || maxPrice === '') {
      setErrorMessage('Inserisci sia il prezzo minimo che il prezzo massimo.');
      setShowError(true);
      return;
    }

    if (isNaN(minPrice) || isNaN(maxPrice)) {
      setErrorMessage('I prezzi devono essere numeri validi.');
      setShowError(true);
      return;
    }

    if (parseFloat(minPrice) > parseFloat(maxPrice)) {
      setErrorMessage('Il prezzo minimo non può essere maggiore del prezzo massimo.');
      setShowError(true);
      return;
    }

    const searchData = {
      citta: city,
      minPrice: parseFloat(minPrice),
      maxPrice: parseFloat(maxPrice),
    };

    try {
      const response = await axios.post('http://localhost:5010/cercaHotel', searchData);
      console.log('Dati ricevuti dal server:', response.data);

      if (response.data.length === 0) {
        setErrorMessage('Non sono stati trovati risultati per la tua ricerca.');
        setShowError(true);
        return;
      }

      setHotelResults(response.data);
      setShowSearchForm(false); 
    } catch (error) {
      console.error('Errore nell\'invio dei dati:', error);
      setErrorMessage('Si è verificato un errore durante la ricerca degli hotel.');
      setShowError(true);
    }
  };

  const handleNewSearch = () => {
    setHotelResults([]); 
    setShowSearchForm(true); 
    setCity('');
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <div className="page-container">
      {showSearchForm && (
        <div>
          {/* Selettore per la città */}
          <select value={city} onChange={(e) => setCity(e.target.value)} className="picker">
            <option value="">Seleziona città</option>
            <option value="Roma">Roma</option>
            <option value="Milano">Milano</option>
            <option value="Napoli">Napoli</option>
            <option value="Firenze">Firenze</option>
          </select>

          {/* Input per il prezzo minimo */}
          <input
            type="number"
            placeholder="Prezzo minimo"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="input"
          />

          {/* Input per il prezzo massimo */}
          <input
            type="number"
            placeholder="Prezzo massimo"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="input"
          />

          {/* Bottone per la ricerca */}
          <button onClick={handleSearch} className="search-button">Cerca</button>

          {/* Popup di errore */}
          {showError && (
            <div className="error-popup">
              <p className="error-text">{errorMessage}</p>
            </div>
          )}
        </div>
      )}

      {/* Visualizzazione dei risultati */}
      {!showSearchForm && (
        <div className="results-container">
          <button onClick={handleNewSearch} className="new-search-button">Nuova ricerca</button>
          <h2>Risultati della ricerca</h2>
          <div className="hotel-cards">
            {hotelResults.length > 0 ? (
              hotelResults.map((hotel, index) => (
                <div key={index} className="hotel-card">
                  <h3>{hotel.nome}</h3>
                  <p>Indirizzo: {hotel.indirizzo}</p>
                  <p>Prezzo: {hotel.costostanza}</p>
                </div>
              ))
            ) : (
              <p>Nessun hotel trovato.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotel;