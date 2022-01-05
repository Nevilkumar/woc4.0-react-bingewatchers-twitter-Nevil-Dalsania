import {db} from "../firebaseConfig";

export const createTweet = (data) => async(dispatch, getState) => {

    try {
        let content = {
            tweet: data,
            createdAt: Date.now(),
            likes: []
        }
        const user = getState().auth.userInfo;
        const { uid } = user;
        const userData = await db.collection("users").where("uid", "==" ,uid).limit(1).get();

        userData.forEach((p) => content = {...content, ...p.data()})

        const res = await db.collection('Tweets').add(content);
        const { id } = res;

        dispatch({ type: 'CREATE_TWEET', data: { ...content, tweetId: id}});  

    } catch (error) {
        console.log(error);
    }

}