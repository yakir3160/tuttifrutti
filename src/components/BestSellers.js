import React, { useState, useEffect } from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductCard from "./ProductCard";
import "../design/BestSellers.css";
import axios from "axios";

const BestSellers = ({ className = "", addToCart,triggerCartAnimation}) => {
    const [bestSellerProducts, setBestSellerProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBestSellers = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('http://localhost:3002/api/products/best-sellers');
                setBestSellerProducts(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching best sellers:", error);
                setError("Failed to load best sellers. Please try again later.");
                setIsLoading(false);
            }
        }
        fetchBestSellers();
    }, [])

    const productSlides = [];
    for (let i = 0; i < bestSellerProducts.length; i += 4) {
        productSlides.push(bestSellerProducts.slice(i, i + 4));
    }

    return (
        <>
            <div className="best-sellers1">Best Sellers</div>
            {isLoading ? (<div>Loading best sellers...</div>) : <div>{error}</div>}
            {bestSellerProducts && bestSellerProducts.length > 0 ? (
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
                                    triggerCartAnimation={triggerCartAnimation}
                                />
                            ))}
                        </div>
                    ))}
                </Carousel>
            ) : (
                <div>No best sellers available at the moment.</div>
            )}
        </>
    );
};

export default BestSellers;
