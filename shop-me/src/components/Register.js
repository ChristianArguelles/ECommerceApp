// src/components/Register.js
import React, { useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
const [role, setRole] = useState('customer'); // Default role
    const [error, setError] = useState('');
    const navigate = useNavigate();

const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
    }
    try {
        console.log('Sending registration data:', { name, email, password, role });
        const response = await axios.post('http://localhost:8000/api/register', {
            name,
            email,
            password,
            role
        });

            console.log('Registration successful for', email);
            navigate('/login'); // Redirect to the login page after registration
        } catch (error) {
            setError('Registration failed'); // Set the error message
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
                <Form.Group controlId="formConfirmPassword" className="mt-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Confirm password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formRole" className="mt-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Control 
                        as="select" 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)} 
                        required
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-4">
                    Register
                </Button>
            </Form>
        </Container>
    );
}

export default Register;
