import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import apiService from '../../../../services/ApiService';

import { MdEmail, MdLock } from 'react-icons/md';
import  logo  from '../../../assets/logo.png';

import './Login.css';

const Login = () => {
    // state variables
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
            const response = await apiService.authenticate({
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
                    <div className="logo">
                        <img src={logo} alt="Logo" />
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
                            <MdEmail size={22} />
                            <input type="text" name='email' value={inputs.email || ''}
                                onChange={handleInputs}
                                placeholder="email" />
                        </div>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <MdLock size={22} />
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
