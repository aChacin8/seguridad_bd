const ModelAdmin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { hashEmail } = require('../utils/hash');

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey';

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await ModelAdmin.findByEmail(hashEmail(email.toLowerCase()));
        if (!admin) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id_admin: admin.id_admin, email: admin.email }, SECRET_KEY, { expiresIn: '8h' });
        await ModelAdmin.updateToken(admin.id_admin, token);

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
            first_name: admin.first_name,
            last_name: admin.last_name
        });
    } catch (error) {
        console.error('Error en loginAdmin:', error);
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};

module.exports = {
    loginAdmin
};
