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
        console.log(tmp)

        db.collection("users").doc(tmp).update({photoURL: photoURL})

        dispatch({ type: 'UPLOAD_DP', data: {id: tmp, photoURL: photoURL}});  

    } catch (error) {
        console.log(error);
    }

}

