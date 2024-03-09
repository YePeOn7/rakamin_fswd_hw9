const jwt = require('jsonwebtoken');
const SECRET_KEY = "rahasiacuy"


function generateToken(payload){
    return jwt.sign(payload, SECRET_KEY);
}

function verifyToken(token){
    try{
        return jwt.verify(token, SECRET_KEY);
    }
    catch(err){
        return false;
    }
}

module.exports = {
    generateToken,
    verifyToken
}