// models/Product.js - Modelo de Producto/Moto
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  images: {
    type: [String],
    default: []
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Para proyecto universitario, opcional
  },
  city: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'Moto'
  },
  status: {
    type: String,
    enum: ['available', 'sold'],
    default: 'available'
  },
  engineCC: {
    type: Number,
    required: false // Opcional para productos existentes
  }
}, {
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('Product', ProductSchema);

