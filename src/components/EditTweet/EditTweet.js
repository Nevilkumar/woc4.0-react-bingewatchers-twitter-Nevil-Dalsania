import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import './EditTweet.css';
import { updateTweets } from '../../Store/Actions/TweetAction';

const EditTweet = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { editId } = useParams();

    const CurrentTweet = useSelector(state => state.post.filter((p) => p.tweetId === editId));
    console.log(CurrentTweet);

    const [editedText, setEditedText] = useState(CurrentTweet[0].tweet);


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
