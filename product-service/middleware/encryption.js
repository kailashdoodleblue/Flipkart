const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const secretKey = "5f4dcc3b5aa765d61d8327deb882cf99fffa1fa3ed0285b0010b8141e8d9a8d1"

const encrypt = (text) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
        iv: iv.toString('hex'),
        content: encrypted
    };
};

const decrypt = (hash) => {
  if (!hash || !hash.iv || !hash.content) {
      throw new Error('Invalid encryption data');
  }
  
  const iv = Buffer.from(hash.iv, 'hex');
  const encryptedText = Buffer.from(hash.content, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

module.exports = {
    encrypt,decrypt
};






// const crypto =require('crypto') 
// const config = require ('../config/config')

// const { secret_key, secret_iv, ecnryption_method } = config

// if (!secret_key || !secret_iv || !ecnryption_method) {
//   throw new Error('secretKey, secretIV, and ecnryptionMethod are required')
// }

// // Generate secret hash with crypto to use for encryption+
// const algorithm = 'aes-256-cbc';
// const secretKey = "5f4dcc3b5aa765d61d8327deb882cf99fffa1fa3ed0285b0010b8141e8d9a8d1"
// // const key = "5f4dcc3b5aa765d61d8327deb882cf99fffa1fa3ed0285b0010b8141e8d9a8d1"
// // const encryptionIV = crypto
// //   .createHash('sha512')
// //   .update(secret_iv)
// //   .digest('hex')
// //   .substring(0, 16)

// // Encrypt data
// module.exports=function encryptData (text)  {
//   const iv = crypto.randomBytes(16);
//   const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
//   let encrypted = cipher.update(text, 'utf8', 'hex');
//   encrypted += cipher.final('hex');
//   return {
//       iv: iv.toString('hex'),
//       content: encrypted
//   };
// };

// // Decrypt data
// module.exports= function decryptData(encryptedData) {
//   const buff = Buffer.from(encryptedData, 'base64')
//   const decipher = crypto.createDecipheriv(ecnryption_method, key, encryptionIV)
//   return (
//     decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
//     decipher.final('utf8')
//   ) // Decrypts data and converts to utf8
// }
