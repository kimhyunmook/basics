const mysql = require('mysql')
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PW,
    database: process.env.DB
});

module.exports = db

/** MySQL USER 설정
 * @SQL접속방법 mysql -h localhost -u root -p password
 * @유저생성 CREATE USER 'userID'@'%' IDENTIFIED WITH MYSQL_NATIVE_PASSWORD BY 'password';
 * @권한부여 GRANT ALL PRIVILEGES ON 'database name'.* to 'userID'@'%' WITH GRANT OPTION; flush privileges;
 */