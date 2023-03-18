export default function (state = {}, action) {
    switch (action.type) {
        case 'write_board':
            return {
                ...state,
                write: action.payload
            }
        case 'galleryWrite_board' : 
            return {
                ...state,
                galleryWrite: action.payload
            }
        case 'list_board':
            return {
                ...state,
                list: action.payload
            }
        case 'look_content' : 
            return {
                ...state,
                content : action.payload
            }
      
        default:
            return state;
    }
}