import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import Login from './components/Login';
import Register from './components/Register';
import UpdateProduct from './components/UpdateProduct';
import ViewProduct from './components/ViewProduct';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSearching, setIsSearching] = useState(false); // New state variable

    // Check if the user is logged in when the component mounts
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true); // User is logged in
        }
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = () => {
        setIsSearching(true); // Set searching to true on search
    };

    const handleShowList = () => {
        setIsSearching(false); // Reset searching state to show the full list
        setSearchTerm(''); // Clear search term to show all products
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear token on logout
        setIsLoggedIn(false); // Update logged-in state
        console.log('Logged out');
    };

    return (
        <Router>
            <Content 
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                handleSearchSubmit={handleSearchSubmit}
                handleShowList={handleShowList}
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
                isSearching={isSearching} // Pass the isSearching state
                setIsLoggedIn={setIsLoggedIn} // Pass the setIsLoggedIn state
            />
        </Router>
    );
}

function Content({ searchTerm, handleSearchChange, handleSearchSubmit, handleShowList, isLoggedIn, handleLogout, isSearching, setIsLoggedIn }) {
    const location = useLocation(); // Now inside the Router context

    // Determine if the current route is login or register
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">SHOP ME</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {isLoggedIn && (
                                <>
                                    <Nav.Link href="/">Product List</Nav.Link>
                                    <Nav.Link href="/add">Add Product</Nav.Link>
                                </>
                            )}
                            {!isLoggedIn && (
                                <>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                    <Nav.Link href="/register">Register</Nav.Link>
                                </>
                            )}
                        </Nav>
                        {!isAuthPage && isLoggedIn && (
                            <Form className="d-flex me-2" onSubmit={handleSearchSubmit}>
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <Button variant="outline-success" onClick={isSearching ? handleShowList : handleSearchSubmit}>
                                    {isSearching ? 'Show List' : 'Search'} {/* Change button text based on searching state */}
                                </Button>
                            </Form>
                        )}
                        {isLoggedIn && (
                            <Nav>
                                <Button
                                    onClick={handleLogout}
                                    className="ms-3"
                                    variant="danger"
                                >
                                    Logout
                                </Button>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Routes>
                <Route path="/" element={isLoggedIn ? <ViewProduct searchTerm={searchTerm} triggerSearch={isSearching} /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/add" element={isLoggedIn ? <AddProduct /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/update/:id" element={isLoggedIn ? <UpdateProduct /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
}

export default App;
