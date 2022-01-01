
const authReducer = (state = null, action) => {
    switch(action.type){
        case 'SIGN_IN':
        case 'SIGN_UP':
            return action.data;
        case 'LOGOUT':
            return null;
        case 'SET_USER':
            return action.data;
        default:
            return state;
    }
}

export default authReducer
