const express = require('express');
const router = express.Router();

// Rutas de autenticación
router.use('/auth', require('../controllers/authController'));

// Rutas protegidas que requieren autenticación
router.use('/players', require('../controllers/jugadoresController'));
router.use('/call', require('../controllers/callController'));

module.exports = router;