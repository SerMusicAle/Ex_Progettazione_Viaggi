const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// POST MIDDLE - CREDENZIALI -----------------------------------------------------------
const login = async () =>
{
  rl.question('Inserisci la tua email: ', (email) => 
    {
    rl.question('Inserisci la tua password: ', async (password) => 
    {
      try 
      {
        console.log('Invio delle credenziali al middleware...');

        const response = await axios.post('http://localhost:5001/login', {
          email: email,
          password: password
        });

        console.log('Ricevuta risposta dal middleware.');

        // Controlla se il login è riuscito
        if (response.data.success) 
        {
          console.log('Login riuscito!'); // Messaggio di conferma
          console.log('Email dell\'utente:', response.data.email); // Stampa l'email
          console.log('Token:', response.data.token);
        } 
        else 
        {
          console.log('Login fallito. Controlla le credenziali.'); // Messaggio di errore
        }
        
      } 
      catch (error) 
      {
        console.error('Errore durante la comunicazione con il server:', error.response ? error.response.data : error.message);
      } 
      finally 
      {
        console.log('Chiusura dell\'interfaccia di lettura.');
        rl.close();
      }
    });
  });
};

login();