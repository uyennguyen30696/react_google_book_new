import { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import Jumbotron from '../components/Jumbotron/Jumbotron';

import './styling/register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            console.log("Passwords do not match");
        } else {
            console.log("Email:", email, "Password:", password);
            // Simulate registration
        }
    };

    return (
        <div className='register'>
            <Jumbotron />
            <div className='form-container'>
                <h2>Register</h2>
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
                    <InputGroup className='mb-3'>
                        <FormControl
                            type='password'
                            placeholder='Confirm Password'
                            aria-label='Confirm Password'
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                    </InputGroup>
                    <Button variant='primary' type='submit'>Register</Button>
                </form>
            </div>
        </div>
    );
};

export default Register;