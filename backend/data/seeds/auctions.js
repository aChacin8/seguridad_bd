/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('auctions').del();

  await knex('auctions').insert([
    {
      title: 'Air Jordan 1 High OG TS SP Travis Scott',
      description: 'Colaboración icónica con Travis Scott, diseño invertido y detalles únicos. Talla US 10.',
      start_price: 28000.00,
      current_price: 28000.00,
      start_time: new Date(Date.now() + 60 * 1000),
      end_time: new Date(Date.now() + 1860 * 1000),
      status: 'pending',
      active: true
    },
    {
      title: 'Louis Vuitton by Tyler the Creator LV Trainer',
      description: 'Edición limitada diseñada por Tyler the Creator. Estilo de lujo y exclusividad. Talla US 9.',
      start_price: 47000.00,  
      current_price: 47000.00,
      start_time: new Date(Date.now() + 120 * 1000),
      end_time: new Date(Date.now() + 1920 * 1000),
      status: 'pending',
      active: true
    },
    {
      title: 'Air Jordan 1 High Off White Chicago',
      description: 'Diseño de Virgil Abloh para Off White. Modelo legendario inspirado en el clásico de 1985.',
      start_price: 65000.00,
      current_price: 65000.00,
      start_time: new Date(Date.now() + 180 * 1000),
      end_time: new Date(Date.now() + 1980 * 1000),
      status: 'pending',
      active: true
    }
  ]);
};
