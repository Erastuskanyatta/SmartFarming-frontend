import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import apiService from '../../../../services/ApiService';
import  logo  from '../../../assets/logo.png';
import { MdEmail, MdLock } from 'react-icons/md';

import './ResetPassword.css';

const ResetPassword = () => {
    const location = useLocation();
    const email = location.state;

    const [message, setMessage] = useState('');
    const [inputs, setInputs] = useState({});
    const [IsLoading, setIsLoading] = useState(false);
    const [action, setAction] = useState(`Choose a new password`);

    const navigate = useNavigate();

    const handleInputs = async (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({ ...inputs, [name]: value })
    }

    const handleResendCode = async (e) => {
        navigate('/forgetPassword')
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await apiService.resetPassword({
                email: inputs.email,
                code: inputs.code,
                password: inputs.password,
            });

            if (response.status === 204) {
                setMessage("Passsword Reset Successful. Please Login with the new password");
                setTimeout(() => {
                    navigate('/login', { state: email });

                }, 4000);

            } else {
                setMessage('Password reset Failed.')
            }
        } catch (error) {
            if (error.data && error.data.message) {
                setMessage(error.data.message)
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
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="new-password text">{action}</div>
                <div className='notificationMessage'>
                    {message && <p>{message}</p>}</div>
                <form onSubmit={handleResetPassword}>
                    <div className="inputs">
                        <div className="input">
                            <MdLock size={22} />
                            <input type="code" name='code' value={inputs.code || ''}
                                onChange={handleInputs}
                                placeholder="code" />
                        </div>
                    </div>
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
                            <input type="newPassword" name='password' value={inputs.password || ''}
                                onChange={handleInputs}
                                placeholder="newPassword" />
                        </div>
                    </div>
                    <div className="submit-container">
                        <button className='submit' type='submit' disabled={IsLoading}>
                            {IsLoading ? 'Please wait...' : 'Submit'}
                        </button>
                        <div className="submit gray" onClick={handleResendCode}>Resend code</div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword
