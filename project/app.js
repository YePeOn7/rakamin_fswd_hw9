const pool = require('./config/db_config.js');
const route = require('./router/index.js');
const express = require('express');
const errorHandler = require("./middlewares/errorHandler.js");
const morgan = require("morgan");

const app = express();

// Test Ping
app.get("/", (req, res) => {
    res.send("ok");
});

app.use(morgan("combined"));
app.use(route);
app.use(errorHandler);

app.use((req, res) => {
    res.status(404).send("Not Found");
});

app.listen(3000);