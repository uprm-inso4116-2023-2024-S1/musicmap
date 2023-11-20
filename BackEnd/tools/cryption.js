const bcrypt = require("bcryptjs");

async function encrypt(password){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
  
    return hashedPassword;
}

module.exports = encrypt;

