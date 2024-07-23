import ProductCard from "./ProductCard";
import "../design/AllProducts.css";

const AllProducts = ({ className = "" , addToCart }) => {
    return (

        <>
            <div className="hero-cta1">
                <b className="all-products1">All products</b>
            </div>

            <div className="btn-group">
                <button className="btn btn-secondary dropdown-toggle button"
                        style={{borderRadius: "20px", background: "#6b0000", alignItems: "center"}} type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                    Sort By
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Price high to low</a></li>
                    <li><a className="dropdown-item" href="#">Price low to high</a></li>
                    <li><a className="dropdown-item" href="#">A-Z</a></li>
                </ul>
            </div>
            <div className={`shop-section-all ${className}`}>
                <ProductCard addToCart={addToCart}/>
                <ProductCard addToCart={addToCart}/>
                <ProductCard addToCart={addToCart}/>
                <ProductCard addToCart={addToCart}/>
                <ProductCard addToCart={addToCart}/>
                <ProductCard addToCart={addToCart}/>
                <ProductCard addToCart={addToCart}/>
                <ProductCard addToCart={addToCart}/>
                <ProductCard addToCart={addToCart}/>
            </div>

        </>
    );
};

export default AllProducts;
