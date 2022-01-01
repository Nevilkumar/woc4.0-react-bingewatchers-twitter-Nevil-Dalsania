import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signUp } from '../../actions/authAction';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import './signup.css';

const Signup = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [details, setDetails] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setDetails({
            username: '',
            email: '',
            password: ''
        });
        dispatch(signUp(details, navigate));
    }

    const handleChange = (e) => {
        setDetails({
            ...details,
            [e.target.name]:e.target.value
        })
    }

    return (
    
        <div className='signup'>
        <form onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Username</label>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} />

            <label>Email</label>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />

            <label>Password</label>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />

            <button>Sign Up</button>
            <p className="links">Already Have An Account? <Link to='/login'>Click Here</Link></p>
        </form>
        </div>
    )
}

export default Signup;
