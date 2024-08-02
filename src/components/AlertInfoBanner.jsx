import React from 'react';
import { Alert } from 'antd';
import './AlertInfoBanner.css'; // Import your CSS file for styling

const AlertInfoBanner = () => {
    return (
        <div>
            <Alert
                className="banner"
                showIcon={false}
                message="MINIMUM ORDER 5000"
                banner
            />
        </div>
    );
};

export default AlertInfoBanner;
