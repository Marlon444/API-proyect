// routes/users.js - Rutas para usuarios (Simple para proyecto universitario)
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST - Registrar nuevo usuario
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Crear nuevo usuario (sin hash para proyecto universitario)
    const user = new User({
      email,
      password, // En producción: usar bcrypt.hash(password, 10)
      name
    });

    const savedUser = await user.save();
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: {
        id: savedUser._id,
        email: savedUser.email,
        name: savedUser.name
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST - Login (Simple para proyecto universitario)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    // Verificar contraseña (simple, sin hash para proyecto universitario)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    // En producción usarías JWT tokens
    res.json({
      message: 'Login exitoso',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Obtener todos los usuarios (solo para desarrollo)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

