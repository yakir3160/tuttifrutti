import ProductCard from "./ProductCard";
import "../design/BestSellers.css";

const BestSellers = ({ className = "" }) => {
    return (

        <div className={`best-sellers ${className}`}>
            <div className="best-sellers1">Best Sellers</div>
            <div className="card-grid">
                <ProductCard/>
            </div>

        </div>
    );
};



export default BestSellers;
