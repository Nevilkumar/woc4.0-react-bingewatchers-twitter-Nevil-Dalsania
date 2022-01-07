import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';


import './UserList.css'
import userImage from '../Images/default.png';
import { fetchUsers, followUnfollow } from '../../Store/Actions/UserAction'

const UserList = () => {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.userInfo);
    let id = -1;
    if(currentUser)
        id = currentUser?.uid;
    const usersList = useSelector(state => state.user.filter((p) => p.uid !== id));

    let t = useSelector(state => state.user.filter((p) => p.uid === id))
    t=t[0]?.following;

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch])
    

    const handleFollow = (profileId) => {
        dispatch(followUnfollow(profileId));
    }

    return (
        <div className='userlist'>
            <h2>People You May Know</h2>
           
            {
                
                !usersList.length ? 
                    <div className='userList-load-container'>
                        <CircularProgress color='secondary' size={60} />
                    </div>
                : 
                usersList.map((p,id) => (
                    <div key={id} className='profile-container'>
                        <img className='profile-image' src={p.photoURL} alt='profile' />
                        <Link to={`/profile/${p.uid}`}>@{p.name}</Link>
                        <button className='follow-btn' onClick={() => handleFollow(p.uid)}>
                            {
                                t && t.findIndex(x => x === p.uid) === -1 ? "Follow" : "Following"
                            }
                        </button>
                    </div>
                ))
            }
        </div>
    )
}

export default UserList
