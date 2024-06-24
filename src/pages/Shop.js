import React, { useState } from 'react';
import BestSellers from "../components/BestSellers";
import NewProducts from "../components/NewProducts";
import AllProducts from "../components/AllProducts";
import Cart from "./Cart";
import ProductCard from "../components/ProductCard";
import "../design/Shop.css";

const Shop = () => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems(prevItems => [...prevItems, product]);
    };

    return (
        <div className="shop">
            <b className="shop1">Shop</b>
            <BestSellers />
            <NewProducts />
            <AllProducts />
            <ProductCard onAddToCart={addToCart} />
        </div>
    );
};

export default Shop;
