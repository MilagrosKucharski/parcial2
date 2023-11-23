const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const data = require('../data/data');

// Rutas protegidas que requieren autenticación

// Ingresar empresas
router.post('/', authenticateToken, (req, res) => {
  const convocados = req.body.calledPlayersId;
  console.log(convocados);
  if (convocados.length !== 22){
    return res.status(400).json({ message: 'Tiene que convocar a 22 jugadores exactamente' });
  }

  convocados.forEach(jugador => { 
    
    const player = data.jugadores.find(player => player.id === jugador)
    if (player === undefined){
        return res.status(400).json({ message: 'el jugador no existe' });
    }
    if (player.suspended === true || player.injured === true){
        return res.status(400).json({ message: 'Los jugadores no pueden estar suspendidos ni lesionados' });
    }
  });
  data.called.push(convocados);
  res.json({ message: 'jugadores convocados correctamente correctamente' });
});



// Listar todas las empresas de la agenda
router.get('/', authenticateToken, (req, res) => {
  res.json(data.called);
});



module.exports = router;