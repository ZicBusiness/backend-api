const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

// Simula um banco de dados simples
let formDataList = [];

// Endpoint para obter todos os dados
app.get('/api/formData', (req, res) => {
  res.json(formDataList);
});

// Endpoint para adicionar novo dado
app.post('/api/formData', (req, res) => {
  const formData = req.body;
  formDataList.push(formData);
  res.json(formData);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
