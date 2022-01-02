import React from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux';
import SingleTweet from '../tweets/singleTweet/singleTweet';
import './TweetDesc.css'

const TweetDesc = () => {

    const { id } = useParams();
    let urlTweetId = id;

    const data = useSelector(state => state.post);
    console.log(data)
    let CurrentTweet = data.find(p => p?.tweetId === urlTweetId)
    console.log(CurrentTweet)

    return (
        <div className='full-tweet'>
            <SingleTweet tweet={CurrentTweet} />
            
        </div>
    )
}

export default TweetDesc
