import React from 'react';
import "../design/CartItem.css";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
    const { id, name, quantity, pricePerKg } = item;
    const itemTotalPrice = (quantity * pricePerKg).toFixed(2);

    return (
        <div className="cart-item">
            <h5>{name}</h5>
            <img src={`http://localhost:3002/uploads/${item.image}`}/>
            <div className="cart-item-details">
                <span>Price per KG: ₪{pricePerKg.toFixed(2)}</span>
                <span>Quantity: {quantity.toFixed(1)} kg</span>
                <span>Total: ₪{itemTotalPrice}</span>
            </div>
            <div className="quantity-control">
                <button onClick={() => onDecrease(id)} className="btn btn-secondary">-</button>
                <button onClick={() => onIncrease(id)} className="btn btn-secondary">+</button>
            </div>
            <button onClick={() => onRemove(id)} className="btn btn-danger">Remove</button>
        </div>
    );
};

export default CartItem;
