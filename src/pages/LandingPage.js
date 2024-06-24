
import  "../design/Landing.css";
import  "../App.css"
import {Link} from "react-router-dom";

const LandingPage = () => {
    return (

        <div className="landing">
            <div className="image"></div>
            <div className="landing-text">
                <b className="tutti-frutti">Tutti Frutti</b>
                <div className="best-fruits-online">Best fruits online</div>
                <Link to={"shop"} style={{textDecoration: "none"}}>
                    <button className="button">
                        <div className="start-shopping">Start Shopping</div>
                    </button>
                </Link>
            </div>
        </div>

    );
};

export default LandingPage;
