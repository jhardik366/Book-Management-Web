import React from 'react';
import { Icon, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './EmptyShoppingCart.css';

const EmptyShoppingCart = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    const handleGoHome = () => {
        navigate('/'); // Navigate to the home page
    };

    return (
        <div className="empty-cart-container">
            <Icon type="shopping-cart" className="cart-icon"></Icon>
            <p>Your shopping cart is empty.</p>
            <div className="button-container">
                <Button type="primary" onClick={handleGoBack}>
                    Go Back
                </Button>
                <Button type="primary" onClick={handleGoHome}>
                    Go to Home
                </Button>
            </div>
        </div>
    );
};

export default EmptyShoppingCart;
