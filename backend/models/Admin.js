const knex = require('../config'); 

const tableName = 'admins';

const createAdmin = async (adminData) => {
    return knex(tableName).insert(adminData).returning('*');
};

const findByEmail = async (email) => {
    return knex(tableName).where({ email }).first();
};

const updateToken = async (id_admin, token) => {
    return knex(tableName).where({ id_admin }).update({ token });
};

module.exports = {
    createAdmin,
    findByEmail,
    updateToken
};
