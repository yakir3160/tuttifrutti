import Navigation from "./components/Navigation";

import Footer from "./components/Footer";
import {Outlet} from "react-router-dom";


const Layout = () => {
    return (
        <>
            <div className="App">
                <Navigation />
                <div className="app-container">
                    <Outlet/>
                </div>
                <Footer />
            </div>

        </>
    );
}
export default Layout;