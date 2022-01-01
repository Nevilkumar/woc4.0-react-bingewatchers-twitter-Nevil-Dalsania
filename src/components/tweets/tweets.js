import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTweets } from '../../actions/tweetAction';
import SingleTweet from './singleTweet/singleTweet.js';
import { CircularProgress } from '@material-ui/core';
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
                    <div className='load-container'>
                        <CircularProgress color='secondary' size={50} />
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
