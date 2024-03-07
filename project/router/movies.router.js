const pool = require('../config/db_config.js');
const router = require('express').Router();

router.get("/", (req, res) => {
    res.send("get movies");
});

router.post("/", (req, res) => {
    res.send("post movies");
});

router.put("/", (req, res) => {
    res.send("put movies");
});

router.delete("/", (req, res) => {
    res.send("delete movies");
});

module.exports = router;