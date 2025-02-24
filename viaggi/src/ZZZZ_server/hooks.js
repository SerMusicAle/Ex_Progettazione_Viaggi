//connection.js

useEffect(() => {
    axios.get("http://localhost:5001/data")
      .then((response) => {
        console.log("Dati ricevuti dal backend:", response.data); 
        setData(response.data.data); 
      })
      .catch((error) => {
        console.error("Errore nel recupero dei dati:", error);
      });
}, []);