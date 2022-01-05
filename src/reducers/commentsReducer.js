
const commentsReducer = (state = [], action) => {

    switch(action.type){
        case 'CREATE_COMMENT':
            return [action.data, ...state];
        case 'FETCH_COMMENT':
            return action.data;
        default:
            return state;
    }
}

export default commentsReducer
