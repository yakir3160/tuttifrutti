import React, { useState, useEffect } from 'react';
import AddProduct from '../components/AddProduct';
import Orders from '../components/Orders';
import Products from '../components/Products';
import axios from 'axios';
import "../design/Admin.css";
import { toast } from 'react-toastify';

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3002/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                toast.error('Failed to fetch products');
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="admin-container">
            <div className="admin-container2">
                <AddProduct setProducts={setProducts} setError={setError} />
                <Orders setOrders={setOrders} setError={setError} />
            </div>
            <Products products={products} setProducts={setProducts} setError={setError} />
        </div>
    );
};

export default Admin;
