import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './SingleComment.css';

const SingleComment = ({data}) => {

    const userData = useSelector(state => state.user.find(u => u.uid === data.uid))

    let profileUrl = "/profile/" + userData.uid;

    return (
        <div className='individual-comment'>
            <Link to={profileUrl} className='comment-user'>@{userData?.name}</Link>
            <h1 className='comment-content'>{data?.comment}</h1>
        </div>
    )
}

export default SingleComment
