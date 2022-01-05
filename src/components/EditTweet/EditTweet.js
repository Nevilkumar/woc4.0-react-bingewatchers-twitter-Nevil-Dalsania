import React, { useState } from 'react'
import './EditTweet.css';
import { useParams } from 'react-router';


const EditTweet = () => {

    const { editId } = useParams();
    const [editedText, setEditedText] = useState("")

    const handleEditChange = () => {

    };

    return (
        <div className='edit-section'>
            <textarea spellCheck={false} cols={75} rows={10} value={editedText} onChange={(e) => setEditedText(e.target.value)}/>
            <button onClick={handleEditChange}>Update Tweet</button>
        </div>
    )
}

export default EditTweet
