import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import './Signup.css';
import { clearError, signUp } from '../../Store/Actions/AuthAction';

const Signup = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(state => state.auth.error);

    const [details, setDetails] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(signUp(details, navigate));
    }

    const handleChange = (e) => {
        if(error)
            dispatch(clearError());
        setDetails({
            ...details,
            [e.target.name]:e.target.value
        })
    }

    useEffect(() => {
        dispatch(clearError());
    }, [])

    return (
        // <div className="login-singup-loading">
        //     <CircularProgress color='secondary' size={50} /> 
        // </div>
        <div className='signup'>
        <form onSubmit={handleSubmit}>
            <h3>Sign up</h3>
            { error && <p className='error-line'>{error}</p>}
            <label>Username</label>
            <input required type="text" value={details.username} name="username" placeholder="Username" onChange={handleChange} spellCheck="false" />

            <label>Email</label>
            <input required type="email" value={details.email} name="email" placeholder="Email" onChange={handleChange} spellCheck="false" />

            <label>Password</label>
            <input required type="password" value={details.password} name="password" placeholder="Password" onChange={handleChange} spellCheck="false" />

            <button type='submit'>Sign up</button>
            <p className="links">Already Have An Account? <Link to='/login'>Click Here</Link></p>
        </form>
        </div>
    )
}

export default Signup;
