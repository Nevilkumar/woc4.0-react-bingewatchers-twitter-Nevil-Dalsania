import {db} from "../../firebaseConfig";


export const createComment = (tweetId, data) => async(dispatch, getState) => {

    try {
        const user = getState().auth.userInfo;
        const { uid } = user;
        let content = {
            comment: data,
            uid: uid,
            tweetId: tweetId,
            createdAt: Date.now(),
        }

        const res = await db.collection('Comments').add(content);
        const { id } = res;

        dispatch({ type: 'CREATE_COMMENT', data: { ...content, commentId: id}});  

    } catch (error) {
        console.log(error);
    }

}


export const fetchComment = () => async(dispatch, getState) => {

    try {
        let allComments = [];
        const res = await db.collection("Comments").orderBy('createdAt', 'desc').get();
        
        res.forEach((p) => {
            allComments.push({ ...p.data(), commentId: p.id });
        });

        dispatch({ type: 'FETCH_COMMENT', data: allComments}); 

    } catch (error) {
        console.log(error);
    }

}