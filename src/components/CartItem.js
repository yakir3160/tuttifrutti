import React from 'react';
import "../design/CartItem.css";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
    const { id, name, quantity, pricePerKg, image } = item;

    // Ensure pricePerKg is a number
    const price = Number(pricePerKg) || 0;
    const itemTotalPrice = quantity * price;

    return (
        <div className="cart-item">
            <img className="cart-item-img" src={`http://localhost:3002/uploads/${image}`} alt={name}/>
            <div className="cart-item-name">{name}</div>
            <div className="cart-item-details">
                <div className="total">
                    <span style={{fontSize: "14px", fontWeight: 700}}>Price per KG: ₪{price.toFixed(2)}</span>
                </div>
                <div className="total">
                    <span style={{fontSize: "16px", fontWeight: 700}}>Total: ₪{itemTotalPrice.toFixed(2)}</span>
                </div>
            </div>
            <div className="quantity-control">
                <button onClick={() => onDecrease(id)} className="btn btn-secondary">-</button>
                <div className="quantity-label">{quantity.toFixed(2)} kg</div>
                <button onClick={() => onIncrease(id)} className="btn btn-secondary">+</button>
            </div>
            <button
                onClick={() => onRemove(id)}
                className="button"
            >
                Remove
            </button>
        </div>
    );
};

export default CartItem;