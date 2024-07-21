import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Jumbotron from '../components/Jumbotron/Jumbotron';
import API from '../utils/API';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import './styling/login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Handle redirecting routes

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.login(username, password);
            sessionStorage.setItem('token', response.data.token); // Store JWT token in sessionStorage
            sessionStorage.setItem('username', username); // Store username in sessionStorage
            navigate('/'); // Redirect to home page on successful login
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className='login'>
            <Jumbotron />
            <div className='form-container'>
                <h2>Login</h2>

                <div className="login-redirect">
                    <p>New user? <Link to="/register">Create an account here</Link></p>
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
                    <Button variant='primary' type='submit'>Login</Button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Login;
