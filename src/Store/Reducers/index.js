import AuthReducer from "./AuthReducer";
import CommentReducer from "./CommentReducer";
import TweetReducer from "./TweetReducer";
import UserReducer from "./UserReducer";
import { combineReducers } from "redux";

const RootReducer = combineReducers({
    auth: AuthReducer,
    post: TweetReducer,
    user: UserReducer,
    comment: CommentReducer,
})

export default RootReducer;