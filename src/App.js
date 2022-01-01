// Components Import
import Signup from './components/signup/signup.js';
import Login from './components/login/login.js';
import Home from './components/home/home.js';
import Navbar from './components/navbar/navbar.js';
import Profile from './components/profile/profile.js'
import './index.css';

import React, {useEffect} from 'react'
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebaseConfig.js';

import { setUser } from './actions/authAction.js';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser)
        dispatch(setUser(authUser));
      else
        dispatch(setUser(null));
    })
  }, [dispatch]);

  return (
    <>    
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
    </BrowserRouter>
    </>

  )
}

export default App

