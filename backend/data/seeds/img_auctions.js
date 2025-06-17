/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('img_auctions').del()
  await knex('img_auctions').insert([
    {
      id_auctions: 1, // Air Jordan 1 Travis Scott
      url: 'https://images.stockx.com/images/Air-Jordan-1-Retro-High-Travis-Scott-Product.jpg'
    },
    {
      id_auctions: 2, // Louis Vuitton x Tyler the Creator
      url: 'https://images.stockx.com/images/Louis-Vuitton-by-Tyler-the-Creator-White-Mocha-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1738193358'
    },
    {
      id_auctions: 3, // Air Jordan 1 Off White Chicago
      url: 'https://images.stockx.com/images/Air-Jordan-1-Retro-High-Off-White-Chicago-Product.jpg'
    }
  ]);
};
