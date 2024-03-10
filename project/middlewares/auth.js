const jwt = require("../lib/jwt.js");
const pool = require("../config/db_config.js")

async function authenticate(req, res, next){
    try{
        // console.log("From authenticate function");
        if(req.headers.authorization){
            const accessToken = req.headers.authorization.split(" ")[1];
            // console.log(req.headers.authorization);
            // console.log(typeof accessToken);
            if(accessToken === "null") 
            {
                console.log("HERE");
                throw {name: "Unauthenticated"};
            }

            const user = jwt.verifyToken(accessToken);
    
            const query = `
            SELECT * FROM users
            WHERE id=$1`;
    
            const result = await pool.query(query, [user.id]);
    
    
            // console.log(result.rows);
            if(result.rowCount !== 0) 
            {
                const foundUser = result.rows[0];
    
                // need to be used when limit access  for a user base on the role
                req.loggedUser = {
                    id: foundUser.id,
                    email: foundUser.email,
                    role: foundUser.role
                }
    
                next();
            }
            else{
                throw {name: "Unauthenticated"};
            }
        }
        else{
            throw {name: "Unauthenticated"};
        }
    }
    catch(err){
        next(err);
    }
}

async function authorization(req, res, next){
    console.log(req.loggedUser);
    try{
        if(req.loggedUser.role === "admin") next();
        else 
        {
            console.log("Here!!!!!!");
            throw {name: "Unauthorized"};
        }
    }
    catch(err){
        next(err);
    }
}

module.exports = {
    authenticate,
    authorization
};