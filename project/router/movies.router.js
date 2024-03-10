const pool = require('../config/db_config.js');
const router = require('express').Router();
const tools = require("../etc/tools.js");
const auth = require("../middlewares/auth.js");

const moviesTable = "movies"

router.get("/", async (req, res) => {
    const pagination = await tools.pagination(req.query, moviesTable);

    const query = `
    SELECT * FROM ${moviesTable}
    ${pagination.query}
    `
    pool.query(query, (err, result) => {
        if(err){
            res.status(500).json({message: "Internal Server Error"});
        }
        else{
            res.status(200).json({
                data: result.rows,
                pageInfo: pagination.pageInfo
            });
        }
    })
});

router.get("/:id", (req, res) => {
    pool.query(`SELECT * FROM ${moviesTable} WHERE id=$1`, [req.params.id], (err, result) => {
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

router.post("/", auth.authorization, (req, res) => {
    const title = req.query.title;
    const genres = req.query.genres;
    const year = req.query.year;

    if( !title || !genres || !year ){
        res.status(400).json({message: "Missing parameter(s)"});
        return;
    }
    
    pool.query(`
    INSERT INTO ${moviesTable}(title, genres, year)
    VALUES($1, $2, $3)`,
    [title, genres, year], (err, result) => {
        if(err){
            res.status(500).json({message: "Internal server Error"});
        }
        else{
            res.status(201).json({message: "Data has been added succesfully"});
        }
    })
});

router.put("/", auth.authorization, (req, res) => {
    const title = req.query.title;
    const genres = req.query.genres;
    const year = req.query.year;
    const id = req.query.id;

    if( !title || !genres || !year || !id){
        res.status(400).json({message: "Missing parameter(s)"});
        return;
    }
    
    pool.query(`SELECT * FROM ${moviesTable} WHERE id=$1`, [id], (err, result) =>{
        if(err){
            res.status(500).json({message: "Internal Server Error"});
        }
        else if(result.rowCount == 0){
            res.status(404).json({message: `There is no data with id: ${id}`});
        }
        else{
            pool.query(`
            UPDATE ${moviesTable}
            SET title=$1, genres=$2, year=$3
            WHERE id=$4`,
            [title, genres, year, id], (err, result) => {
                if(err){
                    res.status(500).json({message: "Internal server Error"});
                }
                else{
                    res.status(200).json({message: "Data has been updated succesfully"});
                }
            })
        }
    })

});

router.delete("/", auth.authorization, (req, res) => {
    const id = req.query.id;

    pool.query(`SELECT * FROM ${moviesTable} WHERE id=$1`, [id], (err, result) =>{
        if(err){
            res.status(500).json({message: "Internal Server Error"});
        }
        else if(result.rowCount == 0){
            res.status(404).json({message: `There is no data with id: ${id}`});
        }
        else{
            pool.query(`
            DELETE FROM ${moviesTable}
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