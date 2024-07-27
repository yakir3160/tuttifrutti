import React, { useState } from 'react';
import { toast } from 'react-toastify';
import "../design/Admin.css";

const Products = ({ products, updateProductPrice, deleteProduct }) => {
    const [editingProduct, setEditingProduct] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(null);

    const handleEditPrice = (product) => {
        setEditingProduct({ ...product, editPrice: product.pricePerKg.toFixed(2) });
    };

    const handlePriceChange = (e) => {
        setEditingProduct({ ...editingProduct, editPrice: e.target.value });
    };

    const handleSavePrice = async () => {
        try {
            await updateProductPrice(editingProduct._id, parseFloat(editingProduct.editPrice));
            setEditingProduct(null);
            toast.success('Price updated successfully');
        } catch (error) {
            toast.error('Failed to update price');
        }
    };

    const confirmDeleteProduct = (productId) => {
        setShowConfirmDialog(productId);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteProduct(showConfirmDialog);
            toast.success('Product deleted successfully');
        } catch (error) {
            toast.error('Failed to delete product');
        }
        setShowConfirmDialog(null);
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
                                        value={editingProduct && editingProduct._id === product._id ? editingProduct.editPrice : product.pricePerKg.toFixed(2)}
                                        onChange={handlePriceChange}
                                        readOnly={!editingProduct || editingProduct._id !== product._id}
                                        step="0.1"
                                        className={`price-input ${editingProduct && editingProduct._id === product._id ? 'editing' : ''}`}
                                    />
                                    <button
                                        className="button"
                                        style={{ background: "#002281", maxWidth: "80px", margin: "5px" }}
                                        onClick={() => {
                                            if (editingProduct && editingProduct._id === product._id) {
                                                handleSavePrice();
                                            } else {
                                                handleEditPrice(product);
                                            }
                                        }}
                                    >
                                        {editingProduct && editingProduct._id === product._id ? 'Save' : 'Edit'}
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
                                            <button className="button btn-cancel" onClick={() => setShowConfirmDialog(null)}>No</button>
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