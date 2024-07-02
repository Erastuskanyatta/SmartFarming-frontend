import React from 'react';
import '../../LoginSignup.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import email_icon from '../../../assets/email.png';


const ForgetPassword = () => {
    const [action, setAction] = useState("Reset Password");

    const navigate = useNavigate();

    const handleLoginNavigation = () => {
        navigate('/login')
    }

    return (
        <div className="card">
            <div className='container'>
                <div className="header">
                    <div className="resetPasstext">{action}</div>
                    <div className="underline"></div>
                </div>
                <div className='resetPassword'>
                    <p>Please Provide your email:</p>
                </div>
                <div className="inputs">
                    <div className="input">
                        {<img src={email_icon} alt="" />}
                        <input type="email" placeholder="email" />
                    </div>
                </div>
                <div className="submit-container">
                    <div className="submit gray" >Send </div>
                    <div className="submit gray" onClick={handleLoginNavigation}>Back to Login</div>
                </div>
            </div>
        </div>
    );
}
export default ForgetPassword