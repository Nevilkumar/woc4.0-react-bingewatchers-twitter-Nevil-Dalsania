import AuthReducer from "./AuthReducer";
import TweetReducer from "./TweetReducer";
import UserReducer from "./UserReducer";
import { combineReducers } from "redux";

const RootReducer = combineReducers({
    auth: AuthReducer,
    post: TweetReducer,
    user: UserReducer,
})

export default RootReducer;