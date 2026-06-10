import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiService from '../../../../services/ApiService';
import { MdEmail, MdLock } from 'react-icons/md';
import  logo  from '../../../assets/logo.png';

import './Signup.css';

const SignUp = () => {
    const [inputs, setInputs] = useState({})
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [action, setAction] = useState(`Create an account`);

    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/login')
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
            const response = await apiService.register({
                email: inputs.email,
                password: inputs.password,
            });

            if (response.status === 200) {
                setMessage('Registered successfully. Please verify your account.');
                setTimeout(() => {
                    navigate('/verifyUser', { state: inputs.email });
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
                    <div className="logo">
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className="text">{action}</div>
                    <p className='mt-2 text-center text-sm text-gray-600'>
                        Or{" "}
                        <span className="font-medium text-green-400" onClick={handleSignUp}>
                            Login to an existing account</span>
                    </p>
                </div>
                <div className='notificationMessage'>
                    {message && <p>{message}</p>}</div>
                <form onSubmit={handleRegisterSubmit}>
                    <div className="inputs">
                        <div className="input">
                            <MdEmail size={22} />
                            <input type="email" name='email' value={inputs.email || ''}
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
                    <div className="sign-up submit-container">
                        <button className='submit' type='submit' disabled={isLoading}>
                            {isLoading ? "Please wait..." : 'Sign Up'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default SignUp
