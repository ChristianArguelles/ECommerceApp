// src/components/Register.js
import React, { useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { registerUser } from '../mockUserData'; // Adjust the import path
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            registerUser({ name, email, password });
            console.log('Registration successful for', email);
            navigate('/login'); // Redirect to the login page after registration
        } catch (error) {
            setError(error.message); // Set the error message from the registration attempt
        }
    };

    return (
        <Container>
            <h1 className="text-center">Register</h1>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mt-3">
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
