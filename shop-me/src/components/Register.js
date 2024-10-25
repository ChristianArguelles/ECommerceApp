// src/components/Register.js
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const newUser = { email, password };

        try {
            await axios.post('http://localhost:8000/api/register', newUser);
            console.log('Registration successful');
            navigate('/login'); // Redirect to login after successful registration
        } catch (error) {
            console.error('Error registering:', error);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <Container>
            <h1><center>Register</center></h1>
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
                    Register
                </Button>
            </Form>
        </Container>
    );
}

export default Register;
