const ModelUsers = require('../models/Users');
const { encrypt, decrypt } = require('../utils/crypto');

const createUser = async (req, res) => {
    try {
        const user = await ModelUsers.createUser()
        res.status(201).json(user)
        console.log("Usuario creado:", user);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el usuario', error })
    }
}

const viewAllUsers = (req, res) => {
    ModelUsers
        .viewAll()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(400).json({ message: 'Error al encontrar los usuarios', error })
        })
}

const findById = async (req, res) => {

    try {
        const { idUsers } = req.params;
        const user = await ModelUsers.findById(idUsers);
        console.log(user);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const decryptedUser = {
            ...user,
            address: decrypt(user.address),
            phone_num: decrypt(user.phone_num),
            rfc: decrypt(user.RFC)
        }
        res.status(200).json(decryptedUser);
    } catch (error) {
        res.status(400).json({ message: 'Error al encontrar el usuario', error });
        console.log('Error en el contralador findById:', error);
    }
};

const updateUser = async (req, res) => {
    const { idUsers } = req.params;
    const { address, phone_num, rfc, ...rest } = req.body; // rest puede incluir first_name, last_name, birthday, etc.

    try {
        const user = await ModelUsers.findById(idUsers);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        console.log('Usuario antes de actualizar:', user);

        const encryptedAddress = address ? encrypt(address) : undefined;
        const encryptedPhone = phone_num ? encrypt(phone_num) : undefined;
        const encryptedRFC = rfc ? encrypt(rfc) : undefined;

        const dataToUpdate = {
            ...rest,
            ...(encryptedAddress && { address: encryptedAddress }),
            ...(encryptedPhone && { phone_num: encryptedPhone }),
            ...(encryptedRFC && { rfc: encryptedRFC }),
        };

        console.log('Datos cifrados a actualizar:', dataToUpdate);

        const updatedUser = await ModelUsers.updateUser(idUsers, dataToUpdate);

        console.log('Usuario actualizado en BD:', updatedUser);

        const decryptedUser = {
            ...updatedUser,
            address: updatedUser.address ? decrypt(updatedUser.address) : null,
            phone_num: updatedUser.phone_num ? decrypt(updatedUser.phone_num) : null,
            rfc: updatedUser.rfc ? decrypt(updatedUser.rfc) : null,
        };

        const { created_at, password, token, ...userSafe } = decryptedUser;

        return res.status(200).json(userSafe);
    } catch (error) {
        console.error('Error en updateUser:', error);
        return res.status(400).json({ message: 'Error al actualizar el usuario', error });
    }
};


module.exports = {
    createUser,
    viewAllUsers,
    findById,
    updateUser
}
