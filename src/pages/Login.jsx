import { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import Jumbotron from '../components/Jumbotron/Jumbotron';

import './styling/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email, "Password:", password);
        // Simulate login
    };

    return (
        <div className='login'>
            <Jumbotron />
            <div className='form-container'>
                <h2>Login</h2>
                <form onSubmit={handleFormSubmit}>
                    <InputGroup className='mb-3'>
                        <FormControl
                            type='email'
                            placeholder='Email'
                            aria-label='Email'
                            value={email}
                            onChange={handleEmailChange}
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
            </div>
        </div>
    );
};

export default Login;
