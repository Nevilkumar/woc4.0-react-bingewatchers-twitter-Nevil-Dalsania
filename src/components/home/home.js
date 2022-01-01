import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createTweet, updateTweets } from '../../actions/tweetAction';
import Tweets from '../tweets/tweets.js';
import './home.css';

const Home = () => {
    const dispatch = useDispatch();

    const [currentId, setCurrentId] = useState(null);
    const [text, setText] = useState("")
    const user = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentId)
            dispatch(updateTweets(currentId, text));
        else
            dispatch(createTweet(text));
        setText("");
        setCurrentId(null);
    }

    const handleReset = () => {
        setText("");
        setCurrentId(null);
    }

    const res = useSelector((state) => currentId ? state.post.find((p) => p.tweetId === currentId) : null);

    useEffect(() => {
        if(res)
            setText(res.tweet);
    }, [res]);

    return (
        
        <div className='home'>
            <Tweets currentId={currentId} setCurrentId={setCurrentId} />
            
            { 
                user ? ( 
                <div className='input-tweet'>
                    <form onSubmit={handleSubmit} >
                        <textarea spellCheck="false" value={text} rows="10" cols={30} onChange={(e) => setText(e.target.value)}></textarea>
                        <button type='submit'>{currentId ? "Update Tweet"  : "Tweet" }</button>
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
