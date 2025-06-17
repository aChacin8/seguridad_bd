const express = require('express');
const adminRoutes = express.Router();
const { loginAdmin } = require('../controllers/adminController');

adminRoutes.post('/login', loginAdmin);       

module.exports = adminRoutes;
