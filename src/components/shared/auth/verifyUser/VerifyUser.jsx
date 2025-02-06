import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

import apiService from '../../../../services/ApiService';
import email_icon from '../../../assets/email.png';

import './VerifyUser.css';

const VerifyUser = () => {
    const location = useLocation();
    const email = location.state;

    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState({});

    const navigate = useNavigate();

    const handleInputs = async (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({ ...inputs, [name]: value })
    }

    const handleResendCode = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await apiService.post(`${apiService.BASE_PATH}/resend-code`, {
                email
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
            if (error.data && error.data.message) {
                setMessage(error.data.message)
            } else {
                setMessage("Something is wrong. Try again.");
            }

        }
    }

    const handleEmailVerificationCode = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await apiService.post(`${apiService.BASE_PATH}/verify-user`, {
                code: inputs.code,
                email
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
                            <input type="input" name='code' value={inputs.code || ''}
                                onChange={handleInputs}
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
