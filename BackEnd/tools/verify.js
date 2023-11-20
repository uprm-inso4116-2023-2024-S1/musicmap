const bcrypt = require("bcryptjs");

async function verify(password, hashedPassword){
    return(bcrypt.compare(password, hashedPassword))
}

module.exports = verify