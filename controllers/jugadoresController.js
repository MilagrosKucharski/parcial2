const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const data = require('../data/data');

// Rutas protegidas que requieren autenticación

// Ingresar jugadores
router.post('/', authenticateToken, (req, res) => {
  const nuevojugador = req.body;

  // Verificar si la posicion elegida es válida
  const posicionElegida = data.posiciones.find(posicion => posicion.position === nuevojugador.position);
  if (!posicionElegida) {
    return res.status(400).json({ message: 'La posicion elegida no es valida: puede ser GK, DF, MD o FW' });
  }

  // Verificar si ya existe una jugador con el mismo ID
  const jugadorExistente = data.jugadores.find(jugador => jugador.id === nuevojugador.id);
  if (jugadorExistente) {
    return res.status(400).json({ message: 'Ya existe un jugador con el mismo ID' });
  }

  data.jugadores.push(nuevojugador);
  res.json({ message: 'jugador agregado correctamente' });
});

// Eliminar jugadores
router.delete('/:id', authenticateToken, (req, res) => {
  const id = req.params.id;

  // Verificar si existe una jugador con el ID proporcionado
  const jugadorExistente = data.jugadores.find(jugador => jugador.id === id);
  if (!jugadorExistente) {
    return res.status(404).json({ message: 'No existe un jugador con el ID proporcionado' });
  }

  data.jugadores = data.jugadores.filter(jugador => jugador.id !== id);
  res.json({ message: 'jugador eliminado correctamente' });
});



// Buscar jugadores por nombre y apellido
router.get('/', authenticateToken, (req, res) => {
    const { position } = req.query;
    console.log(position);
    if(position === undefined){
        res.json(data.jugadores);
    }
    const resultado = data.jugadores.filter(jugador => jugador.position === position);
    if(resultado.length !== 0){
        res.json(resultado);
    }
  
    if (resultado.length === 0) {
      return res.status(404).json({ message: 'No se encontraron jugadores con los criterios proporcionados' });
    }
  
});

// Ver los datos de una empresa específica por su ID
router.get('/:id', authenticateToken, (req, res) => {
    const id = req.params.id;
    const jugador = data.jugadores.find(jugador => jugador.id === id);
  
    if (!jugador) {
      return res.status(404).json({ message: 'No existe un jugador con el ID proporcionado' });
    }
  
    res.json(jugador);
  });

router.put('/:id', authenticateToken, (req, res) => {
    const id = req.params.id;
    const nuevosdatos = req.body;
    const jugadorExistente = data.jugadores.find(jugador => jugador.id === id);

    jugadorExistente.position = nuevosdatos.position;
    jugadorExistente.suspended = nuevosdatos.suspended;
    jugadorExistente.injured = nuevosdatos.injured;

  
    if (!jugadorExistente) {
      return res.status(404).json({ message: 'No existe un jugador con el ID proporcionado' });
    }
  
    res.json(jugadorExistente);
  });


module.exports = router;
