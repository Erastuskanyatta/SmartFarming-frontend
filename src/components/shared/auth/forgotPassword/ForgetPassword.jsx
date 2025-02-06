import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import apiService from '../../../../services/ApiService';
import email_icon from '../../../assets/email.png';

import './ForgetPassword.css';

const ForgetPassword = () => {
    const [message, setMessage] = useState('');
    const [inputs, setInputs] = useState({});
    const [IsLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

    const handleInputs = async (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({ ...inputs, [name]: value })
    }

    const handleLoginNavigation = () => {
        navigate('/login')
    }

    const handleVerificationCodeSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await apiService.post(`${apiService.BASE_PATH}/forgot-password`, {
                email: inputs.email
            });

            if (response.status === 204) {
                setMessage("A verification email have been sent to: " + inputs.email);
                setTimeout(() => {
                    navigate('/resetPassword', { state: inputs.email });

                }, 4000);

            } else {
                setMessage('Password Reset failed. Use a different email.');
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
                            <input type="email" name='email' value={inputs.email || ''}
                                onChange={handleInputs}
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
