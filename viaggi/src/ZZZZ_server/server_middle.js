import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
    console.log('Questa è una scritta a terminale.');
    res.json({ message: 'Dati stampati nel terminale.' });
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});