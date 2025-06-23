const knex = require('../config');

const createBid = (bid) => {
    return knex('bids').insert(bid);
};

const getHighestBid = (auctionId) => {
    return knex('bids')
        .where({ id_auctions: auctionId })
        .orderBy('amount', 'desc')
        .first();
};

module.exports = {
    createBid,
    getHighestBid,
};
