import ProductCard from "./ProductCard";
import "../design/NewProducts.css";
import React from "react";
import {Carousel} from "react-responsive-carousel";

const NewProducts = ({ className = "", addToCart  }) => {
    return (
        <>
            <div className="new-on-the">New on the shelf</div>
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

export default NewProducts;
