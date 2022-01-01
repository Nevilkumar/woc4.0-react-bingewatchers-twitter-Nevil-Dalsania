import {db} from "../firebaseConfig";

export const createTweet = (data) => async(dispatch, getState) => {

    try {
        let content = {
            tweet: data,
            createdAt: Date.now()
        }
        const user = getState().auth;
        const { uid } = user;
        const userData = await db.collection("users").where("uid", "==" ,uid).get();

        userData.forEach((p) => content = {...content, ...p.data()})

        const res = await db.collection('Tweets').add(content);
        const { id } = res;

        dispatch({ type: 'CREATE_TWEET', data: { ...content, tweetId: id}});  

    } catch (error) {
        console.log(error);
    }

}

export const fetchTweets = () => async(dispatch, getState) => {

    try {
        let allTweets = [];
        const res = await db.collection("Tweets").orderBy('createdAt', 'desc').get();

        res.forEach((p) => {
            allTweets.push({ ...p.data(), tweetId: p.id });
        });

        dispatch({ type: 'FETCH_TWEETS', data: allTweets});  

    } catch (error) {
        console.log(error);
    }

}

export const deleteTweets = (id) => async(dispatch, getState) => {

    try {
        await db.collection("Tweets").doc(id).delete();
        dispatch({ type: 'DELETE_TWEETS', data:id});  

    } catch (error) {
        console.log(error);
    }

}

export const updateTweets = (id, data) => async(dispatch, getState) => {

    try {
        
        await db.collection("Tweets").doc(id).update({tweet:data});
        
        dispatch({ type: 'UPDATE_TWEETS', data: {tweet: data, tweetId:id}});  

    } catch (error) {
        console.log(error);
    }

}