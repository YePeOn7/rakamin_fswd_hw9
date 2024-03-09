const pool = require("../config/db_config.js")
const jwt = require("../lib/jwt.js");
const bcrypt = require("../lib/bcrypt.js")
const express = require("express");

class AuthController{
     static async register(req, res, next){
        const email = req.query.email;
        const gender = req.query.gender;
        const password = req.query.password;
        const role = req.query.role;

        const hashedPassword = bcrypt.hashPassword(password);

        try{
            const inserSQL = `
                INSERT INTO users(email, gender, password, role)
                VALUES($1, $2, $3, $4)
                RETURNING *`

            const result = await pool.query(inserSQL,[email, gender, hashedPassword, role]);

            res.status(201).json(result.rows[0]);

            // res.send(`test register ${email} ${gender} ${password} ${role}`);
        }
        catch(err){
            console.log("Error woy");
            next(err)
        }
     }

     static async login(req, res, next){
        try {
            const email = req.query.email;
            const password = req.query.password;

            let query = `
            SELECT * FROM users
            WHERE email = $1`;

            const result = await pool.query(query, [email]);

            if(result.rowCount === 0){
                throw {name: "invalid Credential"};
            }
            else{
                const user = result.rows[0];
                
                if(bcrypt.comparePassword(password, user.password)){
                    const accessToken = jwt.generateToken({
                        id: user.id,
                        email: user.email,
                        role: user.role,
                    });

                    res.status(200).json({
                        message: "Login succesfully",
                        accessToken
                    });
                }
                else{
                    throw {name: "Invalid Credential"};
                }
            }
        } 
        catch (error) {
            console.log("Error on AuthController!!");
            next(error);
        }
        
     }
}

module.exports = AuthController;