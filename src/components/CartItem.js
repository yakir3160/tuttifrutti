import React from 'react';
import "../design/CartItem.css";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
    const { id, name, quantity, pricePerKg } = item;
    const itemTotalPrice = (quantity * pricePerKg).toFixed(2);

    return (
        <div className="cart-item">
            <img className="cart-item-img" src={`http://localhost:3002/uploads/${item.image}`}/>
            <div className="cart-item-name">{name}</div>
            <div className="cart-item-details">
                <div>
                    <span>Price per KG: ₪{pricePerKg.toFixed(2)}</span>
                </div>
                <div>
                    <span style={{fontSize: "1.2rem", fontWeight: 600}}>Total: ₪{itemTotalPrice}</span>
                </div>
            </div>
            <div className="quantity-control">
                <button onClick={() => onDecrease(id)} className="btn btn-secondary">-</button>
                <span className="quantity-label">{quantity.toFixed(1)} kg</span>
                <button onClick={() => onIncrease(id)} className="btn btn-secondary">+</button>
            </div>
            <button
                onClick={() => onRemove(id)}
                className="button"
                style={{
                    color: "#ffffff",
                    alignItems: 'center',
                    margin: "10px",
                    width: "150px",
                    maxWidth:"fit-content",
                    justifyContent:"center"
                }}
            >
                Remove
            </button>
        </div>
    );
};

export default CartItem;
