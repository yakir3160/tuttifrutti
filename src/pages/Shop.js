import React, { useState , useCallback } from 'react';
import BestSellers from "../components/BestSellers";
import NewProducts from "../components/NewProducts";
import AllProducts from "../components/AllProducts";
import ProductCard from "../components/ProductCard";
import "../design/Shop.css";
import { useOutletContext } from 'react-router-dom';

const Shop = () => {
    const { addToCart } = useOutletContext();

    // const [cartItems, setCartItems] = useState([]);

    // const addToCart = useCallback((product) => {
    //     setCartItems(prevItems => {
    //         const existingItemIndex = prevItems.findIndex(item => item.productId === product.productId);
    //         if (existingItemIndex > -1) {
    //             // If the item already exists, update its quantity
    //             const updatedItems = [...prevItems];
    //             updatedItems[existingItemIndex].quantity += product.quantity;
    //             return updatedItems;
    //         } else {
    //             // If it's a new item, add it to the cart
    //             return [...prevItems, product];
    //         }
    //     });
    // }, []);

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
