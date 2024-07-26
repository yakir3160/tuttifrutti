import React, { useState, useEffect } from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductCard from "./ProductCard";
import "../design/NewProducts.css";
import axios from "axios";

const NewProducts = ({ className = "", addToCart }) => {
    const [newProducts, setNewProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNewProducts = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('http://localhost:3002/api/products/new-products');
                setNewProducts(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching new products", error);
                setError("Failed to load new products. Please try again later.");
                setIsLoading(false);
            }
        }
        fetchNewProducts();
    }, [])

    const productSlides = [];
    for (let i = 0; i < newProducts.length; i += 4) {
        productSlides.push(newProducts.slice(i, i + 4));
    }

    if (isLoading) return <div>Loading new products...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <div className="new-on-the">New on the shelf</div>
            {newProducts && newProducts.length > 0 ? (
                <Carousel
                    className={`shop-section ${className}`}
                    showArrows={true}
                    showThumbs={false}
                    infiniteLoop={true}
                    autoPlay={true}
                    interval={5000}
                    stopOnHover={true}
                >
                    {productSlides.map((chunk, index) => (
                        <div key={index} className="carousel-slide">
                            {chunk.map(product => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    addToCart={addToCart}
                                />
                            ))}
                        </div>
                    ))}
                </Carousel>
            ) : (
                <div>No new products available at the moment.</div>
            )}
        </>
    );
};

export default NewProducts;
