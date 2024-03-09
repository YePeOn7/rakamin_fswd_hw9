const bcrypt = require('bcrypt')

const SALT_ROUND = 10;

function hashPassword(password){
    const salt = bcrypt.genSaltSync(SALT_ROUND);
    return bcrypt.hashSync(password, salt);
}

function comparePassword(password, hashedPassword){
    return bcrypt.compareSync(password, hashedPassword);
}

module.exports = {
    hashPassword,
    comparePassword
}