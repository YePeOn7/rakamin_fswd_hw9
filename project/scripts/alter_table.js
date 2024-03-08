const pool = require('../config/db_config.js');
const fs = require('fs')

const query = fs.readFileSync("./id_auto_increment.sql", {encoding: 'utf-8'});
console.log(query);

pool.query(query, (err,res) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("process has been done successfuly");
    }
})