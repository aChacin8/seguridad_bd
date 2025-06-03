// utils/crypto.js
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const secretKey = crypto.scryptSync(process.env.CRYPTO_SECRET || 'clave-secreta', 'salt', 32); // clave segura
const ivLength = 16;

function encrypt(text) {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(encryptedText) {
  const [ivHex, encryptedData] = encryptedText.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encryptedBuffer = Buffer.from(encryptedData, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  const decrypted = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);
  return decrypted.toString('utf8');
}

<<<<<<< HEAD:backend/utils/crypto.js
module.exports = { encrypt, decrypt };
=======
module.exports = { encrypt, decrypt };
>>>>>>> 3062bf16990ab3820872015072ed1422121cb763:utils/crypto.js
