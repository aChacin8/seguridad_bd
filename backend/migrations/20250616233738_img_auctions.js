/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.hasTable('img_auctions').then(function(exists){
    if(!exists){
        return knex.schema.createTable('img_auctions', function(table){
            table.increments('id_img_auct').primary()
            table.integer('id_auctions').unsigned().notNullable()
            table.foreign('id_auctions')
                .references('id_auctions').inTable('auctions')
                .onDelete('CASCADE')
            table.string('url').notNullable()
            table.boolean('active').defaultTo(true)
            table.timestamp('created_at').defaultTo(knex.fn.now())
        })
    }
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.hasTable('img_auctions').then(function(exists){
    if(exists){
        return knex.schema.dropTable('img_auctions')
    }
  })
};
