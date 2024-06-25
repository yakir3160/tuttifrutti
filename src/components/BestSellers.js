import ProductCard from "./ProductCard";
import "../design/BestSellers.css";

const BestSellers = ({ className = "", onAddToCart }) => {
    return (
        <div className={`best-sellers ${className}`}>
            <div className="best-sellers1">Best Sellers</div>
            <ProductCard onAddToCart={onAddToCart} />
        </div>
    );
};

export default BestSellers;