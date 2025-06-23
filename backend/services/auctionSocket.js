const Bid = require('../models/Bids');
const Auction = require('../models/Auctions');

const auctionSocket = (io) => {
    const auctionsTimers = {}; // Estado de timers en memoria

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  socket.on('joinAuction', async (auctionId) => {
    socket.join(`auction-${auctionId}`);
    console.log(`${socket.id} se unió a auction-${auctionId}`);

    // Si ya hay timer corriendo, solo envía el estado actual
    if (auctionsTimers[auctionId]) {
      socket.emit('timer', auctionsTimers[auctionId].timeLeft);
      return;
    }

    // Si no, inicializa el timer para esa subasta
    auctionsTimers[auctionId] = {
      timeLeft: 30,
      intervalId: null,
      lastMachineBidTime: 0,
    };

    auctionsTimers[auctionId].intervalId = setInterval(async () => {
      auctionsTimers[auctionId].timeLeft--;

      io.to(`auction-${auctionId}`).emit('timer', auctionsTimers[auctionId].timeLeft);

      // Máquina puja cada 5 segundos
      const now = Date.now();
      if (now - auctionsTimers[auctionId].lastMachineBidTime >= 5000) {
        auctionsTimers[auctionId].lastMachineBidTime = now;

        const auction = await Auction.getAuctionById(auctionId);
        if (!auction || auctionsTimers[auctionId].timeLeft <= 0) {
          clearInterval(auctionsTimers[auctionId].intervalId);
          delete auctionsTimers[auctionId];
          return;
        }

        // Máquina decide si puja (50% prob)
        if (Math.random() < 0.5) {
          const newAmount = parseFloat(auction.current_price) + Math.floor(Math.random() * 20 + 10);
          await Bid.createBid({ id_auctions: auctionId, bidder: 'Máquina', amount: newAmount });
          await Auction.updateCurrentPrice(auctionId, newAmount);
          io.to(`auction-${auctionId}`).emit('newBid', { bidder: 'Máquina', amount: newAmount });
        }
      }

      // Fin de la subasta
      if (auctionsTimers[auctionId].timeLeft <= 0) {
        clearInterval(auctionsTimers[auctionId].intervalId);

        const highest = await Bid.getHighestBid(auctionId);
        const winner = highest ? highest.bidder : 'Sin pujas';

        await Auction.finishAuction(auctionId, winner);
        io.to(`auction-${auctionId}`).emit('auctionEnded', { winner });

        delete auctionsTimers[auctionId];
      }
    }, 1000);
  });

  socket.on('userBid', async ({ auctionId, bidder, amount }) => {
    const auction = await Auction.getAuctionById(auctionId);
    if (!auction) return;

    if (amount <= auction.current_price) {
      // No acepta puja menor o igual al actual
      socket.emit('bidRejected', { message: 'Tu puja debe ser mayor al precio actual' });
      return;
    }

    // Registra la puja y actualiza precio
    await Bid.createBid({ id_auctions: auctionId, bidder, amount });
    await Auction.updateCurrentPrice(auctionId, amount);

    io.to(`auction-${auctionId}`).emit('newBid', { bidder, amount });
  });
});

};

module.exports = auctionSocket;
