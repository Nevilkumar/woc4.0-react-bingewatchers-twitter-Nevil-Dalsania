import {auth, db} from "../firebaseConfig";

export const signIn = (data, navigate) => async(dispatch, getState) => {
    try {
        
        const res = await auth.signInWithEmailAndPassword(data.email, data.password);
        dispatch({ type: 'SIGN_IN', data:res.user});  
        navigate('/');

    } catch (error) {
        console.log(error);
    }
}

export const logout = (navigate) => async(dispatch, getState) => {
    try {
        await auth.signOut();
        dispatch({ type: 'LOGOUT'});  
        navigate('/login');
    } catch (error) {
        console.log(error);
    }
}

export const signUp = (data, navigate) => async(dispatch, getState) => {
    try {

        const res = await auth.createUserWithEmailAndPassword(data.email, data.password);
        const user = res.user;
        await db.collection("users").add({
            uid: user.uid,
            name: data.username,
            email: data.email,
        });

        dispatch({type:'SIGN_UP', data:user});
        navigate('/');

    } catch (error) {
        console.log(error);
    }
}

export const setUser = (user, navigate) => async(dispatch, getState) => {
    try {
        
        dispatch({type:'SET_USER', data:user});
        
    } catch (error) {
        console.log(error);
    }
}