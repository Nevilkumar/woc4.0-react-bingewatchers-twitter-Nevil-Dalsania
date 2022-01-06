import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import './EditTweet.css';
import { updateTweets } from '../../Store/Actions/TweetAction';

const EditTweet = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { editId } = useParams();

    const CurrentTweet = useSelector(state => state.post.find((p) => p.tweetId === editId));

    const [editedText, setEditedText] = useState(CurrentTweet?.tweet);

    useEffect(() => {
        setEditedText(CurrentTweet?.tweet)
    }, [CurrentTweet])
    const handleEditChange = () => {
            dispatch(updateTweets(editId, editedText));
            navigate('/');
    };

    return (
        <div className='edit-section'>
            <textarea spellCheck={false} cols={75} rows={10} value={editedText} onChange={(e) => setEditedText(e.target.value)}/>
            <button onClick={handleEditChange}>Update Tweet</button>
        </div>
    )
}

export default EditTweet
