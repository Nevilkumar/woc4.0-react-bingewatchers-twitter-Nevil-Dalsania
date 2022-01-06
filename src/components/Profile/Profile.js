import React, { useState, useEffect } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import { CircularProgress } from '@material-ui/core';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import './Profile.css';
import '../TweetList/TweetList.css';
import SingleTweet from '../TweetList/SingleTweet/SingleTweet';
import { uploadDP, followUnfollow, fetchUsers } from '../../Store/Actions/UserAction';


const Profile = () => {

    const dispatch = useDispatch();
    const { profileId } = useParams();
    const posts = useSelector((state) => state.post.filter((p) => p?.uid === profileId));
    let userData = useSelector((state) => state.user.filter((p) => p?.uid === profileId)[0])
    const { uid } = useSelector((state) => state.auth.userInfo);
    const [photo, setPhoto] = useState(null);


    const handleImageChange = (e) => {
        if(e.target.files[0])
        {
            setPhoto(e.target.files[0]);
        }            
    }

    const handleImageUpload = () => {
        if(photo)
            dispatch(uploadDP(photo));
    }

    const handleFollow = () => {
        dispatch(followUnfollow(profileId));
    }
    return (
        <div className='profile'>
            <div className='personal-info'>
                <div className='image-container'>
                    <img className='main-profile-image' src={userData?.photoURL} alt="profile" />

                    {
                        uid === profileId && 

                        <div className="box">
                            <label className='file-label'>
                                <MdCloudUpload className='file-icon' />
                                <input id="file-upload" type="file" className="profile-input-file" onChange={handleImageChange} />
                            </label>
                            <button onClick={handleImageUpload}>Update</button>
                        </div>

                    }

                </div>
                <p className='mt-p'>{userData?.email}</p>
                <p className='mt-p mb-p'>{userData?.name}</p>

                {
                    uid !== profileId && 
                    <button className='profile-follow-btn' onClick={handleFollow}>Following</button>
                }
                <div className='tweets-follower-section'>
                    <div className='tweets-follower-child-section'>
                        <p className='mt-p'>Tweets</p>
                        <p className='mt-p'>{posts.length}</p>
                    </div>
                    <div className='tweets-follower-child-section'>
                        <p className='mt-p'>Followers</p>
                        <p className='mt-p'>{userData?.followers.length}</p>
                    </div>
                    <div className='tweets-follower-child-section'>
                        <p className='mt-p'>Following</p>
                        <p className='mt-p'>{userData?.following.length}</p>
                    </div>
                </div>
            </div>

            
            <div className='tweets-container'>
                {
                    !posts.length ? 
                        <div className='load-container'>
                            <CircularProgress color='secondary' size={60} />
                        </div>
                    :  
                
                    posts.map((post,id) => (
                           <SingleTweet key={id} tweet={post} />
                    )) 
                }
            </div>
        </div>
    )
}

export default Profile
