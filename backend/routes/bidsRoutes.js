const express = require('express');
const bidsRoutes = express.Router();
const bidController = require('../controllers/bidController');

bidsRoutes.post('/:id/bid', bidController.registerBid);

module.exports = bidsRoutes;
