const express = require('express');
const router = express.Router();
const userService = require('../controllers/userController');

// Ejemplo de ruta para crear usuario
router.post('/users', async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

// Ejemplo de ruta para ver usuarios
router.get('/users', async (req, res) => {
  try {
    const users = await userService.viewAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

module.exports = router;
