import React, { useState } from 'react'
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './TweetDesc.css'
import userImage from '../Images/default.png';
import sample from '../Images/sample1.jpg';
import { createComment } from '../../Store/Actions/CommentAction';
import SingleComment from './SingleComment/SingleComment';

const TweetDesc = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    let urlTweetId = id;

    const data = useSelector(state => state.post);
    const allComments = useSelector(state => state.comment.filter((p) => p.tweetId === urlTweetId));
    console.log(allComments);
    
    
    let CurrentTweet = data.find(p => p?.tweetId === urlTweetId)
    const profileUser = useSelector(state => state.user.find((p) => p?.uid === CurrentTweet?.uid))


    let profileLink = "/profile/" + CurrentTweet?.uid;

    let timestamp = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(CurrentTweet?.createdAt);

    const tmp = CurrentTweet?.createdAt;
    timestamp = moment(tmp).format('MMM Do YYYY, h:mm:ss a');


    const [cmnt, setCmnt] = useState("");
    const handleComment = () => {
        dispatch(createComment(urlTweetId, cmnt));
        setCmnt("");
    }

    return (
    <>
        <div className='single-tweet-section'>

            <div className='full-tweet'>
                <div className='tweet'>
                    <div className='content-title'>
                        <div className='profile-container'>
                            <img className='profile-image' src={profileUser?.photoURL} alt='profile' />
                            <Link to={profileLink}>@{CurrentTweet?.name}</Link>
                        </div>
                    </div>
                    {/* <img className='tweet-image' src={sample} alt="sample" /> */}
                    <div className='content-container'>
                        <p className='content'>{CurrentTweet?.tweet}</p>
                        <p className='content-date'>{timestamp}</p>
                    </div>
                </div>
            </div>

            <div className='comment-input-div'>
                <input type="text" value={cmnt} onChange={(e) => setCmnt(e.target.value)} />
                <button onClick={handleComment}>Comment</button>
            </div>

            <div className='display-comment-section'>
                {
                    allComments &&
                    allComments.map((c, id) => <SingleComment key={id} data={c} />)
                }
            </div>
        </div>
    </>
    )
}

export default TweetDesc
