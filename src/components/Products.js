import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import "../design/Admin.css";

const Products = ({ products, setProducts, setError }) => {
    const [editingProduct, setEditingProduct] = useState(null);
    const [editPrice, setEditPrice] = useState('');
    const [showConfirmDialog, setShowConfirmDialog] = useState(null); // Store productId to show dialog
    const [productToDelete, setProductToDelete] = useState(null);

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:3002/api/products/${productId}`);
            setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
            toast.success('Product deleted successfully');
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Failed to delete product.');
        }
    };

    const confirmDeleteProduct = (productId) => {
        setProductToDelete(productId);
        setShowConfirmDialog(productId); // Show dialog for specific product
    };

    const handleConfirmDelete = () => {
        if (productToDelete) {
            handleDeleteProduct(productToDelete);
        }
        setProductToDelete(null);
        setShowConfirmDialog(null); // Hide dialog
    };

    const handleCancelDelete = () => {
        setProductToDelete(null);
        setShowConfirmDialog(null); // Hide dialog
    };

    const handleEditPrice = (productId, currentPrice) => {
        setEditingProduct(productId);
        setEditPrice(currentPrice.toString());
    };

    const handleSavePrice = async (productId) => {
        try {
            await axios.put(`http://localhost:3002/api/products/${productId}`, {
                pricePerKg: parseFloat(editPrice)
            });
            setProducts(products.map(p => p._id === productId ? { ...p, pricePerKg: parseFloat(editPrice) } : p));
            setEditingProduct(null);
            setEditPrice('');
            toast.success('Price updated successfully');
        } catch (error) {
            console.error('Error updating price:', error);
            toast.error('Failed to update price');
        }
    };

    return (
        <section className="products">
            <h2>Products</h2>
            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                <ul className="product-list">
                    {products.map(product => (
                        <li key={product._id} className="product-item">
                            <div className="product-details">
                                <span className="product-name">{product.name}</span>
                                <div className="price-control">
                                    <span className="price-label">Price per Kg: ₪</span>
                                    <input
                                        type="number"
                                        value={editingProduct === product._id ? editPrice : product.pricePerKg.toFixed(2)}
                                        onChange={(e) => {
                                            if (editingProduct === product._id) {
                                                setEditPrice(e.target.value);
                                            }
                                        }}
                                        readOnly={editingProduct !== product._id}
                                        step="0.1"
                                        className={`price-input ${editingProduct === product._id ? 'editing' : ''}`}
                                    />
                                    <button
                                        className="button"
                                        style={{ background: "#002281", maxWidth: "80px", margin: "5px" }}
                                        onClick={() => {
                                            if (editingProduct === product._id) {
                                                handleSavePrice(product._id);
                                            } else {
                                                handleEditPrice(product._id, product.pricePerKg);
                                            }
                                        }}
                                    >
                                        {editingProduct === product._id ? 'Save' : 'Edit'}
                                    </button>
                                    <button
                                        className="button btn-danger"
                                        style={{ maxWidth: "80px" }}
                                        onClick={() => confirmDeleteProduct(product._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            {showConfirmDialog === product._id && (
                                <div className="confirm-dialog-container">
                                    <div className="confirm-dialog">
                                        <p>Are you sure you want to delete this product?</p>
                                        <div className="button-container">
                                            <button className="button btn-danger" onClick={handleConfirmDelete}>Yes</button>
                                            <button className="button btn-cancel" onClick={handleCancelDelete}>No</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default Products;
