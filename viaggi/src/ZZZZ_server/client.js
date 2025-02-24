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
function login() {
    console.log("f_login chiamata (client.js)");  // Stampa solo il messaggio desiderato
}

// // Funzione per effettuare il login
// async function login(username, password) {
//     print ("f_login chiamata (client.js)")
//     console.log("Funzione login chiamata con", username, password);  // Aggiungi un log per verificare la chiamata
    
//     const url = "http://127.0.0.1:5001/login";  // URL dell'endpoint login
//     const loginData = {
//         username: username,  // Assumendo che il campo email sia chiamato fk_email
//         password: password
//     };

//     console.log("Login Data:", loginData);

//     try {
//         const response = await axios.post(url, loginData);  // Effettua una richiesta POST all'endpoint
//         return response.data;
//         console.log("Response:", response.data);  // Stampa i dati ricevuti
//     } catch (error) {
//         console.error("Error fetching data:", error.message);
//         throw new Error('Errore durante il login');  // Lancia un errore se la richiesta fallisce
//     }
// }


