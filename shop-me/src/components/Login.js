// src/components/Login.js
import React, { useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../mockUserData'; // Adjust the import path

function Login({ setIsLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            const user = loginUser(email, password);
            localStorage.setItem('token', 'your_token'); // Simulate storing a token
            setIsLoggedIn(true); // Set logged-in state to true
            console.log('Login successful for', user.email);
            navigate('/'); // Redirect to the main application
        } catch (error) {
            setError(error.message); // Set the error message from the login attempt
        }
    };

    return (
        <Container>
            <h1 className="text-center">Login</h1>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-4">
                    Login
                </Button>
            </Form>
        </Container>
    );
}

export default Login;
