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
    const [orderStatus, setOrderStatus] = useState({});

    // Fetch orders from the backend
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                console.log('Fetching orders...');
                const response = await axios.get('http://localhost:3002/api/orders');
                console.log('Orders fetched:', response.data);
                setOrders(response.data)
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Failed to fetch orders: ' + error.message);
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
            const response = await axios.post('http://localhost:3002/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Server response:', response.data);
            setProductName('');
            setProductPrice('');
            setProductImage(null);
            setError('');
            toast.success('Product added successfully');
        } catch (error) {
            console.error('Error adding product:', error.response ? error.response.data : error.message);
            setError('Failed to add product: ' + (error.response ? error.response.data.error : error.message));
            toast.error('Failed to add product.');
        }
    };
    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await axios.put(`http://localhost:3002/api/orders/${orderId}/status`, { status: newStatus });
            setOrderStatus(prev => ({ ...prev, [orderId]: newStatus }));
            toast.success('Order status updated successfully');
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error('Failed to update order status');
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
                            <li key={order._id}
                                className={`order-item ${(orderStatus[order._id] || order.status) === 'closed' ? 'closed' : ''}`}
                                >
                                <div className="order-info">
                                    <p>Order ID: {order._id}</p>
                                    <p>Customer Name: {order.customerInfo?.fullName || 'N/A'}</p>
                                    <p>Address
                                        : {order.customerInfo.address}  {order.customerInfo.city} {order.customerInfo.zip}</p>
                                    <div className="order-status">
                                        <label htmlFor={`status-${order._id}`}>Status: </label>
                                        <select
                                            style={{padding:"10px",background:"#fff6f6"}}
                                            id={`status-${order._id}`}
                                            value={orderStatus[order._id] || order.status || 'processing'}
                                            onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                        >
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="closed">Closed</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="order-products">
                                    <p style={{fontSize:"20px",fontWeight:"600"}}>Products:</p>
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
                                    <p style={{fontSize:"30px",fontWeight:"600"}}>Total Price: ₪{(order.totalPrice || 0).toFixed(2)}</p>
                                </div>
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
