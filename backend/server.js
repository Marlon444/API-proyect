// server.js - Servidor principal
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json()); // Para parsear JSON

// Conectar a MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://mailon:201191@cluster0.falcuez.mongodb.net/?appName=Cluster0';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Importar rutas
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');

// Usar rutas
app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: '🚀 API de MotoMarket funcionando!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

