import React from 'react';
import { useSelector } from 'react-redux';
import SingleTweet from './singleTweet/singleTweet.js';
import { CircularProgress } from '@material-ui/core';
import './tweets.css';

const Tweets = () => {

    const posts = useSelector((state) => state.post);

    return (
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
    )
}

export default Tweets
