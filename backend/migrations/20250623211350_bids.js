/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.hasTable('bids').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('bids', function (table) {
                table.increments('id_bid').primary();
                table.string('bidder', 100).notNullable(); 
                table.decimal('amount', 10, 2).notNullable(); 
                table.timestamp('bid_time').defaultTo(knex.fn.now()); 
                table.integer('id_auctions').unsigned().notNullable(); 
                table
                    .foreign('id_auctions')
                    .references('id_auctions')
                    .inTable('auctions')
                    .onDelete('CASCADE'); 
            });
        }
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.hasTable('bids').then(function (exists) {
        if (exists) {
            return knex.schema.dropTable('bids')
        }
    })
};
