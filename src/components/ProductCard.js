import React, { useState } from 'react';
import { BsCartPlus } from 'react-icons/bs';
import "../App.css";
import "../design/ProductCard.css";

const ProductCard = ({ className = "", onAddToCart }) => {
    const [quantity, setQuantity] = useState(0.5);
    const pricePerKg = 5;
    const title = "Card title";
    const image = "https://via.placeholder.com/150";

    const handleIncrease = () => {
        if (quantity < 20) setQuantity(quantity + 0.5);
    };

    const handleDecrease = () => {
        if (quantity > 0.5) setQuantity(quantity - 0.5);
    };

    const handleAddToCart = () => {
        const product = {
            id: 1,
            title,
            pricePerKg,
            image,
            quantity: parseFloat(quantity.toFixed(1))
        };
        onAddToCart(product); // Invoke callback to add product to cart in Shop component
    };

    const totalPrice = (quantity * pricePerKg).toFixed(2);

    return (
        <div className={`card ${className}`}>
            <div className="img-container">
                <img src={image} className="card-img-top" alt="Product" />
            </div>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <span style={{fontSize: "16px", fontWeight: "bold", marginBottom: "-30px"}}>
                    KG: ₪{pricePerKg.toFixed(2)}
                </span>
                <br/>
                <div className="quantity-control">
                    <button onClick={handleDecrease} className="btn btn-secondary">-</button>
                    <span className="quantity-label">{quantity.toFixed(1)} kg</span>
                    <button onClick={handleIncrease} className="btn btn-secondary">+</button>
                </div>
                <div className="price-info" style={{display: 'flex', flexDirection: 'column'}}>
                    <span>Total price: </span>
                    <span style={{fontSize: "16px", fontWeight: "bold"}}> ₪{totalPrice}</span>
                </div>
                <div className="d-grid gap-2" style={{paddingTop: '20px'}}>
                    <button onClick={handleAddToCart}
                            className="btn btn-primary d-flex align-items-center justify-content-center button">
                        <BsCartPlus className="me-2"/> Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
