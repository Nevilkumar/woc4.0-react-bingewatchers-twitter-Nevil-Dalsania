import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';


import './TweetList.css';
import SingleTweet from './SingleTweet/SingleTweet';
import { TransitionGroup ,CSSTransition } from 'react-transition-group';

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
                <TransitionGroup>

                    {posts.map((post,id) => (
                       <CSSTransition key={id} timeout={500} classNames="transistion">
                                <SingleTweet key={id} tweet={post} />
                       </CSSTransition>
                    ))} 
                </TransitionGroup>
                    
            }
        </div>
    )
}

export default TweetList
