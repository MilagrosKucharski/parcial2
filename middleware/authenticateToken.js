const jwt = require('jsonwebtoken');
const secretKey = 'secreto'; // Reemplaza 'tu_secreto' con una clave secreta más segura

function authenticateToken(req, res, next) {
  const head = req.header('Authorization');
  let token = head && head.split(" ")[1]; // Asegurarse de que 'Authorization' header exista

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  console.log('Token recibido:', token);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.log('Error al verificar el token:', err);
      if (err.name === 'TokenExpiredError') {
        console.log('El token ha caducado.');
      } else {
        console.log('Error al verificar el token:', err.message);
      }
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;