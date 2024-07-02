import React from 'react';
import '../../LoginSignup.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios  from 'axios';

import email_icon from '../../../assets/email.png';
import password_icon from '../../../assets/password.png';


const Login = () => {
    const [action, setAction] = useState("Login");

    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/signup')
    }

    const handleResetPassword = () => {
        navigate('/resetPassword')
    }

    return (
        <div className="card">
            <div className='container'>
                <div className="header">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        {<img src={email_icon} alt="" />}
                        <input type="email" placeholder="email" />
                    </div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <span className='icon'><img src={password_icon} alt="" /> </span>
                        <input type="password" placeholder="password" />
                    </div>
                </div>

                {action === "Sign Up" ? <div></div> :
                    <div className="forgot-password">Forgot Password?  <span onClick={handleResetPassword}>Click me</span></div>
                }
                <div className="submit-container">
                    <div className="submit gray" onClick={handleSignUp}>Sign Up</div>
                    <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Login") }}>Login </div>
                </div>
            </div>
        </div>
    );
}
export default Login