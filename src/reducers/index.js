import authReducer from "./authReducer";
import tweetsReducer from "./tweetsReducer";
import userReducer from './userReducer';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    post: tweetsReducer,
    user: userReducer,
})

export default rootReducer;