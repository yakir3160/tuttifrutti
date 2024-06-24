import "../design/Navigation.css"
import {BsCart} from "react-icons/bs";
import React from "react";
import {Link} from "react-router-dom";



const Navigation = () => {
    return (
        <header className={'navigation'}>
            <Link to={"/"} style={{textDecoration:'none'}}>
                <h2 className="Logo-font">Tutti Frutti</h2>
            </Link>

            <div className="content">
                <div className="items">
                    <Link to={"cart"}  style={{textDecoration: 'none'}}>
                        <button className="button" style={{color: "#ffffff", alignItems: 'center'}}>
                            <BsCart className="me-2"/> My cart
                        </button>
                    </Link>

                </div>
            </div>
        </header>
    );
};

export default Navigation;