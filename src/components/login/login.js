import React, { useState, useEffect } from 'react'
import './login.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, signIn } from '../../actions/authAction';
import { useNavigate } from 'react-router';
import { CircularProgress } from '@material-ui/core';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const error = useSelector(state => state.auth.error);

    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(signIn(details, navigate));
        setLoading(false);
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
            <input type="email" value={details.email} name="email" placeholder="Email" onChange={handleChange} />

            <label>Password</label>
            <input type="password" value={details.password} name="password" placeholder="Password" onChange={handleChange} />

            <button>Login</button>
            <p className="links">Don't Have An Account? <Link to='/signup'>Click Here</Link></p>
        </form>
    </div>

    )
}

export default Login
