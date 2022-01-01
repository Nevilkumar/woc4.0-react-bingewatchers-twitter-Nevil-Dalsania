import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTweets } from '../../actions/tweetAction';
import SingleTweet from './singleTweet/singleTweet.js';
import './tweets.css';

const Tweets = ({currentId, setCurrentId}) => {

    const posts = useSelector((state) => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTweets());
    }, [])


    return (
        <div className='tweets-container'>
            {
                !posts.length ? 
                    <div className='tweet load-container'>
                            Loading The Tweets
                    </div>
                : 
                    posts.map((post,id) => (
                            <SingleTweet key={id} tweet={post} setCurrentId={setCurrentId} />
                    ))
            }
        </div>
    )
}

export default Tweets
