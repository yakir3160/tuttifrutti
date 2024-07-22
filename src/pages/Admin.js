// client/src/components/Admin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    // Fetch orders from the backend
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/orders');
                setOrders(response.data);
            } catch (error) {
                setError('Failed to fetch orders.');
            }
        };

        fetchOrders();
    }, []);

    // Handle adding a product
    const handleAddProduct = async (event) => {
        event.preventDefault();

        if (!productName || !productPrice || !productImage) {
            setError('All fields are required');
            return;
        }

        const formData = new FormData();
        formData.append('name', productName);
        formData.append('pricePerKg', productPrice);
        formData.append('image', productImage);

        try {
            await axios.post('http://localhost:5000/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setProductName('');
            setProductPrice('');
            setProductImage(null);
            setError('');
            toast.success('Product added successfully');
        } catch (error) {
            setError('Failed to add product.');
            toast.error('Failed to add product.');
        }
    };

    return (
        <div className="title">
            <h1>Admin Panel</h1>

            <section className="add-product">
                <h2>Add Product</h2>
                <form onSubmit={handleAddProduct}>
                    <div className="form-group">
                        <label htmlFor="productName">Product Name:</label>
                        <input
                            type="text"
                            id="productName"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productPrice">Price Per Kg:</label>
                        <input
                            type="number"
                            id="productPrice"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productImage">Product Image:</label>
                        <input
                            type="file"
                            id="productImage"
                            accept=".jpg,.jpeg,.png"
                            onChange={(e) => setProductImage(e.target.files[0])}
                            required
                        />
                    </div>
                    <button type="submit">Add Product</button>
                </form>
                {error && <p className="error">{error}</p>}
            </section>

            <section className="orders">
                <h2>All Orders</h2>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <ul>
                        {orders.map(order => (
                            <li key={order._id}>
                                <p>Order ID: {order._id}</p>
                                <p>Customer Name: {order.customerName}</p>
                                <p>Total Price: ₪{order.totalPrice.toFixed(2)}</p>
                                <p>Items:</p>
                                <ul>
                                    {order.items.map((item, index) => (
                                        <li key={index}>
                                            {item.name} - Quantity: {item.quantity}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
            <ToastContainer />
        </div>
    );
};

export default Admin;
