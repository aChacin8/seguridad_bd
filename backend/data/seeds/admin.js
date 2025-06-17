require('dotenv').config();
const bcrypt = require('bcrypt');
const { hashEmail } = require('../../utils/hash');
const { encrypt } = require('../../utils/crypto');

exports.seed = async function(knex) {
  await knex('admins').del();

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  await knex('admins').insert({
    email: hashEmail(email.toLowerCase()),
    password: await bcrypt.hash(password, 10),
    first_name: 'Admin',
    last_name: 'Master',
    address: encrypt('Oculto 123'),
    phone_num: encrypt('5551234567'),
    rfc: encrypt('MEMA040416HMCDRLA2'),
    token: null,
    active: true
  });
};
