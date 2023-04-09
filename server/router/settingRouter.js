const express = require('express');
const router = express.Router();
const fs = require('fs');
const mysql = require('mysql');
const {
    readSQL
} =require('../util')

router.get('/down', (req, res) => {
    const envConfirm = fs.existsSync('.env');
    res.status(200).json({
        Download: envConfirm
    });
})

router.post('/dbinfo', (req, res) => {
    // NO FIX
    const dbinfo = `DB_HOST=${req.body.host}
DB_USER=${req.body.user}
PORT=3306
DB_PW=${req.body.password}
DB=${req.body.db}`;

    const insertDB = mysql.createConnection({
        host: req.body.host,
        user: req.body.user,
        port: "3306",
        password: req.body.password,
        database: req.body.db
    })
    insertDB.query('SHOW DATABASES', [], (err, rows) => {
        if (err) throw err;

        // fs.writeFile('.env', dbinfo, (err) => {
        //     if (err) throw err;
        //     res.send('success')
        // })

        // // create users table
        // insertDB.query(readSQL('user/create.sql'), [], (err1) => {
        //     if (err1) throw err1;

        //     //create Admin 
        //     let admin = ['admin', req.body.password, '-', '-', 'admin', '-', 1]
        //     insertDB.query(readSQL('user/insert.sql'), admin, (err2) => {
        //         if (err2) throw err2
        //     })
        // })
        
        // // create basic board
        // insertDB.query(readSQL('board/create.sql',{createName:"board_basic"}), [], (err1,row) => {
        //     if (err1) throw err1;
        // })

        // create menulist
        // insertDB.query()
    })
})

module.exports = router;
