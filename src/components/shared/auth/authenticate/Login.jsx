import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import apiService from '../../../../services/ApiService';
import email_icon from '../../../assets/email.png';
import password_icon from '../../../assets/password.png';
import logo from '../../../../asset/images/logo.png';

import './Login.css';

const Login = () => {
    const [message, setMessage] = useState('');
    const [inputs, setInputs] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const [action, setAction] = useState(`Sign in to your account`);

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
                    navigate('/landingpage');

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
                    <div className="logo" style={{ marginTop: '-40px', marginBottom: '616px', marginLeft: '190px' }}>
                        <img src={logo} alt="Logo" style={{ width: '190px', height: 'auto' }} />
                    </div>

                    <div className="text">{action}</div>
                    <p className='mt-2 text-center text-sm text-gray-600'>
                        Or{" "}
                        <span className="font-medium text-green-800" onClick={handleSignUp}>
                            Create an account
                        </span>
                    </p>
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

                    {action === "Sign Up" ? (
                        <div></div>
                    ) : (
                        <div className="flex items-center gap-2 font-medium text-remember-me">
                            <input type="checkbox" id="rememberMe" className="accent-green-400" />
                            <label htmlFor="rememberMe" className="cursor-pointer">
                                Remember me
                            </label>
                            <span
                                className="ml-auto font-medium text-green-400 cursor-pointer"
                                onClick={handleResetPassword}
                            >
                                Forgot your Password?
                            </span>
                        </div>
                    )}

                    <div className="login submit-container">
                        <button className='submit' type='submit' disabled={isLoading}>
                            {isLoading ? "Please wait..." : 'Sign in'}
                        </button>
                    </div>
                </form>
                <div className="relative flex justify-center text-sm">
                    <span>Or continue with</span>
                </div>
            </div>
        </div>
    );
}

export default Login
