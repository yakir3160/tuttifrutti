import React, { useState } from 'react';
import BestSellers from "../components/BestSellers";
import NewProducts from "../components/NewProducts";
import AllProducts from "../components/AllProducts";
import ProductCard from "../components/ProductCard";
import "../design/Shop.css";

const Shop = () => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems(prevItems => [...prevItems, product]);
    };

    return (
        <div className="shop">
            <b className="title">Shop</b>
            <BestSellers />
            <NewProducts />
            <AllProducts />
        </div>
    );
};

export default Shop;
