const pool = require('../config/db_config.js');
const router = require('express').Router();
const tools = require("../etc/tools.js");

const usersTable = "users";

router.get("/", async (req, res) => {
    const pagination = await tools.pagination(req.query, usersTable);

    // console.log(pagination);

    const query = `
    SELECT * FROM ${usersTable}
    ${pagination.query}`

    pool.query(query, (err, result) => {
        if(err){
            res.json({message: "Internal Server Error"}).status(500);
        }
        else{
            res.status(200).json({
                data: result.rows,
                pageInfo: pagination.pageInfo
            });
        }
    });
})

router.get("/:id", (req, res) => {
    pool.query(`SELECT * FROM ${usersTable} WHERE id=$1`, [req.params.id], (err, result) => {
        if(err){
            res.status(500).json({message: "Internal Server Error"});
        }
        else if(result.rowCount == 0){
            res.status(404).json({message: `There is no data with id: ${req.params.id}`});
        }
        else{
            res.send(result.rows);
        }
    });
});

router.post("/", (req, res) => {  
    const email = req.query.email;
    const gender = req.query.gender;
    const password = req.query.password;
    const role = req.query.role;

    if(!email || !gender || !password || !role){
        res.status(400).json({message: "Missing parameter(s)"});
        return;
    }

    pool.query(`
        INSERT INTO ${usersTable}(email, gender, password, role)
        VALUES ($1, $2, $3, $4);`, [email, gender, password, role],
        (err, result) => {
        if(err){
            if(err.code === '23505'){
                res.status(406).json({message: `The email ${email} has been used`});
            }
            else{
                res.status(500).json({message: "Internal Server Error", error: err});
            }
        }
        else{
            res.status(201).json({message: "User created successfully"});
        }   
    });
});

router.put("/", (req, res) => {
    const id = req.query.id;
    const email = req.query.email;
    const gender = req.query.gender;
    const password = req.query.password;
    const role = req.query.role;

    if(!email || !gender || !password || !role || !id){
        res.status(400).json({message: "Missing parameter(s)"});
        return;
    }
    
    pool.query(`SELECT * FROM ${usersTable} WHERE id=${id}`, (err,result) => {
        if(err){
            res.status(500).json({message: "Internal server error"});
        }
        else if(result.rowCount == 0){
            res.status(500).json({message: `There is no data with id: ${id}`});
        }
        else{
            pool.query(`
                UPDATE ${usersTable}
                SET email=$1, gender=$2, password=$3, role=$4
                WHERE id = $5;`, 
                [email, gender, password, role, id],
                (err, result) => {
                if(err){
                    res.status(500).json({message: "Internal Server Error", err: err});
                }
                else{
                    res.status(200).json({message: "User updated successfully"});
                }   
            });
        }
    })

});

router.delete("/", (req, res) => {
    const id = req.query.id;

    pool.query(`SELECT * FROM ${usersTable} WHERE id=$1`, [id], (err, result) =>{
        if(err){
            res.status(500).json({message: "Internal Server Error"});
        }
        else if(result.rowCount == 0){
            res.status(404).json({message: `There is no data with id: ${id}`});
        }
        else{
            pool.query(`
            DELETE FROM ${usersTable}
            WHERE id=$1`,
            [id], (err, result) => {
                if(err){
                    res.status(500).json({message: "Internal server Error"});
                }
                else{
                    res.status(200).json({message: `Data with id: ${id} has been deleted succesfully`});
                }
            })
        }
    })
});

module.exports = router;