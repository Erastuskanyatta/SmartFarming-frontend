import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import apiService from '../../../../services/ApiService';
import email_icon from '../../../assets/email.png';
import password_icon from '../../../assets/password.png';

import './Login.css';

const Login = () => {
    const [message, setMessage] = useState('');
    const [inputs, setInputs] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const [action, setAction] = useState("Login");

    const navigate = useNavigate();

    const handleInputs = async (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({ ...inputs, [name]: value })
    }

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
            const response = await apiService.post(`${apiService.BASE_PATH}/authenticate`,
                {
                    email: inputs.email,
                    password: inputs.password
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
            if (error.data && error.data.message) {
                setMessage(error.data.message)
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
                            <input type="text" name='email' value={inputs.email || ''}
                                onChange={handleInputs}
                                placeholder="email" />
                        </div>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <span className='icon'><img src={password_icon} alt="" /> </span>
                            <input type="password" name='password' value={inputs.password || ''}
                                onChange={handleInputs}
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
