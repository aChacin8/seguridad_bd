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
      url: 'https://assets.vogue.com/photos/65efab7998a67f4742fe1435/master/pass/00-story-Louis-Vuitton-Tyler-the-Creator-Shoes.jpg'
    },
    {
      id_auctions: 3, // Air Jordan 1 Off White Chicago
      url: 'https://images.stockx.com/images/Air-Jordan-1-Retro-High-Off-White-Chicago-Product.jpg'
    }
  ]);
};
