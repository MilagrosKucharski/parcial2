const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = 'secreto'; // Reemplaza 'tu_secreto' con una clave secreta más segura
const data = require('../data/data');

// Ruta para autenticarse y obtener un token
router.post('/login', (req, res) => {
  const { user, password } = req.body;

  // Busca al usuario en la lista 
  const usuario = data.users.find(u => u.user === user && u.password === password);

  if (usuario) {
    // Genera un token JWT válido por 1 hora
    const token = jwt.sign({ userId: usuario.id }, secretKey, { expiresIn: '1h' });

    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

// Ruta para crear un nuevo usuario y obtener un token
router.post('/signup', (req, res) => {
    const nuevoUsuario = req.body;

    const usuarioExistente = data.users.find(user => user.user === nuevoUsuario.username);
    if (usuarioExistente) {
        return res.status(400).json({ message: 'Ya existe un usuario con el mismo nombre' });
    }
  
    data.users.push(nuevoUsuario);
    res.json({ message: 'Persona agregada correctamente' });
  });

module.exports = router;