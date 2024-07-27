import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import "../design/Admin.css"

const AddProduct = ({ setProducts, setError }) => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState(null);

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
            setProductName('');
            setProductPrice('');
            setProductImage(null);
            setError('');
            toast.success('Product added successfully');
            setProducts(prevProducts => [...prevProducts, response.data]);
        } catch (error) {
            console.error('Error adding product:', error.response ? error.response.data : error.message);
            setError('Failed to add product: ' + (error.response ? error.response.data.error : error.message));
            toast.error('Failed to add product.');
        }
    };

    return (
        <section className="add-product">
            <h2>Add Product</h2>
            <form
                style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}
                onSubmit={handleAddProduct}
            >
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
                <button
                    className="btn btn-primary d-flex align-items-center justify-content-center button"
                    type="submit"
                >
                    Add Product
                </button>
            </form>
        </section>
    );
};

export default AddProduct;
