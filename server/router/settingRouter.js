const express = require('express');
const router = express.Router();
const fs = require('fs');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const db = require('../db');
const {
    readSQL, encryption
} = require('../util')
require('dotenv').config();

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
        let sql;

        fs.writeFile('.env', dbinfo, (err) => {
            if (err) throw err;
            res.send('success')
        })

        // create users table
        insertDB.query(readSQL('user/create.sql'), [], (err1) => {
            if (err1) throw err1;

            //create Admin 
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) throw err;
                
                let admin = ['admin', hash, '-', '-', 'admin', '-', 1]
                insertDB.query(readSQL('user/insert.sql'), admin, (err2) => {
                    if (err2) throw err2
    
                })
            })
            })

        // create menulist
        insertDB.query(readSQL('menu/create.sql'), [], (err1) => {
            if (err1) throw err1;
            // create basic board
            insertDB.query(readSQL('board/create.sql', {
                createName: "board_basic"
            }), [], (err2) => {
                if (err2) throw err2;
                sql = `
                    INSERT INTO adm_menu (name, href, menu_type, description, depth, admin, custom, custom_comment)
                    VALUES ("게시판", "/board/basic/1", "board", "게시판", 1, 0, "fontawsome", "fa-chalkboard"),
                    ("관리자","/adm","adm","관리자", 0, 1, "fontawsome", "fa-unlock-keyhole")
                `
                insertDB.query(sql, [], (err3, rows) => {
                    if (err3) throw err3;
                })
            })
        })
    })
});



router.delete('/delete', (req, res) => {
    console.log(req.body)
    let sql = `SET FOREIGN_KEY_CHECKS = 0;`
    // if (req.body.target === 'reset') {
    db.query(sql, [], (err) => {
        if (err) throw err;
        sql = `SHOW TABLES FROM ${process.env.DB}`
        db.query(sql, [], (err1, rows) => {
            if (err1) throw err1;

            rows.map((el) => {
                sql = `DROP TABLE IF EXISTS ${Object.values(el)[0]}`
                db.query(sql, [], (err3) => {
                    if (err3) throw err3
                })
            })

            fs.unlinkSync('.env', (err) => {
                if (err) throw (err)
            })

            res.send({
                delete: "success"
            })

        })
    })
    // }
})

router.post('/menu', (req, res) => {
    let sql = `
        SELECT * FROM adm_menu
    `
    db.query(sql, [], (err, rows) => {
        if (err) throw err
        res.status(200).json({
            menu: rows
        })
    })
})

module.exports = router;