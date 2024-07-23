import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductCard from "./ProductCard";
import "../design/BestSellers.css";

const BestSellers = ({ className = "", addToCart  }) => {
    return (
        <>
            <div className="best-sellers1">Best Sellers</div>
            <Carousel
                className={`shop-section ${className}`}
                showArrows={true}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={5000}
                stopOnHover={true}
            >
                <div className="carousel-slide">
                    <ProductCard addToCart={addToCart }/>
                    <ProductCard addToCart={addToCart }/>
                    <ProductCard addToCart={addToCart }/>
                    <ProductCard addToCart={addToCart }/>
                </div>
                <div className="carousel-slide">
                    <ProductCard addToCart={addToCart }/>
                    <ProductCard addToCart={addToCart }/>
                    <ProductCard addToCart={addToCart }/>
                    <ProductCard addToCart={addToCart }/>
                </div>
            </Carousel>
        </>
    );
};

export default BestSellers;
