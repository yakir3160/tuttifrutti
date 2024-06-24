
import "../design/Footer.css"
import "../App.css"
import {Link} from "react-router-dom";
import React from "react";

const Footer = () => {
    return (
        <section className={`navigation-footer`}>
            <div className="footer-divider">
                <div className="divider" />
            </div>
            <div className="footer-content">
                <Link to={"/"} style={{textDecoration:'none'}}>
                    <h2 className="Logo-font">Tutti Frutti</h2>
                </Link>
            </div>
        </section>
    );
};


export default Footer;
