import React from 'react'
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTweets } from '../../../actions/tweetAction';
import moment from 'moment'
import './singleTweet.css'
import userImage from './default.png';

const SingleTweet = ({tweet, setCurrentId}) => {

    const dispatch = useDispatch();

    let timestamp = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(tweet?.createdAt);

    const tmp = tweet?.createdAt;
    timestamp = moment(tmp).format('MMM Do YYYY, h:mm:ss a');
    
    const user = useSelector(state => state.auth);
    
    return (
        <div className='tweet'>
            <div className='content-title'>
                <div className='profile-container'>
                    <img className='profile-image' src={userImage} alt='profile' />
                    <Link to='#'>@{tweet?.name}</Link>
                </div>
                {
                    (user?.uid === tweet?.uid) &&

                    <div>
                        <AiOutlineEdit className='admin-btn admin-edit-btn' onClick={() => setCurrentId(tweet.tweetId)} />
                        <RiDeleteBin5Fill className='admin-btn admin-delete-btn' onClick={() => dispatch(deleteTweets(tweet.tweetId))} />
                    </div>
                } 
            </div>
            <div className='content-container'>
                <p className='content'>{tweet?.tweet}</p>
                <p className='content-date'>{timestamp}</p>
            </div>
        </div>
    )
}

export default SingleTweet
