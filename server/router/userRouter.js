const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10 // 암호화 처리하는 속도인가봄
const cookieParser = require('cookie-parser');
const {
    auth
} = require('../middleware/auth');

router.use(cookieParser());

router.post('/signUp', (req, res) => {
    const param = [
        req.body.id,
        req.body.password,
        req.body.email,
        req.body.phone,
        req.body.name,
    ];
    var sql = `
        SELECT * 
        FROM users 
        WHERE id=?
    `
    db.query(sql, param[0], (err, rows, fileds) => {
        if (err) throw err;
        let condition

        if (rows.length >= 1) {
            condition = {
                signUp: false,
                errType: 'ID overlap'
            }
        } else {
            condition = {
                signUp: true
            }
            bcrypt.hash(param[1], saltRounds, (err_, hash) => {
                if (err_) throw err_;

                sql = `
                    INSERT INTO users (id,password,email,phone,name,role) 
                    VALUES (?,?,?,?,?,0)
                    `;
                param[1] = hash;
                db.query(sql, param, (err__, rows__) => {
                    if (err__) throw err__;

                });
            });
        }

        res.status(200).json(condition)
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
        if (err) console.log(err)
        if(rows.length === 0) {
            return  res.status(200).json({
                login:false
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
            db.query(sql, param, (err_) => {
                if (err_) console.log(err_)
            })

            res.status(200).json({
                _login: true,
                token: loginToken
            })
        } else {
            res.status(200).json({
                _login: false
            })
        }
    });
});

router.post('/logout', auth, async (req, res) => {
    let cookie = req.cookies.x_token;
    let token = cookie.split('id=');
    let id = token[1];

    var sql = `
        SELECT * 
        FROM users
        WHERE id=? OR login_token=?
    `;
    var param = [
        id,
        cookie
    ]
    db.query(sql, param, (err) => {
        if (err) throw err;

        sql = `
            UPDATE users 
            SET login_token=null 
            WHERE id=? 
            AND login_token=?
        `;
        param = [
            id,
            cookie
        ]
        db.query(sql, param, (err_) => {
            if (err_) throw err_;
            res.redirect('/')
        })
    })
})

router.get('/auth', auth, (req, res) => {
    res.send({
        id: req.user.id,
        isAuth: true,
        isAdmin: req.user.role === 0 ? false : true,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone
    });
});

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
    bcrypt.hash(param[0], saltRounds, (err, hash) => {
        if (err) throw err;
        param[0] = hash;

        db.query(sql, param, (err_) => {
            if (err_) throw err_;

            res.status(200).json({
                edit: true
            });
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

        res.redirect('/')
    })
})

module.exports = router;