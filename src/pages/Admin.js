// client/src/components/Admin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../design/Admin.css"

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
                console.log('Fetching orders...');
                const response = await axios.get('http://localhost:3002/api/orders');
                console.log('Orders fetched:', response.data);
                setOrders(response.data);
                response.data.forEach((order, index) => {
                    console.log(`Order ${index + 1}:`);
                    console.log('ID:', order._id);
                    console.log('Customer:', order.customerInfo?.fullName);
                    console.log('Total Price:', order.totalPrice);
                    console.log('Items:', order.products);
                    console.log('---');
                });
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Failed to fetch orders: ' + error.message);
            }
        };

        fetchOrders();
    }, []);
    console.log('Current orders state:', orders);

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
            await axios.post('http://localhost:3002/api/products', formData, {
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
        <div className="admin">
            <h1 className="title">Admin Panel</h1>

            <section className="add-product">
                <h2>Add Product</h2>
                <form style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}
                      onSubmit={handleAddProduct}>
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
                    <button className="btn btn-primary d-flex align-items-center justify-content-center button"
                            type="submit">Add Product
                    </button>
                    {error && <p className="error">{error}</p>}
                </form>

            </section>

            <section className="orders">
                <h2>All Orders</h2>
                {error && <p className="error">{error}</p>}
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <ul>
                        {orders.map(order => (
                            <li key={order._id}>
                                <p>Order ID: {order._id}</p>
                                <p>Customer Name: {order.customerInfo?.fullName || 'N/A'}</p>
                                <p>Total Price: ₪{(order.totalPrice || 0).toFixed(2)}</p>
                                <p>Products:</p>
                                {Array.isArray(order.products) && order.products.length > 0 ? (
                                    <ul>
                                        {order.products.map((product, index) => (
                                            <li key={index}>
                                                {product.name || 'Unknown Product'} -
                                                Quantity: {product.quantity || 'N/A'},
                                                Price per Kg: ₪{(product.pricePerKg || 0).toFixed(2)}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No products found for this order.</p>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
            <ToastContainer/>
        </div>
    );
};

export default Admin;
