import React from 'react';
import './Signup.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import email_icon from '../../../assets/email.png';
import password_icon from '../../../assets/password.png';
import avatar_icon from '../../../assets/person.png'

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/login');
    }
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        const response = "";

        try {
            response = await axios.post('http://localhost:8080/api/v1/register', {
                username,
                email,
                password,
                confirmPassword,
                phoneNumber
            }, {
                headers: {
                    'Authorization': 'Bearer ',
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                setMessage('Registered successfully. Please enter the code sent to your email to verify your accout.');
                setTimeout(() => {
                    navigate('/registerComplete');

                }, 2000);
            } else {
                setMessage('Registration failed.')
            }

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage('An error occurred while registering.');
            }
        } finally {
            setIsLoading(false)
        }

    }
    return (

        <div className="card">
            <div className='container'>
                <div className="header">
                    <div className="text">Sign Up</div>
                    <div className="underline"></div>
                </div>
                <div className='notificationMessage'>
                    {message && <p>{message}</p>}</div>
                <form onSubmit={handleRegisterSubmit}>
                    <div className="inputs">
                        <div className="input">
                            <img src={avatar_icon} alt="" />
                            <input type="text" value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="username" />
                        </div>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <img src={email_icon} alt="" />
                            <input type="email" value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email" />
                        </div>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <img src={password_icon} alt="" />
                            <input type="password" value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="password" />
                        </div>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <img src={password_icon} alt="" />
                            <input type="password" value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="confirmPassword" />
                        </div>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <img src={password_icon} alt="" />
                            <input type="phone" value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="phone" />
                        </div>
                    </div>

                    <div className="submit-container">
                        <button className='submit' type='submit' disabled={isLoading}>
                            {isLoading ? "Please wait..." : 'Sign Up'}
                        </button>

                        <div className="submit gray" onClick={handleNavigation}>Login</div>
                    </div>

                </form>
            </div>
        </div>
    );
}
export default SignUp