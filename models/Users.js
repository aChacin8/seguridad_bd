const knex = require('../config'); // Asegúrate de que ../config exporte la instancia correctamente
const { hashEmail } = require ('../utils/hash') // Importa la función de hash para el email

const createUser = async (bodyUser) => {
  const [id] = await knex('users').insert(bodyUser); // Devuelve el id autoincremental
  return knex('users').where('id_users', id).first(); // Retorna el usuario recién creado
};

const viewAll = () => {
  return knex('users')
    .select('*')
    .where('active', true);
};

const findById = (idUsers) => {
  return knex('users')
    .select('*')
    .where('id_users', idUsers)
    .andWhere('active', true);
};

const findEmail = (email) => {
    const hashedEmail = hashEmail(email); // Asegúrate de convertir a minúsculas
    return knex
        .select('*')
        .from('users')
        .where({email:hashedEmail}) //Confirma que el email existe
        .andWhere('active', true)
        .first()
}

module.exports = {
  createUser,
  viewAll,
  findEmail,
  findById
};
