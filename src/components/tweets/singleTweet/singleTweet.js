import React from 'react'
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTweets, likeTweets } from '../../../actions/tweetAction';
import moment from 'moment'
import './singleTweet.css'
import userImage from './default.png';
import { RiThumbUpFill, RiThumbUpLine } from 'react-icons/ri';



const SingleTweet = ({tweet, setCurrentId}) => {

    const dispatch = useDispatch();

    let timestamp = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(tweet?.createdAt);

    const tmp = tweet?.createdAt;
    timestamp = moment(tmp).format('MMM Do YYYY, h:mm:ss a');
    
    const user = useSelector(state => state.auth);
    

    const Likes = () => {
        return tweet.likes.find((like) => like === (user?.uid))
        ? (
            <RiThumbUpFill className="like-btn" fontSize={31} />
        ) : (
            <RiThumbUpLine className="like-btn" fontSize={31} />
        );
    };


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
            {
                user && 
                <div className='likes-comments'>
                    <div className='likes-container'>
                        <button onClick={() => dispatch(likeTweets(tweet.tweetId))}>
                            <Likes />
                        </button>

                        { tweet.likes.length>0 ?
                            <p className='likes-number'>
                                {tweet.likes.length} {tweet.likes.length === 1 ? 'Like' : 'Likes'}
                            </p>
                        :
                            <p className='likes-number'>Like</p>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default SingleTweet
