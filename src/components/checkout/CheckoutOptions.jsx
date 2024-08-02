import React, { useState } from 'react';
import { Form, Radio } from 'antd';
import SignInForm from './SignInForm.jsx';
import SignUpForm from './SignUpForm.jsx';

const CheckoutOptions = ({ next, setFormData, form }) => {
    const [formType, setFormType] = useState('guest');

    return (
        <div>
            <Form layout="horizontal">
                <Form.Item label="Checkout as">
                    <Radio.Group
                        onChange={(e) => setFormType(e.target.value)}
                        value={formType}
                    >
                        <Radio value="guest">Sign In</Radio>
                        <Radio value="register">Sign Up</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
            {formType === 'guest' ? (
                <SignInForm next={next} setFormData={setFormData} form={form} />
            ) : (
                <SignUpForm next={next} setFormData={setFormData} form={form} />
            )}
        </div>
    );
};

const WrappedCheckoutOptions = Form.create()(CheckoutOptions);

export default WrappedCheckoutOptions;
