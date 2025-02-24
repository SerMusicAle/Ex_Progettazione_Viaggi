const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); // Importa il driver PostgreSQL

const app = express(); // Inizializza l'app con express
const PORT = 5000; 

app.use(cors());
app.use(bodyParser.json());

// Configurazione della connessione al database
const pool = new Pool({
    user: 'postgres', // Sostituisci con il tuo nome utente
    host: 'localhost', // O l'indirizzo del tuo server DB
    database: 'postgres', // Sostituisci con il nome del tuo database
    password: 'postgres', // Sostituisci con la tua password
    port: 5432, // Porta predefinita di PostgreSQL
});

app.get('/', (req, res) => {
    console.log('Richiesta ricevuta sulla rotta principale');
    res.send('Server in esecuzione!');
});

// -------------------------- LOGIN
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(`Email: ${email}, Password: ${password}`);
    
    try {
        // Verifica se l'utente esiste nel database
        const result = await pool.query('SELECT * FROM utenti WHERE email = $1', [email]);
        
        if (result.rows.length > 0) {
            const user = result.rows[0];
            // Confronta la password fornita con quella memorizzata
            if (password === user.password) { // Confronto diretto delle password
                res.json({ message: 'Login effettuato con successo!' });
            } else {
                res.status(401).json({ message: 'Credenziali non valide' });
            }
        } else {
            res.status(401).json({ message: 'Credenziali non valide' });
        }
    } catch (err) {
        console.error('Errore durante la query:', err);
        res.status(500).json({ message: 'Errore del server' });
    }
});

// -------------------------- AVVIO SERVER
app.listen(PORT, () => {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});