import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ViewProduct({ searchTerm, triggerSearch }) {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        // Fetch all products initially
        axios.get('http://localhost:8000/api/products')
            .then(response => {
                setProducts(response.data);
                setFilteredProducts(response.data); // Initialize filtered products
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        if (triggerSearch) {
            // Filter products only when search is triggered
            const results = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(results);
        }
    }, [searchTerm, triggerSearch, products]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            axios.delete(`http://localhost:8000/api/products/${id}`)
                .then(() => {
                    // After successful deletion, refresh the product list
                    setProducts(products.filter(product => product.id !== id));
                    setFilteredProducts(filteredProducts.filter(product => product.id !== id)); // Update filtered products
                    console.log('Product deleted:', id);
                })
                .catch(error => {
                    console.error('Error deleting product:', error);
                });
        }
    };

    return (
        <Container>
            <h1 className="text-center my-4">Product List</h1>
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
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.stocks}</td>
                                <td>
                                    {/* Navigate to update product page */}
                                    <Link to={`/update/${product.id}`}>
                                        <Button variant="secondary" className="me-2">
                                            Update
                                        </Button>
                                    </Link>
                                    {/* Delete product */}
                                    <Button variant="danger" onClick={() => handleDelete(product.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No "{searchTerm}" in the list.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
}

export default ViewProduct;
