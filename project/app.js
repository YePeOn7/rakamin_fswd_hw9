const pool = require('./config/db_config.js');
const route = require('./router/index.js');
const express = require('express');

const app = express();

// Application level middle ware
app.use((req, res, next) => {
    console.log(`Time: ${Date.now()}`);
    next();
});

app.get("/", (req, res) => {
    res.send("ok");
});

pool.connect((err, res) => {
    if(err){
        console.log("Error ===> ", err);
    }
});

app.use((req, res) => {
    res.status(404).send("Not Found");
});

app.use(route);

app.listen(3000);