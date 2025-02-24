const { Pool } = require('pg');

// Configura la connessione al database PostgreSQL
const pool = new Pool({
  host: 'localhost',        // Inserisci l'host del tuo database
  port: 5432,               // Inserisci la porta del tuo database
  database: 'viaggi',  // Inserisci il nome del database
  user: 'postgres',         // Inserisci l'utente del database
  password: 'password123',  // Inserisci la password del database
});

module.exports = pool;
