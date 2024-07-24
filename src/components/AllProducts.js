import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from "./ProductCard";
import "../design/AllProducts.css";

const AllProducts = ({ className = "" , addToCart }) => {
    const [products, setProducts] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('http://localhost:3002/api/products');
            setProducts(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to fetch products. Please try again later.');
            setIsLoading(false);
        }
    };

    const sortProducts = (criteria) => {
        let sortedProducts = [...products];
        switch(criteria) {
            case 'priceHighToLow':
                sortedProducts.sort((a, b) => b.pricePerKg - a.pricePerKg);
                break;
            case 'priceLowToHigh':
                sortedProducts.sort((a, b) => a.pricePerKg - b.pricePerKg);
                break;
            case 'nameAZ':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }
        setProducts(sortedProducts);
        setSortBy(criteria);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    return (

        <>
            <div className="hero-cta1">
                <b className="all-products1">All products</b>
            </div>

            <div className="btn-group">
                <button className="btn btn-secondary dropdown-toggle button"
                        style={{borderRadius: "20px", background: "#6b0000", alignItems: "center"}} type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                    Sort By
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#" onClick={() => sortProducts('priceHighToLow')}>Price high
                        to low</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => sortProducts('priceLowToHigh')}>Price low
                        to high</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => sortProducts('nameAZ')}>A-Z</a></li>
                </ul>
            </div>
            <div className={`shop-section-all ${className}`}>
                {products.map(product => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        addToCart={addToCart}
                    />
                ))}
            </div>
        </>
    );
};

export default AllProducts;
