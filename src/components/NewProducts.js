import ProductCard from "./ProductCard";
import "../design/NewProducts.css";

const NewProducts = ({ className = "" }) => {
    return (
        <div className={`new-products ${className}`}>
            <div className="new-on-the">New on the shelf</div>
            <ProductCard/>

        </div>
    );
};

export default NewProducts;
