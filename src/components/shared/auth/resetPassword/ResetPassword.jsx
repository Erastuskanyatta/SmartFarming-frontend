import React from 'react';
import '../../LoginSignup.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import email_icon from '../../../assets/email.png';
import password_icon from '../../../assets/password.png';


const ResetPassword = () => {
    const [action, setAction] = useState("Login");

    const navigate = useNavigate();

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
                        <span className='icon'><img src={password_icon} alt="" /> </span>
                        <input type="newPassword" placeholder="newPassword" />
                    </div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <span className='icon'><img src={password_icon} alt="" /> </span>
                        <input type="confirmPassword" placeholder="confirmPassword" />
                    </div>
                </div>

                <div className="submit-container">
                    <div className="submit gray" onClick={handleResetPassword}>Submit</div>
                </div>
            </div>
        </div>
    );
}
export default ResetPassword