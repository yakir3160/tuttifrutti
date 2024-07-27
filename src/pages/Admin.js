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
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3002/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error('Failed to fetch products');
        }
    };

    const updateProductPrice = async (id, newPrice) => {
        try {
            const response = await axios.put(`http://localhost:3002/api/products/${id}`, { pricePerKg: newPrice });
            setProducts(prevProducts =>
                prevProducts.map(product =>
                    product._id === id ? { ...product, pricePerKg: newPrice } : product
                )
            );
            toast.success('Product price updated successfully');
        } catch (error) {
            console.error('Error updating product price:', error);
            toast.error('Failed to update product price');
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:3002/api/products/${id}`);
            setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
            toast.success('Product deleted successfully');
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Failed to delete product');
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-container2">
                <AddProduct setProducts={setProducts} setError={setError} />
                <Orders setOrders={setOrders} setError={setError} />
            </div>
            <Products
                products={products}
                updateProductPrice={updateProductPrice}
                deleteProduct={deleteProduct}
            />
        </div>
    );
};

export default Admin;