import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { BsTwitter } from 'react-icons/bs';

import './Navbar.css';
import { logout } from '../../Store/Actions/AuthAction';
import { MdOutlineScreenLockRotation } from 'react-icons/md';

const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const user = useSelector((state) => state.auth.userInfo);

    const [mobileView, setMobileView] = useState(false);

    const handleLogout = () => {
        dispatch(logout(navigate));
    }

    useEffect(() => {
        setMobileView(false);
    }, [location]);
    
    
    let profileLink = "/profile/" + user?.uid;
    return (
        
        <>
        <div className='navbar'>
            <div className="topnav" id="myTopnav">

                <NavLink className="logo-heading" to="/" id="active"><BsTwitter className='twitter-icon' /><b>Twitter</b></NavLink>

                <div className={mobileView ? "menu-toggle is-mobile-active" : "menu-toggle"} id="mobile-menu" onClick={() => setMobileView((prev) => !prev)}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>

                <div className={mobileView ? "link-container mobile-active" : "link-container"} >
                    <NavLink className={({ isActive }) => isActive? "active nav-links": 'nav-links'} to="/" >Home</NavLink>

                    {
                        user ? (
                        <>
                            <NavLink className="nav-links" to={profileLink} >Profile</NavLink>
                            <button className='nav-links logout-btn' onClick={handleLogout}>Logout</button>
                        </>
                        ) : (
                    
                        <>
                            <NavLink className="nav-links" to="/login" >Login</NavLink>
                            <NavLink className="nav-links" to="/signup">Signup</NavLink>
                        </>
                        )
                    }
                    
                </div>

            </div>
        </div>
        </>
        

    )
}

export default Navbar
