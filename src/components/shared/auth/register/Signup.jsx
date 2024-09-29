import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiService from '../../../../services/ApiService';
import email_icon from '../../../assets/email.png';
import password_icon from '../../../assets/password.png';
import avatar_icon from '../../../assets/person.png'

import './Signup.css';

const SignUp = () => {
    const [inputs, setInputs] = useState({})
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/login'); //this should be the dashboard page
    }

    const handleInputs = async (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({ ...inputs, [name]: value })
    }
    const handleRegisterSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true);

        try {
            const response = await apiService.post(`${apiService.BASE_PATH}/register`, {
                username: inputs.username,
                email: inputs.email,
                password: inputs.password,
                confirmPassword: inputs.confirmPassword,
                phoneNumber: inputs.phoneNumber
            });

            if (response.status === 201) {
                setMessage('Registered successfully. Please verify your account.');
                setTimeout(() => {
                    navigate('/registerComplete');
                }, 2000);
            } else {
                setMessage('Registration failed. Please try again.');
            }

        } catch (error) {
            if (error.data && error.data.message) {
                setMessage(error.data.message);
                setTimeout(() => {
                    setMessage('');
                }, 5000);
            } else {

                setMessage('An error occurred while registering.');
            }
        } finally {
            setIsLoading(false);
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
                            <input type="text" name="username" value={inputs.username || ''}
                                onChange={handleInputs}
                                placeholder="username" />
                        </div>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <img src={email_icon} alt="" />
                            <input type="email" name='email' value={inputs.email || ''}
                                onChange={handleInputs}
                                placeholder="email" />
                        </div>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <img src={password_icon} alt="" />
                            <input type="password" name='password' value={inputs.password || ''}
                                onChange={handleInputs}
                                placeholder="password" />
                        </div>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <img src={password_icon} alt="" />
                            <input type="password" name='confirmPassword' value={inputs.confirmPassword || ''}
                                onChange={handleInputs}
                                placeholder="confirmPassword" />
                        </div>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <img src={password_icon} alt="" />
                            <input type="phone" name='phoneNumber' value={inputs.phoneNumber || ''}
                                onChange={handleInputs}
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