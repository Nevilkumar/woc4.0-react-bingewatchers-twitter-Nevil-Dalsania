import React, { useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai';
import { CgMaximizeAlt } from 'react-icons/cg';
import { RiThumbUpFill, RiThumbUpLine, RiDeleteBin6Line } from 'react-icons/ri';
import { MdModeComment } from 'react-icons/md';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'

import sample from '../../Images/sample1.jpg';
import './SingleTweet.css'
import { likeTweets } from '../../../Store/Actions/TweetAction';
import Modal from '../Modal/Modal';

const SingleTweet = ({tweet}) => {

    const dispatch = useDispatch();

    let timestamp = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(tweet?.createdAt);

    const tmp = tweet?.createdAt;
    timestamp = moment(tmp).format('MMM Do YYYY, h:mm:ss a');
    
    const user = useSelector(state => state.auth.userInfo);
    const profileUser = useSelector(state => state.user.find((p) => p?.uid === tweet?.uid))

    const [openModal, setOpenModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const Likes = () => {
        return tweet?.likes.find((like) => like === (user?.uid))
        ? (
            <RiThumbUpFill className="like-btn" fontSize={28} />
        ) : (
            <RiThumbUpLine className="like-btn" fontSize={28} />
        );
    };

    let tweetLink = "/tweet/" + tweet?.tweetId;
    let profileLink = "/profile/" + tweet?.uid;
    let editLink = "/edit/" + tweet?.tweetId;

    return (
        <>
        { openModal &&  <Modal setOpenModal={setOpenModal} deleteId={deleteId} setDeleteId={setDeleteId} />}
      
        <div className='tweet'>
            <div className='content-title'>
                <div className='profile-container'>
                    <img className='profile-image' src={profileUser?.photoURL} alt='profile' />
                    <Link to={profileLink}>@{profileUser?.name}</Link>
                </div>
                <div>
                    {
                        (user?.uid === tweet?.uid) &&

                        <>
                            <Link to={tweetLink}><CgMaximizeAlt className='admin-btn' /></Link>
                            <Link to={editLink}><AiOutlineEdit className='admin-btn admin-edit-btn' /></Link>
                            {/* <RiDeleteBin6Line className='admin-btn admin-delete-btn' onClick={() => dispatch(deleteTweets(tweet.tweetId))} /> */}
                            <RiDeleteBin6Line className='admin-btn admin-delete-btn' 
                                onClick={() => {
                                    setOpenModal(true);
                                    setDeleteId(tweet.tweetId);
                                }}
                            />
                        </>
                    } 
                </div>
            </div>
            {/* <img className='tweet-image' src={sample} alt="sample" /> */}
            <div className='content-container'>
                <p className='content'>{tweet?.tweetBody}</p>
                <p className='content-date'>{timestamp}</p>
            </div>
            {
                user && 
                <div className='likes-comments'>
                    <div className='likes-container'>
                        <button onClick={() => dispatch(likeTweets(tweet.tweetId))}>
                            <Likes />
                        </button>

                        { tweet?.likes.length>0 ?
                            <p className='likes-number'>
                                {tweet?.likes.length} {tweet?.likes.length === 1 ? 'Like' : 'Likes'}
                            </p>
                        :
                            <p className='likes-number'>Like</p>
                        }
                    </div>

                    <div className='comments-container'>
                        <Link to={tweetLink}><MdModeComment className='comment-btn' fontSize={28} /></Link>
                        <p className='comments-number'>{tweet.comments?.length}</p>
                    </div>
                </div>
            }
        </div>
        </>
    )
}

export default SingleTweet
