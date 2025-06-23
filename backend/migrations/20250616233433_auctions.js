/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.hasTable('auctions').then(function(exists){
    if(!exists){
        return knex.schema.createTable('auctions', function(table){
            table.increments('id_auctions').primary()
            table.string('title').notNullable()
            table.string('description').notNullable()
            table.decimal('start_price').notNullable()
            table.decimal('current_price').notNullable()
            table.timestamp('start_time').notNullable()
            table.timestamp('end_time').notNullable()
            table.enum('status',['pending', 'running', 'ended'])
            table.string('winner')
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
  return knex.schema.hasTable('auctions').then(function(exists){
    if(exists){
        return knex.schema.dropTable('auctions')
    }
  })
};
