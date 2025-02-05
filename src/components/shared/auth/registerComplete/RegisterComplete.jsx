import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import apiService from '../../../../services/ApiService';
import avatar_email from '../../../assets/email.png';

import './RegisterComplete.css';

const RegisterComplete = () => {
    const location = useLocation();
    const emailValue = location.state;

    const [message, setMessage] = useState('');
    const [inputs, setInputs] = useState({ email: emailValue || '' });
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleInputs = (event) => {
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handleRegisterComplete = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await apiService.post(`${apiService.BASE_PATH}/register-complete`, {
                email: inputs.email
            });

            if (response.status === 200) {
                setMessage("Code sent successfully. Redirecting to verify user page.");
                setTimeout(() => {
                    navigate('/verifyUser', { state: inputs.email });
                }, 4000);
            } else {
                setMessage("Code not sent. Please try again.");
            }
        } catch (error) {
            setMessage(error?.data?.message || "An error occurred while sending the code.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="registerComplete-card">
            <div className='container'>
                <div className='resetPassword'>
                    <p>Verify your account.</p>
                    <p>Send a code to your email below to verify your account.</p>
                </div>
                <div className='notificationMessage'>
                    {message && <p>{message}</p>}
                </div>
                <form onSubmit={handleRegisterComplete}>
                    <div className="inputs">
                        <div className="input">
                            <img src={avatar_email} alt="" />
                            <input
                                type="email"
                                name='email'
                                value={inputs.email}
                                onChange={handleInputs}
                                placeholder="email"
                            />
                        </div>
                    </div>
                    <div className="submit-container">
                        <button className='submit' type='submit' disabled={isLoading}>
                            {isLoading ? "Please wait..." : 'Send'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterComplete;
