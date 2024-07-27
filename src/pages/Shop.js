import React from 'react';
import BestSellers from "../components/BestSellers";
import NewProducts from "../components/NewProducts";
import AllProducts from "../components/AllProducts";
import "../design/Shop.css";
import { useOutletContext } from 'react-router-dom';

const Shop = () => {
    const { addToCart, triggerCartAnimation } = useOutletContext();

    return (
        <div className="shop">
            <b className="title">Shop</b>
            <BestSellers addToCart={addToCart} triggerCartAnimation={triggerCartAnimation} />
            <NewProducts addToCart={addToCart} triggerCartAnimation={triggerCartAnimation} />
            <AllProducts addToCart={addToCart} triggerCartAnimation={triggerCartAnimation} />
        </div>
    );
};

export default Shop;
