import React from 'react';
import { Row, Col, Divider } from 'antd';
import './Footer.css'; // Import your CSS file for additional styling if needed

const Footer = () => {
    return (
        <footer className="footer">
            <Row gutter={24}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <div className="footer-column">
                        <h3>CUSTOMER SUPPORT</h3>
                        <ul>
                            <li>FAQ List</li>
                            <li>Order and Payment</li>
                            <li>Shipping and Tracking</li>
                            <li>Duties and Taxes</li>
                            <li>After-Sales Service</li>
                        </ul>
                    </div>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <div className="footer-column">
                        <h3>TERMS AND POLICY</h3>
                        <ul>
                            <li>Privacy Policy</li>
                            <li>Terms and Conditions</li>
                            <li>Cookie Usage Statement</li>
                        </ul>
                    </div>
                </Col>
            </Row>

            <Divider />

            <Row gutter={24}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <div className="footer-additional">
                        <h4>SAFE PAYMENT</h4>
                        <img
                            src="https://usa.visa.com/dam/VCOM/regional/ve/romania/blogs/hero-image/visa-logo-800x450.jpg"
                            alt="Visa logo"
                            style={{ width: '30px', margin: '0 5px' }}
                        />
                        <img
                            src="https://static-00.iconduck.com/assets.00/mastercard-icon-512x396-e90vsnhk.png"
                            alt="Mastercard logo"
                            style={{ width: '30px', margin: '0 5px' }}
                        />
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png"
                            alt="Paypal logo"
                            style={{ width: '30px', margin: '0 5px' }}
                        />
                        <img
                            src="https://logos-world.net/wp-content/uploads/2020/11/American-Express-Logo.png"
                            alt="American Express logo"
                            style={{ width: '30px', margin: '0 5px' }}
                        />
                    </div>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <div className="footer-additional">
                        <h4>SHIPPING METHODS</h4>
                        <img
                            src="https://www.shutterstock.com/image-vector/dhl-logo-icon-art-design-600nw-2275004285.jpg"
                            alt="DHL logo"
                            style={{ width: '30px', margin: '0 5px' }}
                        />
                        <img
                            src="https://assets.turbologo.com/blog/en/2019/12/19084817/Fedex-logo.png"
                            alt="FedEx logo"
                            style={{ width: '30px', margin: '0 5px' }}
                        />
                        <img
                            src="https://1000logos.net/wp-content/uploads/2021/04/UPS-logo.png"
                            alt="UPS logo"
                            style={{ width: '30px', margin: '0 5px' }}
                        />
                    </div>
                </Col>
            </Row>

            <div className="footer-copyright">
                <p>&copy; 2024 The Coco Chic. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
