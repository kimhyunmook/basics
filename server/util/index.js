const fs = require('fs');

function readSQL(fileName, config) {
    let file = fs.readFileSync(`server/mysql/sql/${fileName}`, {
        encoding: 'utf8',
        flag: 'r'
    })
    if (config !== undefined) {
        file = file.split("?");
        file = file[0] + config.createName + file[1];
    }
    return file
}

module.exports = {
    readSQL
}