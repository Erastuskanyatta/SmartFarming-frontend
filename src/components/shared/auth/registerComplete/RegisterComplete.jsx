import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './RegisterComplete.css'
import axios from 'axios';

import avatar_email from '../../../assets/email.png';


const RegisterComplete = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const navigate = useNavigate();

    const handleResendCode = async () => {

    }

    const handleRegisterComplete = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/api/v1/register-complete',
                {
                    email
                }, {
                headers: {
                    'Authorization': 'Bearer',
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                setMessage("Code sent successfully. Redirecting to verify user page.");
                setTimeout(() => {
                    navigate('/verifyUser', { state: { email } });

                }, 4000);

            } else {
                setMessage("Code not sent.")
            }

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message)
            } else {
                setMessage("An error occured while sending the code");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="registerComplete-card">
            <div className='container'>
                <div className='resetPassword'>
                    <p>Verify your account.</p>
                    <p>Send a code to your email to verify your account.</p>
                </div>
                <div className='notificationMessage'>
                    {message && <p>{message}</p>}
                </div>
                <form onSubmit={handleRegisterComplete}>
                    <div className="inputs">
                        <div className="input">
                            <img src={avatar_email} alt="" />
                            <input type="email" value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email" />
                        </div>
                    </div>
                    <div className="submit-container">
                        <button className='submit' type='submit' disabled={isLoading}>
                            {isLoading ? "Please wait..." : 'Send'}
                        </button>
                        <div className="submit gray" onClick={handleResendCode}>Resend code </div>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default RegisterComplete