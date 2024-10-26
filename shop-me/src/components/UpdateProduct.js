import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Container, Alert } from 'react-bootstrap';

function UpdateProduct() {
    const { id } = useParams(); // Get product ID from the URL
    const [product, setProduct] = useState({ name: '', price: '', stocks: '' });
    const [error, setError] = useState(''); // Error message state
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the product data to populate the form
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error('Error fetching product data:', error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!product.name.trim()) {
            setError('Product name cannot be empty or blank.');
            return;
        }

        if (Number(product.price) < 1) {
            setError('Price must be at least 1.');
            return;
        }

        if (Number(product.stocks) < 0 || !Number.isInteger(Number(product.stocks))) {
            setError('Stocks must be a non-negative integer.');
            return;
        }

        // Check for out of stock condition
        //Add product status, pag zero out of stock
        const updatedProduct = {
            ...product,
            status: Number(product.stocks) === 0 ? 'Out of Stock' : 'Available' // Set status based on stock
        };

        // Submit the updated product data
        axios.put(`http://localhost:8000/api/products/${id}`, updatedProduct)
            .then(() => {
                console.log('Product updated successfully!');
                setError(''); // Clear error if successful
                navigate('/'); // Redirect to the product list after update
            })
            .catch(error => {
                console.error('Error updating product:', error);
                setError('An error occurred while updating the product.');
            });
    };

    return (
        <Container>
            <h1>Update Product</h1>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>} {/* Display error message */}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPrice" className="mt-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formStocks" className="mt-3">
                    <Form.Label>Stocks</Form.Label>
                    <Form.Control
                        type="number"
                        name="stocks"
                        value={product.stocks}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-4">
                    Update Product
                </Button>
            </Form>
        </Container>
    );
}

export default UpdateProduct;
