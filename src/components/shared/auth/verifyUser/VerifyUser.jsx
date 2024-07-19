import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

import axios from 'axios';

import './VerifyUser.css';

import email_icon from '../../../assets/email.png';

const VerifyUser = () => {
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const email = location.state?.email || '';

    const navigate = useNavigate();

    const handleResendCode = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/api/v1/resend-code', {
                email
            }, {
                headers: {
                    "Authorization": "bearer ",
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                setMessage("A code has been resent to: " + email);
                setTimeout(() => {
                    setMessage('');

                }, 5000);
            } else {
                setMessage('Resend code failed. Use a different email.');
                setTimeout(() => {
                    setMessage('');

                }, 5000);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message)
            } else {
                setMessage("Something is wrong. Try again.");
            }

        }
    }

    const handleEmailVerificationCode = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/api/v1/verify-user', {
                code,
                email
            }, {
                headers: {
                    "Authorization": "bearer ",
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                setMessage("Account verified. Redirecting to login page.");
                setTimeout(() => {
                    navigate('/login', { state: { email } });

                }, 4000);

            } else {
                setMessage('Invalid code. Resend code.')
                setTimeout(() => {
                    setMessage('');

                }, 5000);
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
                <div className='resetPassword'>
                    <p>Verify your email account.</p>
                    <p>Check <span className='stateValue'>{email}</span> for a verification code.</p>
                </div>
                <div className='notificationMessage'>
                    {message && <p>{message}</p>}</div>
                <form onSubmit={handleEmailVerificationCode}>
                    <div className="inputs">
                        <div className="input">
                            {<img src={email_icon} alt="" />}
                            <input type="input"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Enter 6 digits" />
                        </div>
                    </div>
                    <div className="submit-container">
                        <button className='submit' type='submit' disabled={isLoading}>
                            {isLoading ? 'Please wait...' : 'Submit'}
                        </button>
                        <div className="submit gray" onClick={handleResendCode}>Resend code </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default VerifyUser