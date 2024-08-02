import React from 'react';
import { Button, Form, Input } from 'antd';

const SignUpForm = ({ next, setFormData, form }) => {
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
        <Form layout="vertical" onSubmit={handleSubmit}>
            <Form.Item label="Email">
                {form.getFieldDecorator('email', {
                    rules: [
                        { required: true, message: 'Please enter your email' },
                    ],
                })(<Input type="email" placeholder="Enter your email" />)}
            </Form.Item>
            <Form.Item label="Password">
                {form.getFieldDecorator('password', {
                    rules: [
                        {
                            required: true,
                            message: 'Please enter your password',
                        },
                    ],
                })(<Input type="password" placeholder="Create a password" />)}
            </Form.Item>
            <Form.Item label="Confirm Password">
                {form.getFieldDecorator('confirmPassword', {
                    rules: [
                        {
                            required: true,
                            message: 'Please confirm your password',
                        },
                    ],
                })(
                    <Input
                        type="password"
                        placeholder="Confirm your password"
                    />
                )}
            </Form.Item>
            <div className="buttons single-button">
                <Button type="primary" htmlType="submit">
                    Sign Up
                </Button>
            </div>
        </Form>
    );
};

export default SignUpForm;