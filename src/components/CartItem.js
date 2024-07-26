import React from 'react';
import "../design/CartItem.css";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
    const { id, name, quantity, pricePerKg } = item;
    const itemTotalPrice = (quantity * pricePerKg).toFixed(2);

    return (
        <div className="cart-item">
            <img className="cart-item-img" src={`http://localhost:3002/uploads/${item.image}`} alt={name}/>
            <div className="cart-item-name">{name}</div>
            <div className="cart-item-details">
                <div className="total">
                    <span  style={{fontSize: "14px", fontWeight: 700}}>Price per KG: ₪{pricePerKg.toFixed(2)}</span>
                </div>
                <div className="total">
                    <span style={{fontSize: "16px", fontWeight: 700}}>Total: ₪{itemTotalPrice}</span>
                </div>
            </div>
            <div className="quantity-control">
                <button onClick={() => onDecrease(id)} className="btn btn-secondary">-</button>
                <div className="quantity-label">{quantity.toFixed(1)} kg</div>
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
