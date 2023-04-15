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
    res.send("게시판 생성")
})


module.exports = router