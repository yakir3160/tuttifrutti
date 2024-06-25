import ProductCard from "./ProductCard";
import "../design/NewProducts.css";

const NewProducts = ({ className = "", onAddToCart }) => {
    return (
        <div className={`new-products ${className}`}>
            <div className="new-on-the">New on the shelf</div>
            <ProductCard onAddToCart={onAddToCart} />
        </div>
    );
};

export default NewProducts;