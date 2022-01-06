
const UserReducer = (state = [], action) => {

    switch(action.type){
        case 'FETCH_USERS':
            return action.data;
        case 'UPLOAD_DP':
            return state.map((p) => p.id === action.data.id ? {...p, photoURL: action.data.photoURL } : p);
        case 'FOLLOWUNFOLLOW':
            state = state.map((p) => p.uid === action.data.id1 ? {...p, following : action.data.following} : p);
            state = state.map((p) => p.uid === action.data.id2 ? {...p, followers: action.data.followers } : p);
            return state;
        default:
            return state;
    }
}

export default UserReducer
