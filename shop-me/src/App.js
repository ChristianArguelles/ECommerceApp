// App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import ViewProduct from './components/ViewProduct';
import UpdateProduct from './components/UpdateProduct'; // New component for updating products
import Login from './components/Login'; // Import Login component
import Register from './components/Register'; // Import Register component

function App() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear token on logout
        console.log('Logged out');
    };
    return (
        <Router>
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand href="/">SHOP ME</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/">Product List</Nav.Link>
                                <Nav.Link href="/add">Add Product</Nav.Link>
                                <Nav.Link href="/login">Login</Nav.Link> {/* Link to login */}
                                <Nav.Link href="/register">Register</Nav.Link> {/* Link to register */}
                            </Nav>
                            <Form className="d-flex me-2">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                            <Nav>
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Routes>
                    <Route path="/" element={<ViewProduct />} />
                    <Route path="/add" element={<AddProduct />} />
                    <Route path="/update/:id" element={<UpdateProduct />} />
                    <Route path="/login" element={<Login />} /> {/* Route for login */}
                    <Route path="/register" element={<Register />} /> {/* Route for registration */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
