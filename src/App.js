// Components Import
import Signup from './components/signup/signup.js';
import Login from './components/login/login.js';
import Home from './components/home/home.js';
import Navbar from './components/navbar/navbar.js';
import Profile from './components/profile/profile.js'
import './index.css';

import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth } from './firebaseConfig.js';

import { setUser } from './actions/authAction.js';
import PrivateRoutes from './components/privateRoutes/PrivateRoutes.js';
import UnProtectedRoutes from './components/privateRoutes/UnProtectedRoutes.js';
import { CircularProgress } from '@material-ui/core';
import TweetDesc from './components/TweetDesc/TweetDesc.js';
import { fetchUsers } from './actions/userAction.js';
import { fetchTweets } from './actions/tweetAction.js';
import EditTweet from './components/EditTweet/EditTweet.js';
import { fetchComment } from './actions/commentsAction.js';

const App = () => {
  
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser)
      {
        dispatch(setUser(authUser));
        setCheck(true);
      }
      else{
        dispatch(setUser(null));
        setCheck(true);
      }
    })
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTweets());
    dispatch(fetchComment());
  }, [dispatch])



  return (
    !check ? <div className='home-loading'><CircularProgress color='secondary' size={80} /></div> :
    <>   
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/tweet/:id" element={<TweetDesc />} />
          <Route exact path="/edit/:editId" element={<EditTweet />} />
          <Route exact path="/" element={<PrivateRoutes />} >
            <Route exact path="/profile/:profileId" element={<Profile />} />
          </Route>
          <Route exact path="/" element={<UnProtectedRoutes />} >
            <Route exact path="login" element={<Login />} />
            <Route exact path="signup" element={<Signup />} />
          </Route>
        </Routes>
    </BrowserRouter>
    </>

  )
}

export default App

