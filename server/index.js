const express = require('express');
const port = require('../port');
const app = express();

//Router
const userRouter = require('./router/userRouter');
const boardRouter = require('./router/boardRouter');
const settingRouter = require('./router/settingRouter');
const admRouter = require('./router/admRouter');
// const xlsxUpload = require('./router/xlsxUpload');

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

app.use('/api/users', userRouter)
app.use('/api/board', boardRouter)
app.use('/api/setting',settingRouter)
app.use('/api/adm', admRouter)
// app.use('/api/upload', xlsxUpload);
app.all('*', (req, res) => {
    res.status(404).send(`<h1 style=text-align:center>ERROR - 페이지 찾을 수 없음</h1>`)
});

app.listen(port, () => {
    console.log(`server start ${port}`)
})