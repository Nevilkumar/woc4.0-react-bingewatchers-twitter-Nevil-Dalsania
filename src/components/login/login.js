import React, { useState } from 'react'
import './login.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signIn } from '../../actions/authAction';
import { useNavigate } from 'react-router';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [details, setDetails] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setDetails({
            email: '',
            password: ''
        });
        dispatch(signIn(details, navigate));
    }

    const handleChange = (e) => {
        setDetails({
            ...details,
            [e.target.name]:e.target.value
        })
    }

    return (
    
 
    <div className='login'>
        <form onSubmit={handleSubmit}>
            <h3>Login</h3>

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
