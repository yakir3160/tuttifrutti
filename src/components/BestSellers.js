import ProductCard from "./ProductCard";
import "../design/BestSellers.css";

const BestSellers = ({ className = "" }) => {
    return (

        <div className={`best-sellers ${className}`}>
            <div className="best-sellers1">Best Sellers</div>

                <ProductCard/>

        </div>
    );
};



export default BestSellers;
