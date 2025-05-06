const bcrypt = require('bcrypt');
const ModelUsers = require('../models/usersModel');
const { hashEmail } = require('../utils/hash');
const { encrypt, decrypt } = require('../utils/crypto');

const SALT_ROUNDS = 10;

const createUser = async (req, res) => {
  try {
    const { password, email, address, phone_num, RFC, ...rest } = req.body;

    const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const hashedEmail = hashEmail(email.toLowerCase());
    const encryptedAddress = encrypt(address);
    const encryptedPhone = encrypt(phone_num);
    const encryptedRFC = encrypt(RFC);

    const user = await ModelUsers.createUser({
      ...rest,
      address: encryptedAddress,
      phone_num: encryptedPhone,
      email: hashedEmail,
      password: hashPassword,
      RFC: encryptedRFC,
    });

    res.status(201).json({ message: 'Usuario registrado correctamente', user });
  } catch (error) {
    console.error('Error en createUser:', error);
    res.status(400).json({ message: 'Error al registrar el usuario', error });
  }
};

const viewAllUsers = async (req, res) => {
  try {
    const users = await ModelUsers.viewAll();
    const decryptedUsers = users.map(user => ({
      ...user,
      address: decrypt(user.address),
      phone_num: decrypt(user.phone_num),
      RFC: decrypt(user.RFC),
      password: undefined, // No se expone
      email: undefined, // Hasheado, no se puede revertir
    }));

    res.status(200).json(decryptedUsers);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(400).json({ message: 'Error al obtener usuarios', error });
  }
};

module.exports = {
  createUser,
  viewAllUsers,
};
