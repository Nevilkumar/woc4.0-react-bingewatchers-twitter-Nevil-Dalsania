import {auth, db} from "../../firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const fetchUsers = () => async(dispatch, getState) => {

    try {
        let allUsers = [];
        const res = await db.collection("users").get();
        
        res.forEach((p) => {
            allUsers.push({...p.data(), id: p.id });
        });
        
        dispatch({ type: 'FETCH_USERS', data: allUsers});  

    } catch (error) {
        console.log(error);
    }

}

export const uploadDP = (file) => async(dispatch, getState) => {

    const storage = getStorage();
    try {
        const user = getState().auth.userInfo;
        const { uid } = user;

        const fileRef = ref(storage, 'profileImages/' + uid + "." + file.name.substring(file.name.lastIndexOf('.') + 1));
        
        const snapshot = await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);

        const userData = await db.collection("users").where("uid", "==" ,uid).limit(1).get();
        let tmp;
        userData.forEach((p) => { tmp = p.id })

        db.collection("users").doc(tmp).update({photoURL: photoURL})

        dispatch({ type: 'UPLOAD_DP', data: {id: tmp, photoURL: photoURL}});  

    } catch (error) {
        console.log(error);
    }

}


export const followUnfollow = (profileId) => async(dispatch, getState) => {

    try {
        const user = getState().auth.userInfo;
        const { uid } = user;

        let userData = await db.collection("users").where("uid", "==" ,uid).limit(1).get();
        let tmpData;
        let docId;
        userData.forEach((p) => { 
            tmpData = p.data(); 
            docId = p.id; 
        })

        let userData1 = await db.collection("users").where("uid", "==" , profileId).limit(1).get();
        let tmpData1;
        let docId1;
        userData1.forEach((p) => { 
            tmpData1 = p.data(); 
            docId1 = p.id
        })
        console.log(tmpData)
        let followId = tmpData.following.findIndex((x) => x === profileId);

        if(followId===-1)
        {
            tmpData.following.push(profileId);
            tmpData1.followers.push(uid);
        }
        else
        {
            tmpData.following = tmpData.following.filter((i) => i !== profileId);
            tmpData1.followers = tmpData1.followers.filter((i) => i !== uid);

        }

        db.collection("users").doc(docId).update({following: tmpData.following.length === 0 ? [] : tmpData.following })
        db.collection("users").doc(docId1).update({followers: tmpData1.followers.length === 0 ? [] : tmpData1.followers })


        dispatch({ type: 'FOLLOWUNFOLLOW', data: {id1: uid, following: tmpData.following, id2: profileId, followers: tmpData1.followers}});  

    } catch (error) {
        console.log(error);
    }

}
