const express = require('express');
const router = express.Router();
const db = require('../db');
const fs = require('fs');
const upload = require('../middleware/upload');

/** uploads 폴더 생성 */
try {
    fs.readdirSync('client/public/uploads');
} catch (err) {
    console.error('uploads 폴더가 없습니다. 폴더를 생성합니다.')
    fs.mkdirSync('client/public/uploads');
}

router.get('/list/:type/:name/:page', (req, res) => {
    const page = req.params.page
    let sql = `
        SELECT * 
        FROM ${req.params.name}
        WHERE w_comment=0 ORDER BY w_num DESC
    `;

    db.query(sql, [], (err, rows) => {
        if (err) throw err;

        let list = [];
        let start = 0;
        let listLength;

        switch (req.params.type) {
            case 'gallery':
                listLength = 6;
                break;
            default:
                listLength = 10;
                break;
        }

        let i;
        let page_navigation = Math.ceil(rows.length / listLength)
        let pageArray = [];
        
        for (i = 0; i < page_navigation; i++) {
            pageArray.push(i + 1);
        }
        
        let last = listLength * page;
        if (page >= 2) start = listLength * (page - 1);
        for (i = start; i < last; i++) {
            if (rows[i] !== undefined) 
                if(rows[i].w_comment === 0) {
                    list.push(rows[i])
                }
        }

        res.status(200).json({
            array: list,
            page: pageArray
        })
    })
})

router.post('/:name/galleryWrite', upload('client/public/uploads/','file'), (req, res) => {
    let sql = '';
    let param = [];
    sql = `
            INSERT INTO ${req.params.name} (subject, content, time, img, id, board_type) 
            VALUE (?,?,?,?,?,?)
        `;

    let file
    if (req.file !== undefined) {
        file = req.file.path.split('\\');
        file = file[file.length - 1];
    }
    param = [
        req.body.subject,
        req.body.content,
        req.body.time,
        file,
        req.body.id,
        req.body.board_type
    ];
    db.query(sql, param, (err, rows) => {
        if (err) throw err;
        res.status(200).json({
            create: true,
            board_type: 'gallery'
        })
    })
})

router.post('/:name/write', (req, res) => {
    let param = [];
    let num = 0;
    
    let sql2 = `
       SELECT * FROM ${req.params.name} WHERE w_comment=0;
    `
    db.query(sql2,[],(err2, rows2)=> {
        if (err2) throw err;
        num = rows2.length + 1;
        let sql = `
                INSERT INTO ${req.params.name} (w_num, w_parent, subject, content, w_time, user_id, board_type) 
                VALUE (?,?,?,?,?,?,?)
            `;
        param = [
            num,
            num,
            req.body.subject,
            req.body.content,
            req.body.w_time,
            req.body.user_id,
            req.body.board_type
        ]
    
        db.query(sql, param, (err, rows) => {
            if (err) throw err;
           
            res.status(200).json({
                create: true,
                board_type: req.body.board_type
            })
        })
    })
    
  
})


router.post('/list/:name/contents/:w_num', (req, res) => {
    const w_num = req.params.w_num
    let sql = `
        SELECT *
        FROM ${ req.params.name }
        WHERE w_num=?
    `;

    db.query(sql, [w_num], (err, rows) => {
        if (err) throw err;
        res.send(rows[0])
    })
})

router.post('/list/:name/modify/:w_num', (req, res) => {
    let sql = `
        UPDATE ${req.params.name}
        SET subject=?, content=? 
        WHERE w_num=${req.params.w_num} AND w_id=${req.body.w_id};
    `;

    param = [
        req.body.subject,
        req.body.content
    ];

    db.query(sql, param, (err, rows) => {
        if (err) throw err
        res.send('수정')
    });
});


router.delete('/list/:name/delete/:w_num', (req, res) => {
    let sql = `
        DELETE FROM ${req.params.name}
        WHERE w_num=${req.params.w_num}
    `
    db.query(sql, [], (err) => {
        if (err) throw err;
        let sql2 = `ALTER TABLE ${req.params.name} AUTO_INCREMENT=1;`;
        db.query(sql2,[],(err1)=>{
            if (err1) throw err1;
            let sql3= `SET @COUNT = 0;`
            db.query(sql3,[],(err2)=>{
                if (err2) throw err2;
                let sql4= `UPDATE ${req.params.name} SET w_num=@COUNT:=@COUNT+1 WHERE w_comment=0;`
                db.query(sql4, [],(err3)=>{
                    if (err3) throw err3;
                });
            });
        });
        res.send('삭제');
    });
});

router.post('/:name/reply/:w_num', (req, res)=>{
    let sql = `
        INSERT INTO ${req.params.name} 
        (w_num, w_parent, subject, content, w_comment, w_time, user_id, board_type) 
        VALUE 
        (?,?,?,?,?,?,?,?);
    `;

    let param = [
        req.params.w_num,
        req.params.w_num,
        "",
        req.body.content,
        req.body.w_comment + 1,
        req.body.w_time,
        req.body.user_id,
        req.body.board_type
    ]

    db.query(sql, param, (err)=>{
        if (err) throw err;
        res.status(200).json({
            reply: "success"
        })
    });
});

router.post('/list/:name/reply/:w_num',(req, res) => {
    let sql = `
        SELECT * FROM ${req.params.name}
        WHERE w_num = ? AND w_comment != 0;
    `;
    let param = [
        req.params.w_num
    ];
    db.query(sql, param, (err, rows)=>{
        if(err) throw err;
        res.status(200).json({
            type:'reply',
            array:rows
        });
    })
})


module.exports = router;