const express = require('express');
const cors = require('cors');
const axios = require('axios');
const jwt = require('jsonwebtoken'); 

const app = express();
const port = 5001;

const SECRET_KEY = 'tokenDiProva'; 

app.use(cors());
app.use(express.json());

//GET SERVER - CREDENZIALI ---------------------------------------------------------------------------------------------------------------
const getCredenzialiFromServer = async () => {
  try {
    console.log('Richiedo le credenziali al server principale...');
    const response = await axios.get('http://localhost:5000/credenziali');
    console.log('Credenziali ricevute dal server principale.');
    return response.data; 
  } catch (error) {
    console.error('Errore durante la comunicazione con il server principale:', error);
    throw new Error('Errore nella comunicazione con il server principale');
  }
};




//LOGICA LOGIN --------------------------------------------------------------------------------------------------------------
const handleLogin = async (req, res) => {

  //DATI CLIENT
  const { email, password } = req.body;

  console.log('Ricevuta richiesta di login.');
  console.log(`Email ricevuta: ${email}`);

  try 
  {
    const credenziali = await getCredenzialiFromServer();

    const credenzialeTrovata = credenziali.find((credenziale) => 
      credenziale.fk_email === email && credenziale.password === password
    );

//LOGIN OK ----------------------------------------------------
    if (credenzialeTrovata) 
    {
      console.log('Credenziali corrette. Risposta inviata al client.');
      console.log('Credenziale trovata:', credenzialeTrovata);
      const token = jwt.sign({ email: credenzialeTrovata.fk_email }, SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json(
      { 
        success: true,
        token: token,
        email: credenzialeTrovata.fk_email
      });
    } 
    else 
    {
      console.log('Credenziali errate. Risposta inviata al client.');
      res.status(401).json(
        { 
          success: false 
        });
    }
  } 
  catch (error) 
  {
    res.status(500).send(error.message);
  }
};

//ATTIVAZIONE HANDLELOGIN DOPO LA RICHIESTA POST CLIENT -------------------------------------------------------------------------
app.post('/login', handleLogin);


//AVVIO SERVER MIDDLEWARE ----------------------------------------------------------------------------------------------------
app.listen(port, () => 
{
  console.log(`Middleware in ascolto su http://localhost:${port}`);
});
