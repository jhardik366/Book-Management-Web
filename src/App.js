import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import CheckoutPage from './components/CheckoutPage.jsx';
import AdminMasterProductPage from './components/admin/AdminMasterProductPage.jsx';
import AdminProductPage from './components/admin/AdminProductPage.jsx';
import AlertInfoBanner from './components/AlertInfoBanner.jsx';
import Footer from './components/Footer.jsx';
import { CartProvider } from './context/CartContext.js';
import { LocationProvider } from './context/LocationContext.js';
import ProductPage from './components/ProductPage.jsx';
import NotFound from './components/NotFound.jsx';

function App() {
    return (
        <BrowserRouter>
            <LocationProvider>
                <AlertInfoBanner />
                <CartProvider>
                    <Routes>
                        <Route
                            caseSensitive
                            path="/"
                            element={<Home />}
                        ></Route>
                        <Route
                            caseSensitive
                            path="masterproduct/:masterProduct/:masterProductId"
                            element={<ProductGrid />}
                        ></Route>
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route
                            caseSensitive
                            path="masterproduct/:masterProduct/:masterProductId/product/:product/:productId"
                            element={<ProductPage />}
                        />
                        <Route
                            caseSensitive
                            path="/admin/masterproduct"
                            element={<AdminMasterProductPage />}
                        />
                        <Route
                            caseSensitive
                            path="/admin/product"
                            element={<AdminProductPage />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </CartProvider>
                <Footer />
            </LocationProvider>
        </BrowserRouter>
    );
}

export default App;
