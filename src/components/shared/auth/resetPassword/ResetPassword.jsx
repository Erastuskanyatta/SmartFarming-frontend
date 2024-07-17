import React from 'react';
import './ResetPassword.css';
import { useState } from 'react';

import password_icon from '../../../assets/password.png';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';


const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPasword] = useState('');
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [IsLoading, setIsLoading] = useState(false);

    const location = useLocation();

    const email = location.state?.email || '';

    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await axios.post('', {
                email,
                code,
                password,
                confirmPassword
            }, {
                headers: {
                    "Authorization": "Bearer ",
                    "Content-Type": "application/json"
                }
            });

            if (response === 200) {
                setMessage('Password reset Successful. Redirecting To Login page.')
                setTimeout(() => {
                    navigate('/login');

                }, 2000);

            } else {
                setMessage('Password Reset failed.');
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
        <div className="resetPassword-card">
            <div className='container'>
                <div className='resetPassword'>
                    <p>Choose  {email} a new password</p>
                </div>
                <div className='notificationMessage'>
                    {message && <p>{message}</p>}</div>
                <form onSubmit={handleResetPassword}>
                    <div className="inputs">
                        <div className="input">
                            <span className='icon'><img src={password_icon} alt="" /> </span>
                            <input type="newPassword"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="newPassword" />
                        </div>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <span className='icon'><img src={password_icon} alt="" /> </span>
                            <input type="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPasword(e.target.value)}
                                placeholder="confirmPassword" />
                        </div>
                    </div>

                    <div className="submit-container">
                        <button className='submit' type='submit' disabled={IsLoading}>
                            {IsLoading ? 'Please wait...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default ResetPassword