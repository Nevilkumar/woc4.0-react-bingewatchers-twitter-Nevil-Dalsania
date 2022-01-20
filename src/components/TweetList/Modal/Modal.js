import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTweets } from '../../../Store/Actions/TweetAction';


import './Modal.css';

const Modal = ({setOpenModal, deleteId, setDeleteId}) => {

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteTweets(deleteId));
        setDeleteId(null);
        setOpenModal(false);
    }

    return (
        <div className='modal-window'>
            <div className='modal-container'>
                <p>Are you sure you want to delete this tweet??</p>
                <div className='modal-btn-div'>
                    <button className='modal-btn' onClick={handleDelete}>YES</button>
                    <button className='modal-btn' onClick={() => setOpenModal(false)}>NO</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
