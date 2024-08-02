import React from 'react';
import './InformationDiv4.css'; // Import your CSS file for styling

const InformationDiv4 = () => {
    return (
        <div className="help">
            <div className="help-left">
                <p style={{ fontSize: '22px', fontWeight: 'bold' }}>
                    We're Always Here To Help
                </p>
            </div>
            <div className="help-right">
                <div className="help-info">
                    <img src="" alt="icon"></img>
                    Terms & Conditions
                </div>
                <div className="help-info">
                    <img src="" alt="icon"></img>
                    Return & Refund
                </div>
                <div className="help-info">
                    <img src="" alt="icon"></img>
                    Privacy Policy
                </div>
                <div className="help-info">
                    <img src="" alt="icon"></img>
                    Shipping Policy
                </div>
            </div>
        </div>
    );
};

export default InformationDiv4;
