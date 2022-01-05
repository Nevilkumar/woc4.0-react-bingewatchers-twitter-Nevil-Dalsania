import React from 'react'
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import userImage from '../tweets/singleTweet/default.png';
import sample from '../tweets/singleTweet/sample1.jpg';
import moment from 'moment';
import './TweetDesc.css'

const TweetDesc = () => {

    const { id } = useParams();
    let urlTweetId = id;

    const data = useSelector(state => state.post);

    let CurrentTweet = data.find(p => p?.tweetId === urlTweetId)
    let profileLink = "/profile/" + CurrentTweet?.uid;

    let timestamp = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(CurrentTweet?.createdAt);

    const tmp = CurrentTweet?.createdAt;
    timestamp = moment(tmp).format('MMM Do YYYY, h:mm:ss a');

    return (
    <>
        <div className='single-tweet-section'>

            <div className='full-tweet'>
                <div className='tweet'>
                    <div className='content-title'>
                        <div className='profile-container'>
                            <img className='profile-image' src={userImage} alt='profile' />
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
                <input type="text" />
                <button>Comment</button>
            </div>
        </div>
    </>
    )
}

export default TweetDesc
