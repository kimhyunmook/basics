const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'dev01',
    port: 3306,
    password: 'sodds1346!',
    database: 'dev01'
});

module.exports = db

/** MySQL USER 설정
 * @SQL접속방법 mysql -h localhost -u root -p password
 * @유저생성 CREATE USER 'userID'@'%' IDENTIFIED WITH MYSQL_NATIVE_PASSWORD BY 'password';
 * @권한부여 GRANT ALL PRIVILEGES ON 'database name'.* to 'userID'@'%' WITH GRANT OPTION; flush privileges;
 */