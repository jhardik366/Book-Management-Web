import React, { useEffect } from 'react';
import { Button, Form, Input, Checkbox, Row, Col, Divider } from 'antd';
import 'antd/dist/antd.css';
import './AccountBillingDetails.css';

const AccountBillingDetails = ({
    next,
    prev,
    formData,
    userType,
    form,
    setFormData,
}) => {
    useEffect(() => {
        if (userType === 'signin' && formData) {
            form.setFieldsValue({
                email: formData.email,
            });
        }
    }, [userType, formData, form]);

    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                setFormData(values);
                next();
            }
        });
    };

    return (
        <div className="account-billing-details-container">
            <Form layout="vertical" onSubmit={handleSubmit}>
                <div className="form-section">
                    <h2 className="section-title">Personal Details</h2>
                    <Divider className="divider" />
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="First Name">
                                {form.getFieldDecorator('firstName', {
                                    initialValue: formData.firstName,
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                'Please enter your first name',
                                        },
                                    ],
                                })(
                                    <Input placeholder="Enter your first name" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Last Name">
                                {form.getFieldDecorator('lastName', {
                                    initialValue: formData.lastName,
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                'Please enter your last name',
                                        },
                                    ],
                                })(
                                    <Input placeholder="Enter your last name" />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Mobile No">
                                {form.getFieldDecorator('mobile', {
                                    initialValue: formData.mobile,
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                'Please enter your mobile number',
                                        },
                                    ],
                                })(
                                    <Input placeholder="Enter your mobile number" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Email">
                                {form.getFieldDecorator('email', {
                                    initialValue: formData.email,
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please enter your email',
                                        },
                                    ],
                                })(
                                    <Input
                                        disabled
                                        placeholder="Enter your email"
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </div>

                <div className="form-section">
                    <h2 className="section-title">Address</h2>
                    <Divider className="divider" />
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Address 1">
                                {form.getFieldDecorator('address1', {
                                    initialValue: formData.address1,
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                'Please enter your address',
                                        },
                                    ],
                                })(<Input placeholder="Enter your address" />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="City">
                                {form.getFieldDecorator('city', {
                                    initialValue: formData.city,
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please enter your city',
                                        },
                                    ],
                                })(<Input placeholder="Enter your city" />)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Pin Code">
                                {form.getFieldDecorator('pinCode', {
                                    initialValue: formData.pinCode,
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                'Please enter your pin code',
                                        },
                                    ],
                                })(<Input placeholder="Enter your pin code" />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="State">
                                {form.getFieldDecorator('state', {
                                    initialValue: formData.state,
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please enter your state',
                                        },
                                    ],
                                })(<Input placeholder="Enter your state" />)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Country">
                                {form.getFieldDecorator('country', {
                                    initialValue: formData.country,
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                'Please enter your country',
                                        },
                                    ],
                                })(<Input placeholder="Enter your country" />)}
                            </Form.Item>
                        </Col>
                    </Row>
                </div>

                <Form.Item>
                    {form.getFieldDecorator('subscribe', {
                        valuePropName: 'checked',
                        initialValue: formData.subscribe,
                    })(
                        <Checkbox>
                            I wish to subscribe to the newsletter
                        </Checkbox>
                    )}
                </Form.Item>

                <div className="form-buttons">
                    <Button onClick={prev}>Previous</Button>
                    <Button type="primary" htmlType="submit">
                        Next
                    </Button>
                </div>
            </Form>
        </div>
    );
};

const WrappedAccountBillingDetails = Form.create()(AccountBillingDetails);

export default WrappedAccountBillingDetails;
