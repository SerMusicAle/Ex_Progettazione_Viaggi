from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
import psycopg2
from connection import get_db_connection  # Usa la funzione get_db_connection

app = Flask(__name__)
CORS(app)



@app.route("/test", methods=["GET"])
def test():
    try:
        # Stampa un messaggio nel terminale
        print("Questa è una scritta a terminale.")
        
        # Restituisci una risposta di successo
        return make_response(jsonify({"message": "Dati stampati nel terminale."}), 200)
    
    except Exception as e:
        return make_response(jsonify({'error': str(e)}), 500)

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    try:
        # Connessione al database con psycopg2
        conn = get_db_connection() 
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM MST_credenziali WHERE fk_email = %s AND password = %s", (username, password))
            user = cur.fetchone()

        if user:
            return jsonify({"message": "Login riuscito!"}), 200
        else:
            return jsonify({"error": "Credenziali non valide"}), 401
    except Exception as e:
        print(f"Error in login endpoint: {e}")  # Log dell'errore
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()  # Assicurati di chiudere la connessione

if __name__ == '__main__':
    print("Avviando il server Flask...")
    app.run(host='0.0.0.0', port=5001, debug=True)



# # route_auth.py
# from flask import Flask, jsonify, request
# from flask_cors import CORS
# from connection import get_db_session  # Importa la funzione per ottenere una sessione
# from sqlalchemy import text  # Importa text per le query SQL testuali

# app = Flask(__name__)
# CORS(app)

# import logging

# logging.basicConfig(filename='app.log', level=logging.INFO)

# @app.route("/test", methods=["GET"])
# def test():
#     logging.info("Questa è una stampa nel file di log!")
#     return jsonify({"message": "Richiesta ricevuta con successo!"}), 200

# @app.route("/login", methods=["POST"])
# def login():
#     # Ottieni i dati dal corpo della richiesta
#     data = request.get_json()
#     username = data.get("username")
#     password = data.get("password")

#     try:
#         session = get_db_session()  # Ottieni una sessione dal pool
#         # Esegui la query per verificare le credenziali
#         result = session.execute(
#             text("SELECT * FROM MST_credenziali WHERE fk_email = :username AND password = :password"),
#             {"username": username, "password": password}
#         )
#         user = result.fetchone()

#         if user:
#             return jsonify({"message": "Login riuscito!"}), 200  # Login riuscito
#         else:
#             return jsonify({"error": "credenziali non valide"}), 401  # Credenziali non valide
#     except Exception as e:
#         print(f"Error in login endpoint: {e}")  # Aggiungi questa riga per il debug
#         return jsonify({"error": str(e)}), 500
#     finally:
#         session.close()  # Chiudi la sessione

# if __name__ == '__main__':
#     print("Avviando il server Flask...")
#     app.run(host='0.0.0.0', port=5001, debug=True)