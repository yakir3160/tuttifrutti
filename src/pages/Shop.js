import React, { useState, useCallback } from 'react';
import axios from 'axios';
import BestSellers from "../components/BestSellers";
import NewProducts from "../components/NewProducts";
import AllProducts from "../components/AllProducts";
import "../design/Shop.css";

const Shop = () => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = useCallback(async (product) => {
        setCartItems(prevItems => [...prevItems, product]);

        try {
            const response = await axios.post('http://localhost:3002/api/orders', {
                user: '667ab4cd272f5056d062e790',
                products: [
                    {
                        product: product.productId,
                        quantity: product.quantity
                    }
                ],
                totalPrice: product.quantity * product.pricePerKg
            });
            console.log('Order created:', response.data);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    }, []);

    return (
        <div className="shop">
            <b className="title">Shop</b>
            <BestSellers onAddToCart={addToCart}/>
            <NewProducts onAddToCart={addToCart}/>
            <AllProducts onAddToCart={addToCart}/>
        </div>
    );
};

export default Shop;