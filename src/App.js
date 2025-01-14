import React from 'react'
import './App.css';
import './styles.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/shared/auth/authenticate/Login';
import Signup from './components/shared/auth/register/Signup'
import ForgetPassword from './components/shared/auth/forgotPassword/ForgetPassword'
import ResetPassword from './components/shared/auth/resetPassword/ResetPassword';
import VerifyUser from './components/shared/auth/verifyUser/VerifyUser'
import RegisterComplete from './components/shared/auth/registerComplete/RegisterComplete';
import LandingPage from './components/core/landing/LandingPage';

const App = () => {
  return (
    <>
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetPassword" element={<ForgetPassword />}/>
        <Route path="/resetPassword" element={<ResetPassword />}/>
        <Route path="/verifyUser" element={<VerifyUser />}/>
        <Route path="/registerComplete" element={<RegisterComplete />}/>

        <Route path="/landingpage" element={<LandingPage/>} />
      </Routes>
    </Router>
    </>
  );
};

 export default App;
