const pool = require('../config/db_config.js');
const router = require('express').Router()

const moviesRouter = require('./movies.router.js');
const usersRouter = require('./users.router.js');
const authRouter = require("./auth.router.js");
const auth = require("../middlewares/auth.js");

router.use("/api/auth/", authRouter);
router.use(auth.authenticate);
router.use("/api/movies", moviesRouter);
router.use("/api/users", usersRouter);

module.exports = router;