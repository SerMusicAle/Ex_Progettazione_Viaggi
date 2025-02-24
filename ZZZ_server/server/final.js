const express = require('express');
const { Client } = require('pg');
const app = express();
const port = 5000;

app.use(express.json());

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'viaggi'
});

//CONN.PostgreSQL -----------------------------------------------------------------------
client.connect()
  .then(() => {
    console.log('Connesso al database PostgreSQL');
    
    app.listen(port, () => {
      console.log(`Server in ascolto su http://localhost:${port}`);
    });
  })
  .catch(err => console.error('Errore di connessione al database', err.stack));


  
//GET DB - TEST ------------------------------------------------------------------
app.get('/', (req, res) => {
  res.send('Ciao dal server!');
});


//GET DB - CREDENZIALI ------------------------------------------------------------------
app.get('/credenziali', (req, res) => {
  const query = 'SELECT * FROM mst_credenziali';  
  
  client.query(query)
    .then(result => {
      console.log('Credenziali recuperate dal database.');
      res.json(result.rows); 
    })
    .catch(err => {
      console.error('Errore nella query', err.stack);
      res.status(500).send('Errore nella query');
    });
});

//GET DB - CREDENZIALE SINGOLA ----------------------------------------------------------------------------------
app.get('/credenziale/:email', (req, res) => {
  const email = req.params.email;
  const query = 'SELECT * FROM mst_credenziali WHERE fk_email = $1';

  client.query(query, [email])
    .then(result => {
      if (result.rows.length > 0) {
        console.log(`Credenziale trovata per l'email: ${email}`);
        res.json(result.rows[0]);
      } else {
        console.log(`Nessuna credenziale trovata per l'email: ${email}`);
        res.status(404).send('Credenziale non trovata');
      }
    })
    .catch(err => {
      console.error('Errore nella query', err.stack);
      res.status(500).send('Errore nella query');
    });
});
