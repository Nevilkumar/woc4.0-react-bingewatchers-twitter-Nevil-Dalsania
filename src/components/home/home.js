import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createTweet } from '../../actions/tweetAction';
import Tweets from '../tweets/tweets.js';
import UserList from '../UserList/UserList';
import './home.css';

const Home = () => {
    const dispatch = useDispatch();

    const [text, setText] = useState("")
    const user = useSelector((state) => state.auth.userInfo);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createTweet(text));
        setText("");
    }

    const handleReset = () => {
        setText("");
    }


    return (
        
        <div className='home'>
            <UserList />
            <Tweets />
            
            { 
                user ? ( 
                <div className='input-tweet'>
                    <form onSubmit={handleSubmit} >
                        <textarea spellCheck="false" value={text} rows={8} cols={25} onChange={(e) => setText(e.target.value)}></textarea>
                        <button type='submit'>Tweet</button>
                        <button className='reset-btn' type='reset' onClick={handleReset}>Reset</button>
                    </form>
                </div> ) : (
                <div className='unAuth'>
                    Please Login To Tweet
                </div>
                )
            }
        </div>
    )
}

export default Home
