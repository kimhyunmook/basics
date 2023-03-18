export default function (state = {}, action) {
    switch (action.type) {
        case 'register_user':
            return {
                ...state,
                register: action.payload
            }
        case 'login_user':
            return {
                ...state,
                login: action.payload
            }
        case 'auth_user':
            return {
                ...state,
                auth: action.payload
            } 
        case 'edit_user' :
            return {
                ...state,
                edit: action.payload
            }
      
        default:
            return state;
    }
}