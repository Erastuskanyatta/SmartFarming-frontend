import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './VerifyEmail.css';
import email_icon from '../../../assets/email.png';
import axios from 'axios';


const VerifyEmail = () => {
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [IsLoading, setIsLoading] = useState(false);


    const navigate = useNavigate();

    const handleResetEmailVerificationCode = async (e) => {

        navigate('/login')
    }

    const handleEmailVerificationCode = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await axios.post('url', {
                code,
            }, {
                headers: {
                    "Authorization": "bearer ",
                    "Content-Type": "application/json"
                }
            });

            if (response === 200) {
                setMessage('Valid code ...')

            } else {
                setMessage('Invalid code...')
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
                    <p>Enter the 6-digit code.</p>
                    <p>Check "email here" for a verification code. Change(to forgot password)</p>
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
                        <button className='submit' type='submit' disabled={IsLoading}>
                            {IsLoading ? 'Please wait...' : 'Submit'}
                        </button>
                        <div className="submit gray" onClick={handleResetEmailVerificationCode}>Resend code </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default VerifyEmail