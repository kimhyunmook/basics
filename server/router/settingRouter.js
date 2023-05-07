const express = require('express');
const router = express.Router();
const fs = require('fs');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const db = require('../db');
const {
    readSQL,
    saltRounds
} = require('../util')
require('dotenv').config();

router.get('/down', (req, res) => {
    const envConfirm = fs.existsSync('.env');
    res.status(200).json({
        Download: envConfirm
    });
})

router.post('/dbinfo', async (req, res) => {
    // NO FIX
    const dbinfo = `DB_HOST=${req.body.host}
DB_USER=${req.body.user}
PORT=3306
DB_PW=${req.body.password}
DB=${req.body.db}
`;

    const initDB = mysql.createConnection({
        host: req.body.host,
        user: req.body.user,
        port: "3306",
        password: req.body.password,
        database: req.body.db
    })

    let sql = `SHOW DATABASES`;

    initDB.query(sql, [], async (err) => {
        if (err) throw err;


        // create users table
        await initDB.query(readSQL('user/create.sql'), [], (err1) => {
            if (err1) throw err1;

            //create Admin 
            bcrypt.hash(req.body.password, saltRounds, (bcr_err, hash) => {
                if (bcr_err) throw bcr_err;

                let admin = ['admin', hash, '-', '-', 'admin', '-', 1]
                initDB.query(readSQL('user/insert.sql'), admin, (err2) => {
                    if (err2) throw err2
                })
            })
        })

        // create menulist
        await initDB.query(readSQL('menu/create.sql'), [], (err1) => {
            if (err1) throw err1;
            // create basic board
            initDB.query(readSQL('board/create.sql', {
                createName: "board_basic"
            }), [], (err2) => {
                if (err2) throw err2;
                sql = `
                    INSERT INTO adm_menu 
                    (name, href, menu_type, description, depth, admin, custom, custom_comment)
                    VALUES 
                    ("관리자","/adm","adm","관리자", 0, 1, "fontawsome", "fa-unlock-keyhole"),
                    ("게시판", "/board/basic", "board", "게시판", 1, 0, "fontawsome", "fa-chalkboard")
                `
                initDB.query(sql, [], (err3) => {
                    if (err3) throw err3;
                })
            })
        })

        await fs.writeFile('.env', dbinfo, (err) => {
            if (err) throw err;
            res.send('success')
        })
    })
});



router.delete('/delete', (req, res) => {
    let sql = `SET FOREIGN_KEY_CHECKS = 0;`
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

            res.status(200).json({
                delete: "success"
            })

        })
    })
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