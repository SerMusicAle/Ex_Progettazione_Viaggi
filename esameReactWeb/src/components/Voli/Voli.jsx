// components/Voli.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './Voli.css';

const Voli = () => {
  const [cityStart, setCityStart] = useState('');
  const [cityStop, setCityStop] = useState('');
  const [flightResults, setFlightResults] = useState([]); 
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(true); 

  const handleSearch = async () => {
    // Controllo degli errori
    if (!cityStart || !cityStop) {
      setErrorMessage('Seleziona sia la città di partenza che quella di arrivo.');
      setShowError(true);
      return;
    }

    if (cityStart === cityStop) {
      setErrorMessage('La città di partenza e quella di arrivo non possono essere uguali.');
      setShowError(true);
      return;
    }

    const searchData = {
      city_start: cityStart,
      city_stop: cityStop,
    };

    try {
      const response = await axios.post('http://localhost:5010/cercaAereo', searchData);
      console.log('Dati ricevuti dal server:', response.data);
      setFlightResults(response.data);

      if (response.data.length === 0) {
        setErrorMessage('Non sono stati trovati risultati per la tua ricerca.');
        setShowError(true);
        return;
      }

      // Nascondi il modulo di ricerca
      setShowSearchForm(false);
    } catch (error) {
      console.error('Errore nell\'invio dei dati:', error);
      setErrorMessage('Si è verificato un errore durante la ricerca dei voli.');
      setShowError(true);
    }
  };

  const handleNewSearch = () => {
    setFlightResults([]);
    setShowSearchForm(true); 
    setCityStart('');
    setCityStop('');
  };

  return (
    <div className="page-container">
      {showSearchForm && (
        <div>
          {/* Selettore per la città di partenza */}
          <select value={cityStart} onChange={(e) => setCityStart(e.target.value)} className="picker">
            <option value="">Seleziona città di partenza</option>
            <option value="Roma">Roma</option>
            <option value="Milano">Milano</option>
            <option value="Napoli">Napoli</option>
            <option value="Firenze">Firenze</option>
          </select>

          {/* Selettore per la città di arrivo */}
          <select value={cityStop} onChange={(e) => setCityStop(e.target.value)} className="picker">
            <option value="">Seleziona città di arrivo</option>
            <option value="Roma">Roma</option>
            <option value="Milano">Milano</option>
            <option value="Napoli">Napoli</option>
            <option value="Firenze">Firenze</option>
          </select>

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
          <div className="flight-cards">
            {flightResults.length > 0 ? (
              flightResults.map((flight, index) => (
                <div key={index} className="flight-card">
                  <h3>Compagnia: {flight.compagnia}</h3>
                  <p>Partenza: {flight.dataora_partenza}</p>
                  <p>Arrivo: {flight.dataora_arrivo}</p>
                </div>
              ))
            ) : (
              <p>Nessun volo trovato.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Voli;