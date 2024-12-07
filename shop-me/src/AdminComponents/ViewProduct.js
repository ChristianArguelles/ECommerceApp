//ViewProduct.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function View() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/api/product/${id})";
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '18px' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</div>;
  }

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '50px auto',
        padding: '30px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          color: '#333',
          marginBottom: '20px',
          borderBottom: '2px solid #007BFF',
          paddingBottom: '10px',
        }}
      >
        Product Details
      </h2>

      {product && (
        <div style={{ marginBottom: '20px', lineHeight: '1.6', fontSize: '16px', color: '#555' }}>
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#007BFF' }}>Product Name:</strong> {product.name}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#007BFF' }}>Barcode:</strong> {product.barcode}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#007BFF' }}>Quantity:</strong> {product.quantity}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#007BFF' }}>Description:</strong> {product.description}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#007BFF' }}>Price:</strong> ${product.price}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#007BFF' }}>Category:</strong> {product.category}
          </div>
        </div>
      )}

      <Link to="/dashboard" style={{ textDecoration: 'none' }}>
        <button
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            textAlign: 'center',
          }}
        >
          Back to Dashboard
        </button>
      </Link>
    </div>
  );
}

export default View;