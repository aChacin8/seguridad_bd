const bcrypt = require('bcrypt');
const ModelUsers = require('../models/Users');
const { hashEmail } = require('../utils/hash');
const { encrypt, decrypt } = require('../utils/crypto');


const createUser = async (req, res) => {
  try {
    const { email, address, phone_num, RFC, ...rest } = req.body;

    // Realiza las operaciones como hash, cifrado, etc.
    const hashedEmail = hashEmail(email.toLowerCase());
    const encryptedAddress = encrypt(address);
    const encryptedPhone = encrypt(phone_num);
    const encryptedRFC = encrypt(RFC);

    const user = await ModelUsers.createUser({
      ...rest,
      address: encryptedAddress,
      phone_num: encryptedPhone,
      email: hashedEmail,
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
      email: hashEmail, // Hasheado, no se puede revertir
    }));

    res.status(200).json(decryptedUsers);
    console.log('Usuarios obtenidos:', decryptedUsers);
    
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(400).json({ message: 'Error al obtener usuarios', error });
  }
};

module.exports = {
  createUser,
  viewAllUsers,
};
