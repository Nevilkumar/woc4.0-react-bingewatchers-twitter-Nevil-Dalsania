import React, { useState } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import { CircularProgress } from '@material-ui/core';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import './Profile.css';
import '../TweetList/TweetList.css';
import profile from '../Images/default.png';
import SingleTweet from '../TweetList/SingleTweet/SingleTweet';
import { uploadDP } from '../../Store/Actions/UserAction';


const Profile = () => {

    const dispatch = useDispatch();
    const { profileId } = useParams();
    const posts = useSelector((state) => state.post.filter((p) => p?.uid === profileId));
    let userData = useSelector((state) => state.user.filter((p) => p?.uid === profileId))
    userData = userData[0];
    
    console.log(userData);

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
    return (
        <div className='profile'>
            <div className='personal-info'>
                <div className='image-container'>
                    <img className='main-profile-image' src={userData?.photoURL} alt="profile" />

                    <div className="box">
                        <label className='file-label'>
                            <MdCloudUpload className='file-icon' />
                            <input id="file-upload" type="file" className="profile-input-file" onChange={handleImageChange} />
                        </label>
                        <button onClick={handleImageUpload}>Update</button>
                    </div>

                </div>
                <p className='mt-p'>nevil@gmail.com</p>
                <p className='mt-p'>Nevil_268</p>
                <button className='profile-follow-btn'>Following</button>
                <div className='tweets-follower-section'>
                    <div className='tweets-follower-child-section'>
                        <p className='mt-p'>Tweets</p>
                        <p className='mt-p'>3</p>
                    </div>
                    <div className='tweets-follower-child-section'>
                        <p className='mt-p'>Followers</p>
                        <p className='mt-p'>19</p>
                    </div>
                    <div className='tweets-follower-child-section'>
                        <p className='mt-p'>Following</p>
                        <p className='mt-p'>25</p>
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
