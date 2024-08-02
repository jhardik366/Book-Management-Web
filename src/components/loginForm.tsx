import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import './loginForm.css';
import axios from 'axios';

class BookModel {
    bookId: string;
    name: string;
    author: string;
}

interface LoginFormStates {
    token: string;
    bookData: BookModel[];
}
const baseURL: string = 'http://localhost:5000';

class NormalLoginForm extends Component<LoginFormStates, any> {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            bookData: [],
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                await axios
                    .post(`${baseURL}/api/token`, {
                        email: values.email,
                        password: values.password,
                    })
                    .then(
                        async (response) => {
                            console.log(response.data);
                            const token = response.data;
                            axios.defaults.headers.common = {
                                Authorization: `Bearer ${token}`,
                            };
                            await axios.get(`${baseURL}/api/book`).then(
                                (response) => {
                                    console.log(response.data);
                                    this.setState({ bookData: response.data });
                                },
                                (error) => {
                                    console.log(error);
                                }
                            );
                        },
                        (error) => {
                            console.log(error);
                        }
                    );
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <>
                {this.state.bookData && this.state.bookData != null ? (
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ],
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="user"
                                            style={{ color: 'rgba(0,0,0,.25)' }}
                                        />
                                    }
                                    placeholder="Email"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ],
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="lock"
                                            style={{ color: 'rgba(0,0,0,.25)' }}
                                        />
                                    }
                                    type="password"
                                    placeholder="Password"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                ) : (
                    this.state.bookData
                )}
            </>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(
    NormalLoginForm
);
export default WrappedNormalLoginForm;
