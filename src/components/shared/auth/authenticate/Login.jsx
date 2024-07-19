import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import axios from 'axios';

import './Login.css';

import email_icon from '../../../assets/email.png';
import password_icon from '../../../assets/password.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [action, setAction] = useState("Login");

    const baseUrl = 'http://localhost:8080';

    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/signup')
    }

    const handleResetPassword = () => {
        navigate('/forgetPassword')
    }

    const handleOnLogin = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await axios.post(baseUrl + '/api/v1/authenticate',
                {
                    email,
                    password
                }, {
                headers: {
                    'Authorization': 'Bearer',
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                setMessage("Login Successful.");
                setTimeout(() => {
                    navigate('/resetPassword');

                }, 4000);

            } else {
                setMessage('Login Failed')
            }

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message)
            } else {
                setMessage("An error occured while logging in");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="login-card">
            <div className='container'>
                <div className="header">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>
                <div className='notificationMessage'>
                    {message && <p>{message}</p>}</div>

                <form onSubmit={handleOnLogin}>
                    <div className="inputs">
                        <div className="input">
                            <img src={email_icon} alt="" />
                            <input type="text" value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email" />
                        </div>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <span className='icon'><img src={password_icon} alt="" /> </span>
                            <input type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="password" />
                        </div>
                    </div>

                    {action === "Sign Up" ? <div></div> :
                        <div className="forgot-password">Forgot Password?  <span onClick={handleResetPassword}>Click me</span></div>
                    }
                    <div className="submit-container">
                        <button className='submit' type='submit' disabled={isLoading}>
                            {isLoading ? "Please wait..." : 'Login'}
                        </button>

                        <div className="submit gray" onClick={handleSignUp}>Sign Up</div>
                    </div>

                </form>
            </div>
        </div>
    );
}
export default Login