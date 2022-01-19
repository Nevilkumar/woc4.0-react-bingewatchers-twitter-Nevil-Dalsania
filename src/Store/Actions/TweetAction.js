import {db} from "../../firebaseConfig";


export const createTweet = (tweetBody) => async(dispatch, getState) => {

    try {
        const user = getState().auth.userInfo;
        
        let content = {
            uid: user.uid,
            tweetBody: tweetBody,
            likes: [],
            comments: [],
            createdAt: Date.now(),
        }

        const newTweet = await db.collection('Tweets').add(content);

        dispatch({ type: 'CREATE_TWEET', data: { ...content, tweetId: newTweet.id}});  

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

export const deleteTweets = (tweetId) => async(dispatch, getState) => {

    try {
        await db.collection("Tweets").doc(tweetId).delete();
        dispatch({ type: 'DELETE_TWEETS', data:tweetId });  

    } catch (error) {
        console.log(error);
    }

}

export const updateTweets = (tweetId, tweetBody) => async(dispatch, getState) => {

    try {
        await db.collection("Tweets").doc(tweetId).update({ tweetBody:tweetBody });
        dispatch({ type: 'UPDATE_TWEETS', data: { tweetBody: tweetBody, tweetId: tweetId } });  

    } catch (error) {
        console.log(error);
    }

}

export const likeTweets = (tweetId) => async(dispatch, getState) => {

    try {
        const user = getState().auth.userInfo;
        const { uid } = user;

        let { likes: likesArray } = (await db.collection("Tweets").doc(tweetId).get()).data();

        const ind = likesArray.findIndex((id) => id === uid);

        if(ind===-1)
            likesArray.push(uid);
        else
            likesArray = likesArray.filter((id) => id !== uid);

        await db.collection("Tweets").doc(tweetId).update({ likes: likesArray });

        dispatch({ type: 'LIKE_TWEETS', data: { likes: likesArray, tweetId: tweetId }});  

    } catch (error) {
        console.log(error);
    }

}



export const createComment = (tweetId, commentBody) => async(dispatch, getState) => {

    try {
        const user = getState().auth.userInfo;
        const { uid } = user;

        let content = {
            uid: uid,
            commentBody: commentBody,
            createdAt: Date.now(),
        }

        let {comments: postComments} = (await db.collection("Tweets").doc(tweetId).get()).data();
        postComments.push(content);
        await db.collection("Tweets").doc(tweetId).update({ comments: postComments });
        

        dispatch({ type: 'CREATE_COMMENT', data: { postComments: postComments, tweetId: tweetId}});  

    } catch (error) {
        console.log(error);
    }

}