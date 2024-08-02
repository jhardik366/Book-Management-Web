import React, { useState, useEffect, useContext } from 'react';
import { Steps, Button, Form, Radio } from 'antd';
import SearchHeader from './SearchHeader.jsx';
import EmptyShoppingCart from './EmptyShoppingCart.jsx';
import WrappedCheckoutOptions from './checkout/CheckoutOptions.jsx';
import WrappedAccountBillingDetails from './checkout/AccountBillingDetails.jsx';
import DeliveryDetails from './checkout/DeliveryDetails.jsx';
import { CartContext } from '../context/CartContext';
import './CheckoutPage.css';

const { Step } = Steps;

const DeliveryMethod = ({ next, prev }) => (
    <div>
        <Form layout="horizontal">
            <Form.Item label="Delivery Method">
                <Radio.Group>
                    <Radio value="standard">Standard</Radio>
                    <Radio value="express">Express</Radio>
                </Radio.Group>
            </Form.Item>
            <div className="buttons">
                <Button onClick={prev}>Previous</Button>
                <Button type="primary" onClick={next}>
                    Next
                </Button>
            </div>
        </Form>
    </div>
);

const PaymentMethod = ({ next, prev }) => (
    <div>
        <Form layout="horizontal">
            <Form.Item label="Payment Method">
                <Radio.Group>
                    <Radio value="creditCard">Credit Card</Radio>
                    <Radio value="paypal">PayPal</Radio>
                </Radio.Group>
            </Form.Item>
            <div className="buttons">
                <Button onClick={prev}>Previous</Button>
                <Button type="primary" onClick={next}>
                    Next
                </Button>
            </div>
        </Form>
    </div>
);

const ConfirmOrder = ({ prev }) => (
    <div>
        <h2>Confirm your order</h2>
        <div className="buttons">
            <Button onClick={prev}>Previous</Button>
            <Button type="primary">Place Order</Button>
        </div>
    </div>
);

const CheckoutPage = () => {
    const { cart } = useContext(CartContext);
    const [current, setCurrent] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [formData, setFormData] = useState({});
    const [userType, setUserType] = useState('signup');

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const next = () => setCurrent(current + 1);
    const prev = () => setCurrent(current - 1);

    const handleUpdateAddress = (address) => {
        setFormData({
            ...formData,
            address1: address,
        });
        next();
    };

    const steps = [
        {
            title: 'Checkout Options',
            content: (
                <WrappedCheckoutOptions
                    next={next}
                    setFormData={(data) => {
                        setFormData(data);
                        setUserType(data.email ? 'signin' : 'signup');
                    }}
                />
            ),
        },
        {
            title: 'Account Details',
            content: (
                <WrappedAccountBillingDetails
                    next={next}
                    prev={prev}
                    formData={formData}
                    userType={userType}
                    setFormData={setFormData}
                />
            ),
        },
        {
            title: 'Delivery Details',
            content: (
                <DeliveryDetails
                    next={next}
                    prev={prev}
                    savedAddress={formData.address1}
                    handleUpdateAddress={handleUpdateAddress}
                />
            ),
        },
        {
            title: 'Payment Method',
            content: <PaymentMethod next={next} prev={prev} />,
        },
        {
            title: 'Confirm Order',
            content: <ConfirmOrder prev={prev} />,
        },
    ];
    return (
        <>
            <SearchHeader hideSearchBar={true} />
            {cart.length === 0 ? (
                <EmptyShoppingCart />
            ) : (
                <div className="steps-container">
                    <Steps
                        current={current}
                        direction={isMobile ? 'vertical' : 'horizontal'}
                    >
                        {steps.map((item, index) => (
                            <Step key={index} title={item.title} />
                        ))}
                    </Steps>
                    <div className="steps-content">
                        {steps[current].content}
                    </div>
                </div>
            )}
        </>
    );
};

export default CheckoutPage;
