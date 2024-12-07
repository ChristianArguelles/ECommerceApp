//Dashboard.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchBy, setSearchBy] = useState('all'); // Default to show all products
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/product');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        const productsList = Array.isArray(data) ? data : data.data || [];
        setProducts(productsList);
        setFilteredProducts(productsList);

        // Extract unique categories from products
        const uniqueCategories = [
          ...new Set(productsList.map((product) => product.category).filter((cat) => cat)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = () => {
    if (searchBy === 'all') {
      setFilteredProducts(products); // Show all products
    } else if (searchBy === 'name') {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else if (searchBy === 'category') {
      setFilteredProducts(products.filter((product) => product.category === searchTerm));
    }
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      fetch('http://localhost:8000/api/product/' + id, { method: 'DELETE' })
        .then((response) => response.json())
        .then(() => {
          setProducts(products.filter((product) => product.id !== id));
          setFilteredProducts(filteredProducts.filter((product) => product.id !== id));
        })
        .catch((err) => setError('Failed to delete product'));
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#333', margin: '0' }}>Product Dashboard</h1>

        <Link to="/add-product">
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Add Product
          </button>
        </Link>
      </div>

      {/* Search Section */}
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div>
          <label>
            <input
              type="radio"
              name="searchBy"
              value="all"
              checked={searchBy === 'all'}
              onChange={() => {
                setSearchBy('all');
                setSearchTerm('');
                handleSearch(); // Show all products 
              }}
            />
            Show All
          </label>
          <label style={{ marginLeft: '10px' }}>
            <input
              type="radio"
              name="searchBy"
              value="name"
              checked={searchBy === 'name'}
              onChange={() => {
                setSearchBy('name');
                setSearchTerm('');
              }}
            />
            Search by Name
          </label>
          <label style={{ marginLeft: '10px' }}>
            <input
              type="radio"
              name="searchBy"
              value="category"
              checked={searchBy === 'category'}
              onChange={() => {
                setSearchBy('category');
                setSearchTerm('');
              }}
            />
            Search by Category
          </label>
        </div>

        {searchBy === 'name' && (
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        )}
        {searchBy === 'category' && (
          <select
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        )}

        {searchBy !== 'all' && (
          <button
            onClick={handleSearch}
            style={{
              padding: '8px 15px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Search
          </button>
        )}
      </div>

      {loading && <p style={{ fontSize: '18px', color: '#666' }}>Loading products...</p>}
      {error && <p style={{ fontSize: '18px', color: 'red' }}>{error}</p>}
      {!loading && !error && filteredProducts.length > 0 && (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
          }}
        >
          <thead style={{ backgroundColor: '#007bff', color: 'white' }}>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>Barcode</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>Price</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>Stock</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', width: '230px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '12px', textAlign: 'center' }}>{product.barcode}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{product.name}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>${parseFloat(product.price).toFixed(2)}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{product.quantity}</td>
                <td style={{ padding: '12px', textAlign: 'center', width: '150px' }}>
                  <Link to={`/edit-product/${product.id}`}>
                    <button
                      style={{
                        marginRight: '5px',
                        padding: '5px 15px',
                        backgroundColor: '#4caf50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={{
                      marginRight: '5px',
                      padding: '5px 15px',
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                  <Link to={`/view-product/${product.id}`}>
                    <button
                      style={{
                        padding: '5px 15px',
                        backgroundColor: '#17a2b8',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && !error && filteredProducts.length === 0 && (
        <p style={{ fontSize: '18px', color: '#666', textAlign: 'center' }}>No products found.</p>
      )}
    </div>
  );
};

export default Dashboard;