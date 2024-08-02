import React, { useState } from 'react';
import { Button, Form, Input, Row, Col, Checkbox, Divider } from 'antd';
import './DeliveryDetails.css';

const DeliveryDetails = ({ next, prev, savedAddress, handleUpdateAddress }) => {
    const [isChecked, setIsChecked] = useState(true);
    const [newAddress, setNewAddress] = useState('');

    const handleConfirmAddress = (confirm) => {
        if (confirm) {
            setIsChecked(true);
            setNewAddress('');
        } else {
            setIsChecked(false);
            setNewAddress(newAddress);
        }
    };

    return (
        <div className="delivery-details-container">
            <Form layout="vertical">
                <div className="form-section">
                    <h2 className="section-title">Delivery Address</h2>
                    <Divider className="divider" />
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item>
                                <Checkbox
                                    defaultChecked={true}
                                    onChange={(e) =>
                                        handleConfirmAddress(e.target.checked)
                                    }
                                >
                                    Use saved address: {savedAddress}
                                </Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="New Address">
                                <Input
                                    value={newAddress}
                                    onChange={(e) =>
                                        setNewAddress(e.target.value)
                                    }
                                    placeholder="Enter your new address"
                                    disabled={isChecked}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>

                <div className="form-buttons">
                    <Button onClick={prev}>Previous</Button>
                    <Button
                        type="primary"
                        disabled={!isChecked && !newAddress}
                        onClick={() =>
                            handleUpdateAddress(
                                isChecked ? savedAddress : newAddress
                            )
                        }
                    >
                        Next
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default DeliveryDetails;
