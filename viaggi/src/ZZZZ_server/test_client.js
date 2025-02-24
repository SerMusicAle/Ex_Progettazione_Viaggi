import axios from 'axios';
import readline from 'readline';

// Funzione per testare l'endpoint /test
async function test() {
    const url = "http://127.0.0.1:5001/test";  // URL dell'endpoint test
    try {
        // Correggi la richiesta come GET e rimuovi loginData
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Response:", response.data);  // Stampa i dati ricevuti
    } catch (error) {
        console.error("Error fetching data:", error.message);  // Gestisci l'errore
    }
}


// Funzione per effettuare il login
async function login(username, password) {
    const url = "http://127.0.0.1:5001/login";  // URL dell'endpoint login
    const loginData = {
        username: username,  // Assumendo che il campo email sia chiamato fk_email
        password: password
    };

    console.log("Login Data:", loginData);

    try {
        const response = await axios.post(url, loginData);  // Effettua una richiesta POST all'endpoint
        console.log("Response:", response.data);  // Stampa i dati ricevuti
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

// Interfaccia per l'input dell'utente
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Mostra il menu di scelta
console.log("Scegli quale route eseguire:");
console.log("1. Test (ritorna 'Ciao')");
console.log("2. Login (richiede username e password)");

rl.question("Inserisci il numero della tua scelta (1 o 2): ", (scelta) => {
    if (scelta === "1") {
        // Chiamata alla route test
        test().then(() => rl.close());  // Chiudi l'interfaccia di lettura dopo la chiamata
    } else if (scelta === "2") {
        // Chiedi le credenziali per il login
        rl.question("Inserisci il nome utente (email): ", (username) => {
            rl.question("Inserisci la password: ", (password) => {
                // Chiama la funzione di login
                login(username, password).then(() => rl.close());  // Chiudi l'interfaccia di lettura dopo la chiamata
            });
        });
    } else {
        console.log("Scelta non valida. Inserisci 1 o 2.");
        rl.close();  // Chiudi l'interfaccia di lettura
    }
});