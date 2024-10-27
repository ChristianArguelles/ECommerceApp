import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ViewProduct({ searchTerm, triggerSearch }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading to false once the fetch is complete
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            axios.delete(`http://localhost:8000/api/products/${id}`)
                .then(() => {
                    setProducts(products.filter(product => product.id !== id)); // Update the product list
                    console.log('Product deleted:', id);
                })
                .catch(error => {
                    console.error('Error deleting product:', error);
                });
        }
    };

    // Filter products based on search term
    const filteredProducts = triggerSearch
        ? products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : products;

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
                    {loading ? ( // Show loading message while fetching
                        <tr>
                            <td colSpan="5" className="text-center">Loading...</td>
                        </tr>
                    ) : filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.stocks > 0 ? product.stocks : 'Out Of Stock'}</td> {/* Display 'Out Of Stock' if stocks are 0 */}
                                <td>
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
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No products found.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
}


export default ViewProduct;
