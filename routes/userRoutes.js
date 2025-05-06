const express = require('express');
const router = express.Router();
const userService = require('../controllers/userController');

// Ruta para crear usuario
router.post('/users', userService.createUser);  // Pasamos la función directamente, no hace falta el async dentro de la ruta

// Ruta para ver usuarios
router.get('/users', userService.viewAllUsers); // Pasamos la función directamente, no hace falta el async dentro de la ruta

module.exports = router;
