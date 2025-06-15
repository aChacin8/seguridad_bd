const ModelUsers = require('../models/Users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey"; // Clave secreta para firmar los tokens JWT
const { hashEmail, hashToken } = require('../utils/hash') 
const { encrypt, decrypt } = require('../utils/crypto');

const registerUser = async (req, res) => {
    console.log("BODY:", req.body); // Verifica el cuerpo recibido
    try {
        const { password, email, address, phone_num, rfc, ...rest } = req.body
        const hashPassword = await bcrypt.hash(password, 10)
        const hashedEmail = hashEmail(email.toLowerCase());
        const encryptedAddress = encrypt(address);
        const encryptedPhone = encrypt(phone_num);
        const encryptedRFC = encrypt(rfc);

        const token = jwt.sign(
            {
                email: hashedEmail
            },
            SECRET_KEY,
            { expiresIn: '8h' }
        );
        const hashedToken = hashToken(token);

        const user = await ModelUsers.createUser(
            {
                ...rest,
                address: encryptedAddress,
                phone_num: encryptedPhone,
                email: hashedEmail,
                password: hashPassword,
                rfc: encryptedRFC,
                token: hashedToken, 
                active: true 
            })
        res.status(201).json(user)
    } catch (error) {
        console.log('Error en registerUser:', error);
        res.status(400).json({ message: 'Error al registrar el usuario', error })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await ModelUsers.findEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            {
                id_users: user.id_users,
                email: user.email
            },
            SECRET_KEY,
            { expiresIn: '8h' }
        );

        const hashedToken = hashToken(token);
        await ModelUsers.updateToken(user.id_users, hashedToken);

        const decryptedAddress = user.address ? decrypt(user.address) : '';
        const decryptedPhone = user.phone_num ? decrypt(user.phone_num) : '';

        // Enviar respuesta al frontend
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
            first_name: user.first_name,
            last_name: user.last_name,
            address: decryptedAddress,
            phone_num: decryptedPhone
        });

    } catch (error) {
        console.error('Error en loginUser:', error);
        res.status(400).json({ message: 'Error al iniciar sesión', error });
    }
};

const getTokenByEmail = async (req, res) => {
    console.log("BODY:", req.body); // Verifica el cuerpo recibido

    const { email } = req.body;

    try {
        const user = await ModelUsers.findEmail(email); // Verifica si el email existe
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas, Usuario no encontrado' });
        }

        if (!user.token) {
            return res.status(401).json({ message: 'Credenciales inválidas, Token no encontrado' });
        }
        res.status(200).json({ message: 'Token encontrado', token: user.token });

    } catch (error) {
        res.status(400).json({ message: 'Error al obtener el token', error })
    }
}

module.exports = {
    loginUser,
    registerUser,
    getTokenByEmail
}