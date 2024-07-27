import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import "../design/Admin.css"

const Orders = ({ orders, setOrderStatus, error }) => {
    const sortOrders = (orders) => {
        return orders.sort((a, b) => {
            if (a.status === 'closed' && b.status !== 'closed') return 1;
            if (b.status === 'closed' && a.status !== 'closed') return -1;
            return 0;
        });
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
        <section className="orders">
            <h2>All Orders</h2>
            {error && <p className="error">{error}</p>}
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <>
                    {/* Processing Orders */}
                    <div>
                        <h3>Processing</h3>
                        <ul>
                            {sortOrders(orders).filter(order => order.status === 'processing').map(order => (
                                <li key={order._id} className={`order-item ${order.status === 'closed' ? 'closed' : ''}`}>
                                    <div className="order-info">
                                        <p>Order ID: {order._id}</p>
                                        <p>Customer Name: {order.customerInfo?.fullName || 'N/A'}</p>
                                        <p>Address: {order.customerInfo.address} {order.customerInfo.city} {order.customerInfo.zip}</p>
                                        <div className="order-status">
                                            <label htmlFor={`status-${order._id}`}>Status: </label>
                                            <select
                                                style={{ padding: "10px", background: "#fff6f6" }}
                                                id={`status-${order._id}`}
                                                value={order.status}
                                                onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                            >
                                                <option value="processing">Processing</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="closed">Closed</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="order-products">
                                        <p style={{ fontSize: "20px", fontWeight: "600" }}>Products:</p>
                                        {Array.isArray(order.products) && order.products.length > 0 ? (
                                            <ul>
                                                {order.products.map((product, index) => (
                                                    <li key={index}>
                                                        {product.name || 'Unknown Product'} - Quantity: {product.quantity || 'N/A'}, Price per Kg: ₪{(product.pricePerKg || 0).toFixed(2)}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No products found for this order.</p>
                                        )}
                                        <p style={{ fontSize: "30px", fontWeight: "600" }}>Total Price: ₪{(order.totalPrice || 0).toFixed(2)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Shipped Orders */}
                    <div>
                        <h3>Shipped</h3>
                        <ul>
                            {sortOrders(orders).filter(order => order.status === 'shipped').map(order => (
                                <li key={order._id} className={`order-item ${order.status === 'closed' ? 'closed' : ''}`}>
                                    <div className="order-info">
                                        <p>Order ID: {order._id}</p>
                                        <p>Customer Name: {order.customerInfo?.fullName || 'N/A'}</p>
                                        <p>Address: {order.customerInfo.address} {order.customerInfo.city} {order.customerInfo.zip}</p>
                                        <div className="order-status">
                                            <label htmlFor={`status-${order._id}`}>Status: </label>
                                            <select
                                                style={{ padding: "10px", background: "#fff6f6" }}
                                                id={`status-${order._id}`}
                                                value={order.status}
                                                onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                            >
                                                <option value="processing">Processing</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="closed">Closed</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="order-products">
                                        <p style={{ fontSize: "20px", fontWeight: "600" }}>Products:</p>
                                        {Array.isArray(order.products) && order.products.length > 0 ? (
                                            <ul>
                                                {order.products.map((product, index) => (
                                                    <li key={index}>
                                                        {product.name || 'Unknown Product'} - Quantity: {product.quantity || 'N/A'}, Price per Kg: ₪{(product.pricePerKg || 0).toFixed(2)}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No products found for this order.</p>
                                        )}
                                        <p style={{ fontSize: "30px", fontWeight: "600" }}>Total Price: ₪{(order.totalPrice || 0).toFixed(2)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Closed Orders */}
                    <div>
                        <h3>Closed</h3>
                        <ul>
                            {sortOrders(orders).filter(order => order.status === 'closed').map(order => (
                                <li key={order._id} className={`order-item ${order.status === 'closed' ? 'closed' : ''}`}>
                                    <div className="order-info">
                                        <p>Order ID: {order._id}</p>
                                        <p>Customer Name: {order.customerInfo?.fullName || 'N/A'}</p>
                                        <p>Address: {order.customerInfo.address} {order.customerInfo.city} {order.customerInfo.zip}</p>
                                    </div>
                                    <div className="order-products">
                                        <p style={{ fontSize: "20px", fontWeight: "600" }}>Products:</p>
                                        {Array.isArray(order.products) && order.products.length > 0 ? (
                                            <ul>
                                                {order.products.map((product, index) => (
                                                    <li key={index}>
                                                        {product.name || 'Unknown Product'} - Quantity: {product.quantity || 'N/A'}, Price per Kg: ₪{(product.pricePerKg || 0).toFixed(2)}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No products found for this order.</p>
                                        )}
                                        <p style={{ fontSize: "30px", fontWeight: "600" }}>Total Price: ₪{(order.totalPrice || 0).toFixed(2)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </section>
    );
};

export default Orders;
