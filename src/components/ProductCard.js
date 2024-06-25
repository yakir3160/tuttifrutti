import React, { useState, useEffect } from 'react';
import { BsCartPlus } from 'react-icons/bs';
import "../App.css";
import "../design/ProductCard.css";

const ProductCard = (props) => {

    const { className = "", onAddToCart } = props;

    const [quantity, setQuantity] = useState(0.5);
    const pricePerKg = 5;
    const title = "Card title";
    const image = "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202312/6-fruits-to-eat-on-empty-stomach-053937965-1x1.jpg?VersionId=xIXuT3WPQa4V8dHjQllmefHlDH1mfNDw";

    const handleIncrease = () => {
        if (quantity < 20) setQuantity(quantity + 0.5);
    };

    const handleDecrease = () => {
        if (quantity > 0.5) setQuantity(quantity - 0.5);
    };

    const handleAddToCart = () => {
        onAddToCart({
            productId: '667ac1e43b3ca0db9606d64a',
            quantity: parseFloat(quantity.toFixed(1)),
            pricePerKg: pricePerKg
        });
    };

    const totalPrice = (quantity * pricePerKg).toFixed(2);

    return (
        <div className={`card ${className}`}>
            <div className="img-container">
                <img src={image} className="card-img" alt="Product" />
            </div>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <span style={{fontSize: "16px", fontWeight: "bold", padding:"10px"}}>
                    kg: ₪{pricePerKg.toFixed(2)}
                </span>

                <div className="quantity-control">
                    <button onClick={handleDecrease} className="btn btn-secondary">-</button>
                    <span className="quantity-label">{quantity.toFixed(1)} kg</span>
                    <button onClick={handleIncrease} className="btn btn-secondary">+</button>
                </div>
                <div className="price-info">
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