import React from 'react';
import '../../LoginSignup.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


import avatar_icon from '../../../assets/person.png';
import password_icon from '../../../assets/password.png';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const [action, setAction] = useState("Login");

    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/signup')
    }

    const handleResetPassword = () => {
        navigate('/resetPassword')
    }

    const headers = new Headers();
    headers.append('Authorization', 'Bearer');

    const handleOnLogin = async (e) => {
        console.log("some text here")
        e.preventDefault();

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/api/v1/authenticate',
                {
                    username,
                    password
                }, {
                headers: {
                    'Authorization': 'Bearer',
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                setMessage("Login Successful..");

                navigate('/resetPassword');

            } else {
                setMessage("Login failed.")
            }

        } catch (error) {
            console.log("Error:", error);
            setMessage("An error occured while logging in");

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="card">
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
                            <img src={avatar_icon} alt="" />
                            <input type="text" value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="username" />
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
                        <button className='submit' type='submit' disabled={loading}>
                            {loading ? "Please wait..." : 'Login'}
                        </button>

                        <div className="submit gray" onClick={handleSignUp}>Sign Up</div>
                    </div>

                </form>
            </div>
        </div>
    );
}
export default Login