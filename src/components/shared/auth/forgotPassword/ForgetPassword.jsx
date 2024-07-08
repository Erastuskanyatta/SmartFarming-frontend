import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import axios from 'axios';

import './ForgetPassword.css';

import email_icon from '../../../assets/email.png';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [IsLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

    const handleLoginNavigation = () => {
        navigate('/login')
    }

    const handleVerificationCodeSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await axios.post('', {
                email
            }, {
                headers: {
                    "Authorization": "Bearer ",
                    "Content-Type": "application/json"
                }
            });

            if (response === 200) {
                setMessage('Password reset Successful.')

            } else {
                setMessage('Password Reset failed. Use a different email.');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message)
            } else {
                setMessage("Something is wrong. Try again.");
            }

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="forgetPassword-card">
            <div className='container'>
                <div className="header">
                    <div className="resetPasstext">Forgot password</div>
                    <div className="underline"></div>
                </div>
                <div className='notificationMessage'>
                    {message && <p>{message}</p>}</div>
                <form onSubmit={handleVerificationCodeSubmit}>
                    <div className="inputs">
                        <div className="input">
                            {<img src={email_icon} alt="" />}
                            <input type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email" />
                        </div>
                    </div>
                    <div className='resetPassword'>
                        <p>We'll send a verification code to this email if it matches an existing account.</p>
                    </div>
                    <div className="submit-container">
                        <button className='submit' type='submit' disabled={IsLoading}>
                            {IsLoading ? 'Please wait..' : 'Next'}
                        </button>
                        <div className="submit gray" onClick={handleLoginNavigation}>Back to Login </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default ForgetPassword