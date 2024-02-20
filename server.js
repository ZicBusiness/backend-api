const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const app = express();

app.use(cors());
app.use(express.json());

const dataFilePath = './data.json';

let formData = [];

// Carregar dados do arquivo se existir
try {
  formData = require(dataFilePath);
} catch (error) {
  console.error('Error loading data file:', error);
}

app.post('/api/formData', async (req, res) => {
  console.log('Received POST request:', req.body);
  const newFormData = req.body;

  // Adicionar novos dados à lista existente
  formData.push(newFormData);

  // Salvar os dados no arquivo
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(formData, null, 2), 'utf-8');
    console.log('Data saved to file successfully!');
  } catch (error) {
    console.error('Error saving data to file:', error);
  }

  res.json({ message: 'Dados salvos com sucesso!' });
});

app.get('/api/formData', (req, res) => {
  console.log('Endpoint accessed successfully.');
  res.json(formData);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
