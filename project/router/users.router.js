const pool = require('../config/db_config.js');
const router = require('express').Router();

const usersTable = "users";

router.get("/", (req, res) => {
    pool.query(`SELECT * FROM users`, (err, result) => {
        if(err){
            res.json({message: "Internal Server Error"}).status(500);
        }
        else{
            res.send(result.rows);
        }
    });
});

router.post("/", (req, res) => {
    res.send("post users");
});

router.put("/", (req, res) => {
    res.send("put users");
});

router.delete("/", (req, res) => {
    res.send("delete users");
});

module.exports = router;