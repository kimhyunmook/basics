const express = require('express');
const port = require('../port');
const db = require('./db');
const app = express();

const userRouter = require('./router/userRouter');
const boardRouter = require('./router/boardRouter');
const xlsxUpload = require('./router/xlsxUpload');

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get('/api', (req, res) => {
    res.status(200).json({
        test: db
    })
})

app.use('/api/users', userRouter)
app.use('/api/board', boardRouter)
app.use('/api/upload',xlsxUpload);
app.all('*',(req,res)=> {
    res.status(404).send('<h1>ERROR - 페이지 찾을 수 없음</h1>')
})
// app.post('/api/users/register', (req, res, next) => {

//     const param = [
//         req.body.id,
//         req.body.password,
//         req.body.email,
//         req.body.phone,
//         req.body.name,
//     ];

//     var sql = 'INSERT INTO users (id,password,email,phone,name) VALUES (?,?,?,?,?)';

//     bcrypt.hash(param[1], saltRounds, (err, hash) => {
//         param[1] = hash;
//         console.log(param)
//         db.query(sql, param, (err1, rows, fileds) => {
//             if (err1) throw err1;

//             res.redirect('/')
//         });
//     });
// });

// app.get('/api/users/register',(req,res)=>{
//     const param = ['getTest','123456']
//     var sql = 'INSERT INTO users (`id`,`password`) VALUES (?,?)';
//     bcrypt.hash(param[1], saltRounds, (err, hash) => {
//         param[1] = hash;
//         db.query(sql, param, (err1, rows, fileds) => {
//             console.log(sql);
//             if (err1) throw err1;
//         });
//     });
// })

// app.get('/customers/:id/edit', (req, res) => {
//     var sql = 'SELECT * FROM customers';
//     conn.query(sql, (err, rows, fields) => {
//         var id = req.params.id;
//         if (id) {
//             var sql = 'SELECT * FROM customers WHERE id=?';
//             conn.query(sql, [id], (err, rows1, fields) => {
//                 if (err) throw err;

//                 res.render('edit', {
//                     customers: rows,
//                     customer: rows1[0]
//                 });
//             });
//         }
//     });
// });

// app.post('/customers/:id/edit', (req, res) => {
//     var sql = 'UPDATE customers SET name=?, email=?, phone=? WHERE id=?';
//     var name = req.body.name
//     var email = req.body.email
//     var phone = req.body.phone
//     var id = req.params.id

//     conn.query(sql,[name,email,phone,id],(err,rows,fields)=>{
//         if (err) throw err;

//         res.redirect('/customers/'+id);
//     })
// })

// app.get('/customers/:id/delete',(req,res)=>{
//     var sql = 'SELECT * FROM customers';
//     var id = req.params.id;
//     conn.query(sql,(err,rows,fields)=>{
//         var sql = 'SELECT * FROM customers WHERE id=?';
//         conn.query(sql,[id],(err,rows1,fileds1)=>{
//             if (err) throw err;

//             res.render('delete',{customers:rows,customer:rows1[0]});
//         })
//     })
// })

// app.post('/customers/:id/delete',(req,res)=>{
//     var id =req.params.id;
//     var sql = 'DELETE FROM customers WHERE id=?';
//     conn.query(sql,[id],(err,rows,fields)=>{
//         res.redirect('/customers')
//     })
// })

// app.get(['/customers', '/customers/:id'], (req, res) => {
//     var sql = "SELECT * FROM customers";
//     conn.query(sql, (err, rows, fields) => {
//         if (err) throw err;

//         var id = req.params.id
//         if (id) {
//             sql = 'SELECT * FROM customers WHERE id=?';
//             conn.query(sql, [id], (err, rows1, fields) => {
//                 if (err) throw err;

//                 res.render('view', {
//                     customers: rows,
//                     customer: rows1[0]
//                 })
//             })
//         } else {
//             res.render('view', {
//                 customers: rows
//             });
//         }
//     });
// });


app.listen(port, () => {
    console.log(`server start ${port}`)
})