import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import userImage from './default.png';
import { useSelector, useDispatch } from 'react-redux';
import './UserList.css'
import { fetchUsers } from '../../actions/userAction';

const UserList = () => {

    const dispatch = useDispatch();
    const usersList = useSelector(state => state.user);
    console.log(usersList);

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
