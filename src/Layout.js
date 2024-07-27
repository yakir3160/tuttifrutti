import React, { useState, useCallback } from 'react';
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = useCallback((product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item._id === product._id);
            if (existingItem) {
                return prevItems.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + product.quantity }
                        : item
                );
            } else {
                return [...prevItems, product];
            }
        });
    }, []);

    const [cartAnimation, setCartAnimation] = useState(false);

    const triggerCartAnimation = () => {
        setCartAnimation(true);
        setTimeout(() => {
            setCartAnimation(false);
        }, 500); // Duration of the animation
    };

    return (
        <>
            <div className="App">
                <Navigation cartItems={cartItems} cartAnimation={cartAnimation} />
                <div className="app-container">
                    <Outlet context={{ cartItems, setCartItems, addToCart, triggerCartAnimation }} />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Layout;
