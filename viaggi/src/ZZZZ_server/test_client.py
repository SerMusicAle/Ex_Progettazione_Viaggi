import requests

def test():
    url = "http://127.0.0.1:5001/test"  # URL dell'endpoint test
    try:
        response = requests.get(url)  # Effettua una richiesta GET all'endpoint
        response.raise_for_status()  # Controlla se la richiesta ha avuto successo
        data = response.json()  # Ottieni i dati in formato JSON
        return data
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return None

def login(username, password):
    url = "http://127.0.0.1:5001/login"  # URL dell'endpoint login
    login_data = {
        "username": username,
        "password": password
    }
    
    try:
        response = requests.post(url, json=login_data)  # Effettua una richiesta POST all'endpoint
        response.raise_for_status()  # Controlla se la richiesta ha avuto successo
        data = response.json()  # Ottieni i dati in formato JSON
        return data
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return None

if __name__ == "__main__":
    # Mostra il menu di scelta
    print("Scegli quale route eseguire:")
    print("1. Test (ritorna 'Ciao')")
    print("2. Login (richiede username e password)")

    scelta = input("Inserisci il numero della tua scelta (1 o 2): ")

    if scelta == "1":
        # Chiamata alla route test
        data = test()
        if data is not None:
            print("Response:", data)  # Stampa i dati ricevuti
        else:
            print("Errore durante la chiamata alla route test.")
    elif scelta == "2":
        # Chiedi le credenziali per il login
        username = input("Inserisci il nome utente: ")
        password = input("Inserisci la password: ")
        
        # Chiama la funzione di login
        data = login(username, password)
        if data is not None:
            print("Response:", data)  # Stampa i dati ricevuti
        else:
            print("Login fallito.")
    else:
        print("Scelta non valida. Inserisci 1 o 2.")


# import requests

# def get_data():
#     url = "http://127.0.0.1:5001/login"  # URL dell'endpoint
#     try:
#         response = requests.get(url)  # Effettua una richiesta GET all'endpoint
#         response.raise_for_status()  # Controlla se la richiesta ha avuto successo
#         data = response.json()  # Ottieni i dati in formato JSON
#         return data
#     except requests.exceptions.RequestException as e:
#         print(f"Error fetching data: {e}")
#         return None

# if __name__ == "__main__":
#     data = get_data()  # Chiama la funzione per ottenere i dati
#     if data is not None:
#         print(data)  # Stampa i dati ricevuti


