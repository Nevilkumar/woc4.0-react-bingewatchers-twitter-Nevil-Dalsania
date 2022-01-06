
const UserReducer = (state = [], action) => {

    switch(action.type){
        case 'FETCH_USERS':
            return action.data;
        case 'UPLOAD_DP':
            return state.map((p) => p.id === action.data.id ? {...p, photoURL: action.data.photoURL } : p);
        default:
            return state;
    }
}

export default UserReducer
