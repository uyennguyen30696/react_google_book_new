import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Jumbotron from '../components/Jumbotron/Jumbotron';
import API from '../utils/API';

import { InputGroup, FormControl, Button } from 'react-bootstrap';
import './styling/register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Handle redirecting routes

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            try {
                const response = await API.register(username, password);
                setMessage(response.data.message);
                setTimeout(() => {
                    navigate('/login'); // Redirect to login page after 3 seconds
                }, 3000);
            } catch (error) {
                setMessage(error.response?.data?.message || 'An error occurred');
            }
        }
    };

    return (
        <div className='register'>
            <Jumbotron />
            <div className='form-container'>
                <h2>Register</h2>

                <div className="login-redirect">
                    <p>Already have an account? <Link to="/login">Login here</Link></p>
                </div>
                
                <form onSubmit={handleFormSubmit}>
                    <InputGroup className='mb-3'>
                        <FormControl
                            type='text'
                            placeholder='Username'
                            aria-label='Username'
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </InputGroup>
                    <InputGroup className='mb-3'>
                        <FormControl
                            type='password'
                            placeholder='Password'
                            aria-label='Password'
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </InputGroup>
                    <InputGroup className='mb-3'>
                        <FormControl
                            type='password'
                            placeholder='Confirm Password'
                            aria-label='Confirm Password'
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                    </InputGroup>
                    <Button id='register-btn' variant='primary' type='submit'>Register</Button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Register;
