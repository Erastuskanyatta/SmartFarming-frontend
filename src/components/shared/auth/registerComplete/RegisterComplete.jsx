import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './RegisterComplete.css'
import axios from 'axios';

import avatar_email from '../../../assets/email.png';


const RegisterComplete = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const navigate = useNavigate();

    const handleResendCode = async () => {

    }

    const handleRegisterComplete = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await axios.post('http://',
                {
                    email,
                    code
                }, {
                headers: {
                    'Authorization': 'Bearer',
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                setMessage("Registration Successful..");

                navigate('/login');

            } else {
                setMessage("Registration failed.")
            }

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message)
            } else {
                setMessage("An error occured while registering");
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
                    <p>Enter the 6-digit code to verify your account.</p>
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
                    <div className="inputs">
                        <div className="input">
                            <span className='icon'><img alt="" /> </span>
                            <input type="code"
                                value={code}
                                onChange={e => setCode(e.target.value)}
                                placeholder="code" />
                        </div>
                    </div>
                    <div className="submit-container">
                        <button className='submit' type='submit' disabled={isLoading}>
                            {isLoading ? "Please wait..." : 'Login'}
                        </button>
                        <div className="submit gray" onClick={handleResendCode}>Resend code </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterComplete;