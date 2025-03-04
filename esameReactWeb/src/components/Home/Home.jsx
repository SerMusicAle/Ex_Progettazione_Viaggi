import React from 'react';

const Home = () => 
{
  return (
    <div className="container">
      <h1 className="welcome-text text-center">
        Ben Tornato.<br />
        Insieme realizzeremo il viaggio dei tuoi Sogni
      </h1>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-4"> 
          <div className="card" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}> 
            <div className="card-body">
              <h2 className="card-title">S Travel</h2>
              <p className="card-text">Agenzia di viaggi specializzata in:</p>
              <ul>
                <li className="card-text">- Pacchetti vacanze</li>
                <li className="card-text">- Prenotazioni voli</li>
                <li className="card-text">- Hotel e alloggi</li>
                <li className="card-text">- Tour guidati</li>
              </ul>
              <p className="card-text">Contattaci per maggiori informazioni!</p>
              <p className="card-text">info@stravel.it</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;