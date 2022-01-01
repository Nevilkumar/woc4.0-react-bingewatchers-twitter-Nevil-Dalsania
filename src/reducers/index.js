import authReducer from "./authReducer";
import tweetsReducer from "./tweetsReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    post: tweetsReducer
})

export default rootReducer;