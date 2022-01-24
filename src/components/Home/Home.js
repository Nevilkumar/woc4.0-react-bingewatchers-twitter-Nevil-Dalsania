import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import './Home.css';
import { createTweet } from '../../Store/Actions/TweetAction';
import TweetList from '../TweetList/TweetList';
import UserList from '../UserList/UserList';

const Home = () => {
    const dispatch = useDispatch();

    const [text, setText] = useState("")
    const user = useSelector((state) => state.auth.userInfo);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(text!=="")
        {
            dispatch(createTweet(text));
            setText("");
        }
    }

    const handleReset = () => {
        setText("");
    }


    return (
        
        <div className='home'>
            <UserList />
            <TweetList />
            
            { 
                user ? ( 
                <div className='input-tweet'>
                    <form onSubmit={handleSubmit} >
                        <textarea spellCheck="false" value={text} rows={8} cols={26} onChange={(e) => setText(e.target.value)}></textarea>
                        <div className='input-tweet-btns'>
                            <button type='submit'>Tweet</button>
                            <button className='reset-btn' type='reset' onClick={handleReset}>Reset</button>
                        </div>
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
