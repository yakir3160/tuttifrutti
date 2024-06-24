import React, { useState } from 'react';
import CartItem from '../components/CartItem';
import "../App.css";
import "../design/Cart.css";
import {Link} from "react-router-dom";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    const handleIncrease = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 0.5 } : item
            )
        );
    };

    const handleDecrease = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.quantity > 0.5
                    ? { ...item, quantity: item.quantity - 0.5 }
                    : item
            )
        );
    };

    const handleRemove = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.quantity * item.pricePerKg,
        0
    ).toFixed(2);

    return (
        <div className="cart">
            <h2>Shopping Cart</h2>
            <Link to={"/shop"} style={{textDecoration: "none"}}>
                <button className="button">
                    <div className="start-shopping">Continue Shopping</div>
                </button>
            </Link>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onIncrease={handleIncrease}
                            onDecrease={handleDecrease}
                            onRemove={handleRemove}
                        />
                    ))}
                    <div className="cart-total">
                        <span>Total Price: ₪{totalPrice}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
