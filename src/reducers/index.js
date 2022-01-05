import authReducer from "./authReducer";
import tweetsReducer from "./tweetsReducer";
import userReducer from './userReducer';
import commentsReducer from "./commentsReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    post: tweetsReducer,
    user: userReducer,
    comment: commentsReducer,
})

export default rootReducer;