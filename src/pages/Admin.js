import React, { useState, useEffect } from 'react';
import AddProduct from '../components/AddProduct';
import Orders from '../components//Orders';
import Products from '../components//Products';
import axios from 'axios';
import "../design/Admin.css"
import { toast } from 'react-toastify';

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [orderStatus, setOrderStatus] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3002/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3002/api/orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchProducts();
        fetchOrders();
    }, []);

    return (
        <div className="admin-container">
            <div className="admin-container2">
                <AddProduct setProducts={setProducts} setError={setError} />
                <Orders orders={orders} setOrderStatus={setOrderStatus} error={error} />
            </div>
            <Products products={products} setProducts={setProducts} setError={setError} />
        </div>
    );
};

export default Admin;
