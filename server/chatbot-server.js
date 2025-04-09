const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: "tinyllama",
      prompt: userMessage,
      stream: false
    });

    const botResponse = response.data.response;
    res.json({ response: botResponse });
  } catch (error) {
    console.error("Erreur avec TinyLLaMA:", error.message);
    res.status(500).json({ response: "Une erreur est survenue avec l'IA." });
  }
});

app.listen(port, () => {
  console.log(`Serveur chatbot en écoute sur http://localhost:${port}`);
});
