import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Checkbox } from 'antd';
import axios from 'axios';
import './AdminMasterProductPage.css';

const baseURL = 'http://localhost:5000/api';

const AdminMasterProductPage = (props) => {
    const { form } = props;
    const { getFieldDecorator, validateFields, resetFields, setFieldsValue } =
        form;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(false);
    const [masterProducts, setMasterProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isBlurModalVisible, setIsBlurModalVisible] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [blurred, setBlurred] = useState(true);
    const correctPassword = 'your-password';

    const fetchMasterProducts = async () => {
        await axios
            .get(`${baseURL}/masterproduct?disabled=true`)
            .then((response) => {
                setMasterProducts(response.data);
                setLoading(false);
            })
            .catch(() => {});
    };

    useEffect(() => {
        !blurred && fetchMasterProducts();
    }, [blurred]);

    const gridRefresh = () => {
        setLoading(true);
        fetchMasterProducts();
    };

    const showAddModal = () => {
        setEditingProduct(null);
        resetFields();
        setIsModalVisible(true);
    };

    const showEditModal = (record) => {
        setEditingProduct(record);
        setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = () => {
        validateFields((err, values) => {
            if (!err) {
                if (editingProduct) {
                    const editProduct = Object.assign(editingProduct, values);

                    const updateMasterProducts = async () => {
                        await axios
                            .put(`${baseURL}/masterproduct`, editProduct)
                            .then((response) => {
                                gridRefresh();
                            })
                            .catch(() => {
                                gridRefresh();
                            });
                    };

                    updateMasterProducts();
                } else {
                    const addMasterProducts = async () => {
                        await axios
                            .post(`${baseURL}/masterproduct`, values)
                            .then((response) => {
                                gridRefresh();
                            })
                            .catch(() => {
                                gridRefresh();
                            });
                    };

                    addMasterProducts();
                }
                setIsModalVisible(false);
            }
        });
    };

    const columns = [
        {
            title: 'Master Product Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Image URL',
            dataIndex: 'image',
            key: 'image',
        },
        {
            title: 'Disabled',
            dataIndex: 'disabled',
            key: 'disabled',
            render: (text, record) => (
                <span>{record.disabled ? 'Yes' : 'No'}</span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button onClick={() => showEditModal(record)}>Edit</Button>
                </span>
            ),
        },
    ];

    const handleBlurOk = () => {
        if (inputValue === correctPassword) {
            setIsBlurModalVisible(false);
            setBlurred(false);
        } else {
            alert('Incorrect password');
        }
    };

    const handleBlurCancel = () => {
        setIsBlurModalVisible(false);
    };

    return (
        <>
            <Modal
                title="Enter Password"
                visible={isBlurModalVisible}
                onOk={handleBlurOk}
                onCancel={handleBlurCancel}
                footer={[
                    <Button key="submit" type="primary" onClick={handleBlurOk}>
                        Submit
                    </Button>,
                ]}
            >
                <Input
                    type="password"
                    placeholder="Enter password"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </Modal>
            <div
                className="admin-page"
                style={{
                    filter: blurred ? 'blur(8px)' : 'none',
                    transition: 'filter 0.3s ease',
                }}
            >
                <h1>Admin Page</h1>
                <Button
                    type="primary"
                    onClick={showAddModal}
                    className="add-product-button"
                    disabled={blurred}
                >
                    Add Master Product
                </Button>
                <Table
                    dataSource={masterProducts}
                    columns={columns}
                    className="product-table"
                />

                <Modal
                    title={editingProduct ? 'Edit Product' : 'Add Product'}
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    onOk={handleOk}
                    okText="Save"
                    cancelText="Cancel"
                >
                    <Form layout="vertical">
                        <Form.Item label="Master Product Name">
                            {getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: true,
                                        message:
                                            'Please enter the product name',
                                    },
                                ],
                            })(
                                <Input placeholder="Enter Master Product name" />
                            )}
                        </Form.Item>
                        <Form.Item label="Description">
                            {getFieldDecorator('description', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please enter the description',
                                    },
                                ],
                            })(
                                <Input.TextArea
                                    placeholder="Enter description"
                                    rows={4}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="Image URL">
                            {getFieldDecorator('image', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please enter the image URL',
                                    },
                                ],
                            })(
                                <Input.TextArea
                                    placeholder="Enter Image URL"
                                    rows={4}
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('disabled', {
                                initialValue: 'true',
                                valuePropName: 'checked',
                            })(<Checkbox>Disabled</Checkbox>)}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    );
};

const WrappedAdminMasterProductPage = Form.create()(AdminMasterProductPage);

export default WrappedAdminMasterProductPage;
