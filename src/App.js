import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import LandingPage from './pages/LandingPage';
import Shop from './pages/Shop';
import Cart from './pages/Cart';


const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Layout />}>
                        <Route index element={<LandingPage />} />
                        <Route path={'shop'} element={<Shop />} />
                        <Route path={'cart'} element={<Cart />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
