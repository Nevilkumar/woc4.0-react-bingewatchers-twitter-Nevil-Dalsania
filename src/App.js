import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

// Components Import
import Signup from './components/Signup/Signup.js';
import Login from './components/Login/Login.js';
import Home from './components/Home/Home.js';
import Navbar from './components/Navbar/Navbar.js';
import Profile from './components/Profile/Profile.js'
import EditTweet from './components/EditTweet/EditTweet.js';
import './index.css';

import { auth } from './firebaseConfig.js';
import { setUser } from './Store/Actions/AuthAction.js';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes.js';
import UnProtectedRoutes from './components/PrivateRoutes/UnProtectedRoutes.js';
import TweetDesc from './components/TweetDesc/TweetDesc.js';
import { fetchUsers } from './Store/Actions/UserAction.js';
import { fetchTweets } from './Store/Actions/TweetAction.js';
import Footer from './components/Footer/Footer.js';

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

    dispatch(fetchUsers());
    dispatch(fetchTweets());
    
  }, [dispatch]);

  return (
    !check ? <div className='home-loading'><CircularProgress color='secondary' size={80} /></div> :
    <>   
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route exact path="/" element={<PrivateRoutes />} >
            <Route exact path="/edit/:editId" element={<EditTweet />} />
            <Route exact path="/tweet/:id" element={<TweetDesc />} />
            <Route exact path="/profile/:profileId" element={<Profile />} />
          </Route>

          <Route exact path="/" element={<UnProtectedRoutes />} >
            <Route exact path="login" element={<Login />} />
            <Route exact path="signup" element={<Signup />} />
          </Route>

        </Routes>
        <Footer />
    </BrowserRouter>
    </>

  )
}

export default App

