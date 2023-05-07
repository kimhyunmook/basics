const express = require('express');
const router = express.Router();
const db = require('../db');
const fs = require('fs');
const createMenu = require('../middleware/createMenu');
const {
    readSQL
} = require('../util');

router.post('/createboard', createMenu, (req, res) => {
    db.query(readSQL('board/create.sql', {
        createName: req.createName
    }), [], (err) => {
        if (err) throw err;
    })
    res.send("게시판 생성");
});

router.post('/settingmenu', (req, res) => {
    let param = [];
    console.log(req.body);
    db.query(readSQL('/menu/select.sql'), param, (err, rows) => {
        if (err) throw err;
        let list = []
        rows.map(el=>{
            list.push(el); 
        })
        res.status(200).json(list)
    })
})

module.exports = router