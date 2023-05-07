const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
// const saltRounds = 10 // 암호화 처리하는 속도인가봄
const cookieParser = require('cookie-parser');
const {
    auth
} = require('../middleware/auth');

const {
    readSQL,
    saltRounds,
} = require('../util');

router.use(cookieParser());

router.post('/signup', (req, res) => {
    const param = Object.values(req.body);
    param.push(0); // add role
    const id = param[0]
    let sql = `
        SELECT * 
        FROM users 
        WHERE id=?
    `
    db.query(sql, id, async (err, rows, fileds) => {
        if (err) throw err;
        let result

        if (rows.length >= 1) {
            result = {
                signUp: false,
                errType: 'ID overlap'
            }
        } else {
            result = {
                signUp: true
            }
            bcrypt.hash(param[1], saltRounds, (err1, hash) => {
                if (err1) throw err1;
                param[1] = hash;
                db.query(readSQL('user/insert.sql'), param, (err2, rows2) => {
                    if (err2) throw err2;
                });
            });
        }

        await res.status(200).json(result)
    });
});

router.post('/login', (req, res) => {
    const id = req.body.id;
    const password = req.body.password;
    let param = [
        id,
        password
    ];
    var sql = `
        SELECT *
        FROM users 
        WHERE id=?
    `;
    db.query(sql, param, (err, rows, fileds) => {
        if (err) throw err;
        if (rows.length === 0) {
            return res.status(200).json({
                login: false,
                message: 'ID no exit'
            })
        }

        var match = bcrypt.compareSync(param[1], rows[0].password);
        if (match) {
            let loginToken = Math.floor(Math.random() * 100000).toString() // token 생성
            loginToken = bcrypt.hashSync(loginToken, 3) + '/id=' + rows[0].id

            // cookie token 저장
            res.cookie(`x_token`, loginToken, {
                expries: new Date(),
                path: '/'
            })

            //db에 token 저장
            sql = `
                UPDATE users 
                SET login_token=? 
                WHERE id=?
            `;
            param = [
                loginToken,
                id
            ];
            db.query(sql, param, (err1) => {
                if (err1) throw err1;
                sql = `SELECT * FROM users WHERE id=?`;
                db.query(sql, [id], (err2, rows) => {
                    if (err2) throw err2
                    res.status(200).json({
                        login: true,
                        data: rows[0]
                    })
                })
            })

        } else
            res.status(200).json({
                login: false,
                message: 'PW error'
            })

    });
});

router.post('/logout', async (req, res) => {
    const id = req.body.id;
    let sql = `
        SELECT * 
        FROM users
        WHERE id=?
    `;
    let param = id
    db.query(sql, param, (err) => {
        if (err) throw err;

        sql = `
            UPDATE users 
            SET login_token=null 
            WHERE id=? 
        `;
        param = id
        db.query(sql, param, (err1) => {
            if (err1) throw err1;
            res.status(200).json({
                login: false,
                data: null,
            })
        })
    })
})

router.post('/edit', (req, res) => {
    var sql = `
        UPDATE users 
        SET password=?, phone=?, email=?
        WHERE id=?
    `;
    let param = [
        req.body.password,
        req.body.phone,
        req.body.email,
        req.body.id
    ]
    let result;
    bcrypt.hash(param[0], saltRounds, (err, hash) => {
        if (err) throw err;
        param[0] = hash;

        db.query(sql, param, (err1) => {
            if (err1) throw err1;
            sql = `SELECT * FROM users WHERE id=?`;
            db.query(sql, param[param.length - 1], (err2, rows) => {
                if (err2) throw err2
                result = {
                    edit: true,
                    login: true,
                    data: rows[0],
                }
                res.status(200).json(result);
            })
        });
    });
});

router.post('/delete', (req, res) => {
    let sql = `
        DELETE FROM users
        WHERE id=?
    `
    let param = [
        req.body.id
    ]
    db.query(sql, param, (err) => {
        if (err) throw err;
        res.status(200).json({
            delete: true,
        })
    })
})

module.exports = router;