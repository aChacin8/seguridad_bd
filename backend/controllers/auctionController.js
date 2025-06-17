const Auction = require('../models/Auctions');

const knex = require('../config'); 

const getAllAuctions = async (req, res) => {
  try {
    const auctions = await knex('auctions')
      .leftJoin('img_auctions', 'auctions.id_auctions', 'img_auctions.id_auctions')
      .select(
        'auctions.id_auctions',
        'auctions.title',
        'auctions.description',
        'auctions.start_price',
        'auctions.current_price',
        'auctions.status',
        'auctions.star_time',
        'auctions.end_time',
        'auctions.active',
        'img_auctions.url'
      );

    res.status(200).json(auctions);
  } catch (error) {
    console.error('Error al obtener subastas:', error);
    res.status(500).json({ message: 'Error al obtener subastas', error });
  }
};


const getAuction = async (req, res) => {
  const id = req.params.id;
  try {
    const auction = await Auction.getAuctionById(id);
    if (!auction) return res.status(404).json({ error: 'Subasta no encontrada' });
    res.json(auction);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener subasta' });
  }
};

const createAuction = async (req, res) => {
  const data = req.body;
  try {
    const [id] = await Auction.createAuction(data);
    res.status(201).json({ message: 'Subasta creada', id });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear subasta' });
  }
};

const updateAuction = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const affected = await Auction.updateAuction(id, data);
    if (affected === 0) return res.status(404).json({ error: 'Subasta no encontrada' });
    res.json({ message: 'Subasta actualizada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar subasta' });
  }
};

const deleteAuction = async (req, res) => {
  const id = req.params.id;
  try {
    const affected = await Auction.deleteAuction(id);
    if (affected === 0) return res.status(404).json({ error: 'Subasta no encontrada' });
    res.json({ message: 'Subasta eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar subasta' });
  }
};

module.exports = {
  getAllAuctions,
  getAuction,
  createAuction,
  updateAuction,
  deleteAuction,
};
