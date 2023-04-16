const db = require('../db');
const {
    readSQL
} = require('../util/index')

function createMenu(req, res, next) {
    // `name`,`href`,`menu_type`,`description`,`depth`,`admin`,`parent`,`custom`,`custom_comment`
    let name = req.body.name;
    let href = req.body.href;
    let menu_type = req.body.menu_type;
    let description = req.body.description;
    let depth = 0;
    let admin = 0;
    let parent = 0;
    let custom = req.body.custom;
    let custom_comment = req.body.custom_comment;
    let param = [
        name,
        href,
        menu_type,
        description,
        depth,
        admin,
        parent,
        custom,
        custom_comment
    ]
    db.query(readSQL('menu/insert.sql'), param, (err, rows) => {
        if (err) throw err;
        req.createName = name;
        next();
    })

}

module.exports = createMenu