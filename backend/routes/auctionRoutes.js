const express = require('express');
const auctionRoutes = express.Router();
const auctionController = require('../controllers/auctionController');

auctionRoutes.get('/auctions', auctionController.getAllAuctions);
auctionRoutes.get('/auctions/:id', auctionController.getAuction);
auctionRoutes.post('/auctions', auctionController.createAuction);
auctionRoutes.put('/auctions/:id', auctionController.updateAuction);
auctionRoutes.delete('/auctions/:id', auctionController.deleteAuction);

module.exports = auctionRoutes;

