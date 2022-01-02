import {auth, db} from "../firebaseConfig";

export const signIn = (data, navigate) => async(dispatch, getState) => {
    try {
        
        const res = await auth.signInWithEmailAndPassword(data.email, data.password);
        dispatch({ type: 'SIGN_IN', data:res.user});  
        getState().auth.error = null;
        navigate('/');

    } catch (error) {
        console.log(error);
        getState().auth.error = "Invalid Credentials";
        navigate('/login')
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
        getState().user.push({
            uid: user.uid,
            name: data.username,
            email: data.email,
        })
        console.log(getState().user);
        dispatch({type:'SIGN_UP', data:user});
        getState().auth.error = null;
        navigate('/');

    } catch (error) {
        console.log(error);
        getState().auth.error = "Sign Up Failed! Try Again";
        navigate('/signup');
    }
}

export const setUser = (user, navigate) => async(dispatch, getState) => {
    try {
        dispatch({type:'SET_USER', data:user});
    } catch (error) {
        console.log(error);
    }
}

export const clearError = () => async(dispatch, getState) => {
    try {
        dispatch({type:'CLEAR_ERROR'}); 
    } catch (error) {
        console.log(error);
    }
}