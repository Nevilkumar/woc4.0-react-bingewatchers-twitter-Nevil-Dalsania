import React, { useEffect, useState } from 'react'
import { NavLink} from 'react-router-dom';
import './navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/authAction';
import { useNavigate } from 'react-router';
import { BsTwitter } from 'react-icons/bs';

const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth);
    // console.log(user);


    const handleLogout = () => {
        dispatch(logout(navigate));
    }

    return (
       
        <div className='navbar'>
            <header id="header">
                <div className="topnav" id="myTopnav">
                    <NavLink to="/" id="active" ><BsTwitter className='twitter-icon' /><b>Twitter</b></NavLink>
                    <div className='link-container'>
                        <NavLink className={({ isActive }) => isActive? "active": ''} to="/" >Home</NavLink>

                        {
                            user ? (
                            <>
                                <NavLink to="/profile" >Profile</NavLink>
                                <button className='logout-btn' onClick={handleLogout}>Logout</button>
                            </>
                            ) : (
                        
                            <>
                                <NavLink to="/login" >Login</NavLink>
                                <NavLink to="/signup">Signup</NavLink>
                            </>
                            )
                        }
                        
                    </div>
                </div>
            </header>
        </div>

    )
}

export default Navbar
