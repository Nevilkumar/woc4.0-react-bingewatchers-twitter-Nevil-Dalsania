import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';


import './TweetList.css';
import SingleTweet from './SingleTweet/SingleTweet';

const TweetList = () => {

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

export default TweetList
