
const UserReducer = (state = [], action) => {

    switch(action.type){
        case 'FETCH_USERS':
            return action.data;
        default:
            return state;
    }
}

export default UserReducer
