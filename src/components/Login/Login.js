import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import './Login.css';
import { clearError, signIn } from '../../Store/Actions/AuthAction';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const error = useSelector(state => state.auth.error);

    const [details, setDetails] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(signIn(details, navigate));
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
    <div className='login'>
        <form onSubmit={handleSubmit}>
            <h3>Login</h3>
            { error && <p className='error-line'>{error}</p>}
            <label>Email</label>
            <input autoComplete="off" required type="email" value={details.email} name="email" placeholder="Email" onChange={handleChange} spellCheck="false" />

            <label>Password</label>
            <input autoComplete="off" required type="password" value={details.password} name="password" placeholder="Password" onChange={handleChange} spellCheck="false" />

            <button type='submit'>Login</button>
            <p className="links">Don't Have An Account? <Link to='/signup'>Click Here</Link></p>
        </form>
    </div>

    )
}

export default Login
