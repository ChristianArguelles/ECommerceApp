import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Table, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ViewProduct() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch all products on initial load
        fetchProducts();
    }, []);

    // Function to fetch all products
    const fetchProducts = () => {
        axios.get('http://localhost:8000/api/products')
            .then(response => {
                setProducts(response.data);
                setMessage(''); // Clear any previous messages
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    // Handle delete action
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            axios.delete(`http://localhost:8000/api/products/${id}`)
                .then(() => {
                    // Refresh the product list after deletion
                    setProducts(products.filter(product => product.id !== id));
                    console.log('Product deleted:', id);
                })
                .catch(error => {
                    console.error('Error deleting product:', error);
                });
        }
    };

    // Handle search action
    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            fetchProducts(); // Reload all products if the search is empty
            return;
        }

        axios.get(`http://localhost:8000/api/products/search?query=${searchQuery}`)
            .then(response => {
                setProducts(response.data); // Show only the found product(s)
                setMessage(''); // Clear any previous "not found" messages
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    setProducts([]); // Clear the list if no product found
                    setMessage('Product not found'); // Display "not found" message
                } else {
                    console.error('Error searching product:', error);
                }
            });
    };

    return (
        <Container>
            <h1 className="text-center my-4">Product List</h1>
            
            {/* Search Bar */}
            <Form className="d-flex mb-4">
                <Form.Control
                    type="text"
                    placeholder="Search for a product..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="primary" onClick={handleSearch} className="ms-2">
                    Search
                </Button>
                <Button variant="secondary" onClick={fetchProducts} className="ms-2">
                    Clear
                </Button>
            </Form>
            
            {/* Display "Product not found" message */}
            {message && <p className="text-center text-danger">{message}</p>}

            {/* Product Table */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Stocks</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.stocks}</td>
                            <td>
                                <Button variant="primary" className="me-2" onClick={() => console.log('Add to Cart')}>
                                    Add to Cart
                                </Button>
                                <Link to={`/update/${product.id}`}>
                                    <Button variant="secondary" className="me-2">
                                        Update
                                    </Button>
                                </Link>
                                <Button variant="danger" onClick={() => handleDelete(product.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default ViewProduct;
