
let initial_state = {
    userInfo: null,
    error: null,
    loading: false,
};

const AuthReducer = (state = initial_state, action) => {
    switch(action.type){
        case 'SIGN_IN':
        case 'SIGN_UP':
            return {...state, userInfo: action.data, loading:false};
        case 'LOGOUT':
            return {...state, userInfo: null};
        case 'SET_USER':
            return {...state, userInfo: action.data};
        case 'CLEAR_ERROR':
            return {...state, error:null}
        default:
            return state;
    }
}

export default AuthReducer
