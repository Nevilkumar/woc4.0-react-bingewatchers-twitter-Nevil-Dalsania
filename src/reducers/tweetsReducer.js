
const authReducer = (state = [], action) => {

    switch(action.type){
        case 'CREATE_TWEET':
            return [action.data, ...state];
        case 'FETCH_TWEETS':
            return action.data;
        case 'DELETE_TWEETS':
            return state.filter((post) => post.tweetId !== action.data);
        case 'UPDATE_TWEETS':
            return state.map((post) => post.tweetId === action.data.tweetId ? {...post, tweet:action.data.tweet} : post);
        default:
            return state;
    }
}

export default authReducer
