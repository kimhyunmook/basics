import configJson from './site_config.json';

/** board 타겟 값 */
export function board_target() {
    let i, k
    let board = configJson.board.target;
    let header = configJson.header;
    const path = window.location.href.split('/');

    let targetName = board.map((el,index)=>{
        if(el.href.split('/')[2] === path[4]) {
            return el.name;
        }
    })

    for (i = 0; i < targetName.length; i++) {
        if (targetName[i] !== undefined) {
            for (k = 0; k < board.length; k++) {
                if(targetName[i] === board[k].name) {
                    return board[k].type.division_type
                }
            }
        }
    }
}