import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

import apiService from '../../../../services/ApiService';
import email_icon from '../../../assets/email.png';
import logo from '../../../../asset/images/logo.png';


import './VerifyUser.css';

const VerifyUser = () => {
    const location = useLocation();
    const emailValue = location.state;


    const [inputs, setInputs] = useState({ email: emailValue || '' });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);

    const [action, setAction] = useState(`Verify your email account`);


    const navigate = useNavigate();

    const handleInputs = async (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({ ...inputs, [name]: value })
    }

    const handleResendCode = async (e) => {
        e.preventDefault();

        setIsResending(true);

        try {
            const response = await apiService.resendCode({
                email: inputs.email
            });

            if (response.status === 200) {
                setMessage("A new code has been sent to your email. Please enter it below.");
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
            if (error.data && error.data.message) {
                setMessage(error.data.message)
            } else {
                setMessage("Something is wrong. Try again.");
            }
        } finally {
            setIsResending(false);
        }
    }

    const handleEmailVerificationCode = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await apiService.verifyUser({
                code: inputs.code,
                email: inputs.email,
            });

            if (response.status === 200) {
                setMessage("Account verified. Redirecting to login page.");
                setTimeout(() => {
                   navigate('/login');

                }, 4000);

            } else {
                setMessage('Invalid code. Resend code.')
                setTimeout(() => {
                    setMessage('');

                }, 5000);
            }

        } catch (error) {
            if (error.data && error.data.message) {
                setMessage(error.data.message)
            } else {
                setMessage("Something is wrong. Try again.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="verifyuser-card">
            <div className='container'>
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className='resetPassword'>
                    <div className="verify-user text">{action}</div>
                    <p>Check your email for a verification code.</p>
                </div>
                <div className='notificationMessage'>
                    {message && <p>{message}</p>}</div>
                <form onSubmit={handleEmailVerificationCode}>
                    <div className="inputs">
                        <div className="input">
                            <img src={email_icon} alt="" />
                            <input type="email" name='email' value={inputs.email || ''}
                                onChange={handleInputs}
                                placeholder="email" />
                        </div>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            {<img src={email_icon} alt="" />}
                            <input type="input" name='code' value={inputs.code || ''}
                                onChange={handleInputs}
                                placeholder="Enter code" />
                        </div>
                    </div>
                    <div className="submit-container">
                        <button className='submit' type='submit' disabled={isLoading}>
                            {isLoading ? 'Please wait...' : 'Submit'}
                        </button>
                        <div className="submit gray" onClick={handleResendCode}>
                            {isResending ? 'Please wait...' : 'Resend code'}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default VerifyUser
