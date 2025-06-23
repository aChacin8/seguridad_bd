const Bid = require('../models/Bids');
const Auction = require('../models/Auctions');

const registerBid = async (req, res) => {
    const { id } = req.params;
    const { bidder, amount } = req.body;

    try {
        const auction = await Auction.getAuctionById(id);
        if (!auction || !auction.active) {
            return res.status(400).json({ error: 'Subasta no disponible' });
        }

        if (amount <= auction.current_price) {
            return res.status(400).json({ error: 'La puja debe ser mayor al precio actual' });
        }

        await Bid.createBid(
            { 
                id_auctions: id, 
                bidder, 
                amount 
            });
        await Auction.updateCurrentPrice(id, amount);

        res.status(200).json({ message: 'Puja registrada', bidder, amount });
    } catch (err) {
        res.status(500).json({ error: 'Error al pujar' });
    }
};

module.exports = {
    registerBid,
};
