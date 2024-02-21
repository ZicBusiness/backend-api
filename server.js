const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const app = express();

// Configuração do CORS
const corsOptions = {
  origin: 'https://vercel-one-zicbusiness.vercel.app', // Substitua pelo domínio do seu frontend
  optionsSuccessStatus: 200, // Alguns navegadores podem exigir isso
};
app.use(cors(corsOptions));

app.use(express.json());
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});
app.use((err, req, res, next) => {
  console.error('Error caught globally:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});


const dataFilePath = process.env.DATA_FILE_PATH || './data.json';
let formData = [];

// Carregar dados do arquivo se existir
try {
  formData = require(dataFilePath);
} catch (error) {
  console.error('Error loading data file:', error);
}
console.log('Before defining /api/formData route');
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
console.log('After defining /api/formData route');

app.get('/api/formData', (req, res) => {
  console.log('Endpoint accessed successfully.');
  res.json(formData);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
