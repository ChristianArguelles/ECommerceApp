import React, { useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setIsLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer'); // Add role state
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                email,
                password
            });

            const { token, user } = response.data;
            localStorage.setItem('token', token); // Store the token
            setIsLoggedIn(true); // Set logged-in state to true
            console.log('Login successful for', email);

            // Redirect based on user role
            if (user.role === 'customer') {
                navigate('/products'); // Redirect to the product list
            } else if (user.role === 'admin') {
                navigate('/admin'); // Redirect to the admin dashboard
            }
        } catch (error) {
            setError('Invalid email or password'); // Set the error message
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
                <Form.Group controlId="formRole" className="mt-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Control 
                        as="select" 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)} 
                        required
                    >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-4">
                    Login
                </Button>
            </Form>
        </Container>
    );
}

export default Login;
