import React, { useState } from 'react';
import CartItem from '../components/CartItem';
import "../App.css";
import "../design/Cart.css";
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [clientInfo, setClientInfo] = useState({
        fullName: '',
        address: '',
        city: '',
        zip: '',
        email: '',
        phone: ''
    });

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClientInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Client Information:', clientInfo);
    };

    return (
        <div className="cart">
            <div className="items-in-cart">
            <b className="title">Shopping Cart</b>
            <Link to="/shop" style={{textDecoration: 'none'}}>
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
            <form className="client-info-form" onSubmit={handleSubmit}>
                <h2>Enter your name and address:</h2>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name:</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={clientInfo.fullName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={clientInfo.address}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={clientInfo.city}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="zip">Zip Code:</label>
                    <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={clientInfo.zip}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <h2>What's your contact information?</h2>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={clientInfo.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input
                        className="input"
                        type="tel"
                        id="phone"
                        name="phone"
                        value={clientInfo.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </form>

            <button type="submit"
                    className="btn btn-primary d-flex align-items-center justify-content-center button" style={{margin:"50px"}}>Submit Order
            </button>
        </div>
    );
};

export default Cart;
