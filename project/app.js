const pool = require('./config/db_config.js');
const route = require('./router/index.js');
const express = require('express');

const app = express();

app.get("/", (req, res) => {
    res.send("here");
});

pool.connect((err, res) => {
    if(err){
        console.log("Error ===> ", err);
    }
});

app.use(route);

app.listen(3000);