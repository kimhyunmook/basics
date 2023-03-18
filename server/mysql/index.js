const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'dev01',
    port: 3306,
    password: 'sodds1346!',
    database: 'dev01'
});

const query = async (sql, values) => {
    return new Promise((resolve, reject) => pool.query(sql, values, (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(results)
        }
    }))
}

module.exports = {
    query
}