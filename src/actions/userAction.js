import {db} from "../firebaseConfig";

export const fetchUsers = () => async(dispatch, getState) => {

    try {
        let allUsers = [];
        const res = await db.collection("users").get();
        
        res.forEach((p) => {
            allUsers.push(p.data());
        });

        dispatch({ type: 'FETCH_USERS', data: allUsers});  

    } catch (error) {
        console.log(error);
    }

}
