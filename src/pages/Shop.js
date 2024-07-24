import React, { useState , useCallback } from 'react';
import BestSellers from "../components/BestSellers";
import NewProducts from "../components/NewProducts";
import AllProducts from "../components/AllProducts";
import "../design/Shop.css";
import { useOutletContext } from 'react-router-dom';

const Shop = () => {
    const { addToCart } = useOutletContext();

    return (
        <div className="shop">
            <b className="title">Shop</b>
            <BestSellers addToCart={addToCart}/>
            <NewProducts addToCart={addToCart}/>
            <AllProducts addToCart={addToCart}/>
        </div>
    );
};

export default Shop;
