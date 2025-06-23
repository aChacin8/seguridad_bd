const knex = require('../config'); 

const getAllAuctions = () => {
  return knex('auctions').select('*').where('active', true);
};

const getAuctionById = (id) => {
  return knex('auctions').where('id_auctions', id).first();
};

const createAuction = (auctionData) => {
  return knex('auctions').insert(auctionData);
};

const updateAuction = (id, auctionData) => {
  return knex('auctions').where('id_auctions', id).update(auctionData);
};

const deleteAuction = (id) => {
  return knex('auctions').where('id_auctions', id).del();
};

const updateCurrentPrice = (id, price) => {
  return knex('auctions')
    .where({ id_auctions: id })
    .update({ current_price: price });
};

const finishAuction = (id, winner) => {
  return knex('auctions')
    .where({ id_auctions: id })
    .update({
      active: false,
      status: 'ended',
      winner,
      end_time: knex.fn.now(),
    });
};

module.exports = {
  getAllAuctions,
  getAuctionById,
  createAuction,
  updateAuction,
  deleteAuction,
  updateCurrentPrice,
  finishAuction
};
