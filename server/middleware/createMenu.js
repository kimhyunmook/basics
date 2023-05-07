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
    let overlap = false;
    db.query(`SELECT * FROM adm_menu`, [], (err, rows) => {
        if (err) throw err;

        rows.map(el=>{
            if (req.body.href === el.href) {
                overlap = true;
                res.send('table overlap')
                return;
            }  
        })
        if(overlap === false) {
            db.query(readSQL('menu/insert.sql'), param, (err, rows) => {
                if (err) throw err;
                req.createName = req.body.table_name;
                next();
            })
        }
    })

}

module.exports = createMenu