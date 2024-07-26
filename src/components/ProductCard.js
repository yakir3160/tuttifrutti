import React, { useState } from 'react';
import { BsCartPlus } from 'react-icons/bs';
import "../App.css";
import "../design/ProductCard.css";

const ProductCard = ({ className = "",addToCart, product = {} }) => {
    const [quantity, setQuantity] = useState(0.5);
    const { _id, name = "Product Name", pricePerKg = 0, image = "" } = product;
    //const pricePerKg = 5;
    //const title = "Card title";
    //const image = "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202312/6-fruits-to-eat-on-empty-stomach-053937965-1x1.jpg?VersionId=xIXuT3WPQa4V8dHjQllmefHlDH1mfNDw"      ;

    const handleIncrease = () => {
        if (quantity < 20) setQuantity(quantity + 0.5);
    };

    const handleDecrease = () => {
        if (quantity > 0.5) setQuantity(quantity - 0.5);
    };

    const handleAddToCart = () => {
        const productToAdd = {
            _id: product._id,
            name: product.name,
            pricePerKg: product.pricePerKg.toFixed(20),
            image: product.image,
            quantity: parseFloat(quantity.toFixed(1))
        };
        console.log('Adding to cart:', productToAdd);
        addToCart(productToAdd); // Invoke callback to add product to cart in Shop component
    };

    const totalPrice = (quantity * pricePerKg).toFixed(2);

    return (
        <div className={`card ${className}`}>
            <div className="img-container">
                <img src= {`http://localhost:3002/uploads/${image}`} className="card-img" alt={name} />
            </div>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <span style={{fontSize: "16px", fontWeight: "bold",padding:"10px"}}>
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
