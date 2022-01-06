import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './UserList.css'
import userImage from '../Images/default.png';
import { fetchUsers } from '../../Store/Actions/UserAction'

const UserList = () => {

    const dispatch = useDispatch();
    const usersList = useSelector(state => state.user);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch])
    
    return (
        <div className='userlist'>
            <h2>People You May Know</h2>

            {
                usersList.map((p,id) => (
                    <div key={id} className='profile-container'>
                        <img className='profile-image' src={userImage} alt='profile' />
                        <Link to='#'>@{p.name}</Link>
                        <button className='follow-btn'>Follow</button>
                    </div>
                ))
            }
        </div>
    )
}

export default UserList
