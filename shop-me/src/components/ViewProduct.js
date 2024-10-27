import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function ViewProduct() {
    const [products, setProducts] = useState([]);
    //const navigate = useNavigate(); 

    useEffect(() => {
        axios.get('http://localhost:8000/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            axios.delete(`http://localhost:8000/api/products/${id}`)
                .then(() => {
                    // After successful deletion, refresh the product list
                    setProducts(products.filter(product => product.id !== id));
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
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default ViewProduct;