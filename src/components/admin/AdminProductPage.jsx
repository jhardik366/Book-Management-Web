import React, { useEffect, useState } from 'react';
import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    InputNumber,
    Select,
    Checkbox,
} from 'antd';
import axios from 'axios';
import './AdminProductPage.css';

const { Option } = Select;

const baseURL = 'http://localhost:5000/api';

const AdminProductPage = (props) => {
    const { form } = props;
    const { getFieldDecorator, validateFields, resetFields, setFieldsValue } =
        form;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(false);
    const [products, setProducts] = useState([]);
    const [masterProducts, setMasterProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isBlurModalVisible, setIsBlurModalVisible] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [blurred, setBlurred] = useState(true);
    const correctPassword = 'your-password';

    const fetchProducts = async () => {
        await axios
            .get(`${baseURL}/product?disabled=true`)
            .then((response) => {
                setProducts(response.data);
                let masterProductList = response.data.map((x) => {
                    return {
                        id: x.masterProductId,
                        name: x.masterProduct.name,
                    };
                });
                let filteredMasterProductList = Array.from(
                    new Set(masterProductList.map((a) => a.id))
                ).map((id) => {
                    return masterProductList.find((a) => a.id === id);
                });
                setMasterProducts(filteredMasterProductList);
                setLoading(false);
            })
            .catch(() => {});
    };

    useEffect(() => {
        !blurred && fetchProducts();
    }, [blurred]);

    const gridRefresh = () => {
        setLoading(true);
        fetchProducts();
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
                    const editProduct = {
                        ...editingProduct,
                        masterProductId: values.masterProduct.id,
                        ...values,
                    };

                    const updateProducts = async () => {
                        await axios
                            .put(`${baseURL}/product`, editProduct)
                            .then((response) => {
                                gridRefresh();
                            })
                            .catch(() => {
                                gridRefresh();
                            });
                    };

                    updateProducts();
                } else {
                    const {
                        masterProduct: { id: masterProductId },
                        ...rest
                    } = values;

                    const transformedObject = {
                        ...rest,
                        masterProductId,
                        disabled: values.disabled != null ? true : false,
                    };

                    const addProducts = async () => {
                        await axios
                            .post(`${baseURL}/product`, transformedObject)
                            .then((response) => {
                                gridRefresh();
                            })
                            .catch(() => {
                                gridRefresh();
                            });
                    };

                    addProducts();
                }
                setIsModalVisible(false);
            }
        });
    };

    const columns = [
        {
            title: 'Product Name',
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
            title: 'Master Product Name',
            dataIndex: 'masterProduct.name',
            key: 'masterProduct',
            sorter: (a, b) =>
                a.masterProduct.name.length - b.masterProduct.name.length,
        },
        {
            title: 'Max Price',
            dataIndex: 'maxPrice',
            key: 'maxPrice',
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
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

    const calculatePrice = (maxPrice, discount) => {
        return Math.round(maxPrice - maxPrice * (discount / 100));
    };

    const handleMaxPriceChange = (value) => {
        const discount = form.getFieldValue('discount') || 0;
        const price = calculatePrice(value, discount);
        form.setFieldsValue({ maxPrice: value, price });
    };

    const handleDiscountChange = (value) => {
        const maxPrice = form.getFieldValue('maxPrice') || 0;
        const price = calculatePrice(maxPrice, value);
        form.setFieldsValue({ discount: value, price });
    };

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
                    Add Product
                </Button>
                <Table
                    dataSource={products}
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
                    destroyOnClose={true}
                >
                    <Form layout="vertical">
                        <Form.Item label="Product Name">
                            {getFieldDecorator('name', {
                                initialValue:
                                    editingProduct && editingProduct.name,
                                rules: [
                                    {
                                        required: true,
                                        message:
                                            'Please enter the product name',
                                    },
                                ],
                            })(<Input placeholder="Enter product name" />)}
                        </Form.Item>
                        <Form.Item label="Description">
                            {getFieldDecorator('description', {
                                initialValue:
                                    editingProduct &&
                                    editingProduct.description,
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
                                initialValue:
                                    editingProduct && editingProduct.image,
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
                        <Form.Item label="Master Product Name">
                            {getFieldDecorator('masterProduct.id', {
                                initialValue:
                                    editingProduct &&
                                    editingProduct.masterProduct
                                        ? editingProduct.masterProduct.id
                                        : undefined,
                                rules: [
                                    {
                                        required: true,
                                        message:
                                            'Please select the master product',
                                    },
                                ],
                            })(
                                <Select>
                                    {masterProducts.map((item) => (
                                        <Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="Max Price">
                            {getFieldDecorator('maxPrice', {
                                initialValue:
                                    editingProduct && editingProduct.maxPrice,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please enter the max price',
                                    },
                                ],
                            })(
                                <InputNumber
                                    min={0}
                                    placeholder="Enter max price"
                                    style={{ width: '100%' }}
                                    step={1}
                                    onChange={handleMaxPriceChange}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="Discount">
                            {getFieldDecorator('discount', {
                                initialValue:
                                    editingProduct && editingProduct.discount,
                                rules: [
                                    {
                                        required: true,
                                        message:
                                            'Please enter the discount percentage',
                                    },
                                    {
                                        type: 'number',
                                        min: 0,
                                        message:
                                            'Discount must be greater than or equal to 0',
                                    },
                                    {
                                        type: 'number',
                                        max: 100,
                                        message:
                                            'Discount must be less than or equal to 100',
                                    },
                                ],
                            })(
                                <InputNumber
                                    min={0}
                                    placeholder="Enter discount percentage"
                                    style={{ width: '100%' }}
                                    step={1}
                                    onChange={handleDiscountChange}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="Price">
                            {getFieldDecorator('price', {
                                initialValue:
                                    editingProduct && editingProduct.price,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please enter the price',
                                    },
                                ],
                            })(
                                <InputNumber
                                    min={0}
                                    placeholder="Enter price"
                                    style={{ width: '100%' }}
                                    step={1}
                                    disabled
                                    readOnly
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="Rating">
                            {getFieldDecorator('rating', {
                                initialValue:
                                    editingProduct && editingProduct.rating,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please enter the rating',
                                    },
                                ],
                            })(
                                <InputNumber
                                    min={0}
                                    placeholder="Enter rating"
                                    style={{ width: '100%' }}
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('disabled', {
                                initialValue:
                                    editingProduct && editingProduct.disabled,
                                valuePropName: 'checked',
                            })(<Checkbox>Disabled</Checkbox>)}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    );
};

const WrappedAdminProductPage = Form.create()(AdminProductPage);

export default WrappedAdminProductPage;
