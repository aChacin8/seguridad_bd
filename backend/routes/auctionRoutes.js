const express = require('express');
const auctionRoutes = express.Router();
const auctionController = require('../controllers/auctionController');

auctionRoutes.get('/', auctionController.getAuctions);
auctionRoutes.get('/:id', auctionController.getAuction);
auctionRoutes.post('/', auctionController.createAuction);
auctionRoutes.put('/:id', auctionController.updateAuction);
auctionRoutes.delete('/:id', auctionController.deleteAuction);

module.exports = auctionRoutes;
