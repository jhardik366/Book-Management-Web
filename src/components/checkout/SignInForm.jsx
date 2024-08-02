import React from 'react';
import { Button, Form, Input } from 'antd';

const SignInForm = ({ next, setFormData, form }) => {
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
                })(<Input type="password" placeholder="Enter your password" />)}
            </Form.Item>
            <div className="buttons single-button">
                <Button type="primary" htmlType="submit">
                    Sign In
                </Button>
            </div>
        </Form>
    );
};

export default SignInForm;