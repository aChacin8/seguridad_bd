const crypto = require('crypto');
process.loadEnvFile() 

const hashEmail = (email) => {
    return crypto.createHash('sha256').update(email).digest('hex'); 
}

const hashToken = (token) => {
    const secret = process.env.HASH_SECRET || 'tokensecret';
    return crypto.createHmac('sha256', secret).update(token).digest('hex');
};

module.exports = {
    hashEmail,
    hashToken
}