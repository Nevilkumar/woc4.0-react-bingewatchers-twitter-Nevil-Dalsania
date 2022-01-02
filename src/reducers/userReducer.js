
const userReducer = (state = [], action) => {

    switch(action.type){
        case 'FETCH_USERS':
            return action.data;
        default:
            return state;
    }
}

export default userReducer
