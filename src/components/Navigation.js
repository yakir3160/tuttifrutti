import "../design/Navigation.css";
import React from "react";
import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";

const Navigation = ({ cartItems, cartAnimation }) => {
    const uniqueCartItemCount = cartItems.length;

    return (
        <header className={'navigation'}>
            <Link to={"/"} style={{ textDecoration: 'none' }}>
                <h2 className="Logo-font">Tutti Frutti</h2>
            </Link>

            <div className="content">
                <div className="items">
                    <Link to={"cart"} style={{ textDecoration: 'none' }}>
                        <button className={`button cart-button ${cartAnimation ? 'animate' : ''}`} style={{ color: "#ffffff", alignItems: 'center' ,minWidth:"140px"}}>
                            {uniqueCartItemCount === 0 ? (
                                <>
                                    <BsCart className="me-2"/> My cart
                                </>
                            ) : (
                                `${uniqueCartItemCount}  My cart`
                            )}
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navigation;
