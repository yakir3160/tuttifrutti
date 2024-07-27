import React from 'react';
import "../design/CartItem.css";

const CartItem = ({ item, setCartItems }) => {
    const { id, name, quantity, pricePerKg, image } = item;

    const price = Number(pricePerKg) || 0;
    const itemTotalPrice = quantity * price;

    const handleIncrease = () => {
        setCartItems((prevItems) =>
            prevItems.map((prevItem) =>
                prevItem.id === id ? { ...prevItem, quantity: prevItem.quantity + 0.5 } : prevItem
            )
        );
    };

    const handleDecrease = () => {
        setCartItems((prevItems) =>
            prevItems.map((prevItem) =>
                prevItem.id === id && prevItem.quantity > 0.5
                    ? { ...prevItem, quantity: prevItem.quantity - 0.5 }
                    : prevItem
            )
        );
    };

    const handleRemove = () => {
        setCartItems((prevItems) => prevItems.filter((prevItem) => prevItem.id !== id));
    };

    return (
        <div className="cart-item">
            <img className="cart-item-img" src={`http://localhost:3002/uploads/${image}`} alt={name} />
            <div className="cart-item-name">{name}</div>
            <div className="cart-item-details">
                <div className="price-info">
                    Price per KG: ₪{price.toFixed(2)}
                </div>
                <div className="total-info">
                    Total: ₪{itemTotalPrice.toFixed(2)}
                </div>
            </div>
            <div className="quantity-control">
                <button onClick={handleDecrease} className="btn btn-secondary">-</button>
                <div className="quantity-label">{quantity.toFixed(2)} kg</div>
                <button onClick={handleIncrease} className="btn btn-secondary">+</button>
            </div>
            <button onClick={handleRemove} className="button">
                Remove
            </button>
        </div>
    );
};

export default CartItem;
