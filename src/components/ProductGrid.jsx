import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Card, Rate, Icon, notification, Spin, Dropdown, Menu } from 'antd';
import SearchHeader from './SearchHeader.jsx';
import { CartContext } from '../context/CartContext';
import subProductsModel from '../models/subProductsModel.js';
import axios from 'axios';
import './ProductGrid.css';
import BreadcrumbTrail from './BreadcrumbTrail.jsx';
import ProductPage from './ProductPage.jsx';

const baseURL = 'http://localhost:5000/api';

const ProductGrid = () => {
    const { cart, setCart } = useContext(CartContext);
    const [products, setProducts] = useState(subProductsModel);
    const [loading, setLoading] = useState(true);
    const item = useParams();
    const masterProduct = item.masterProduct;
    const masterProductId = item.masterProductId;
    const navigate = useNavigate();
    const currentLocation = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchProducts = async () => {
            await axios
                .get(`${baseURL}/masterproduct/${masterProductId}/products`)
                .then((response) => {
                    setProducts(response.data);
                    setLoading(false);
                })
                .catch(() => {});
        };

        fetchProducts();
    }, []);

    const showNotification = (productTitle) => {
        notification.success({
            message: 'Product Added to Cart',
            description: `${productTitle} has been added to your cart.`,
            placement: 'bottomRight',
        });
    };

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(
                (item) => item.id === product.id
            );
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
        showNotification(product.name);
    };

    const filterProducts = ({ key }) => {
        let sortedProducts = [];
        switch (key) {
            case '1':
                sortedProducts = [...products].sort((a, b) => {
                    return b.rating - a.rating;
                });
                break;
            case '2':
                sortedProducts = [...products].sort((a, b) => {
                    return b.price - a.price;
                });
                break;
            case '3':
                sortedProducts = [...products].sort((a, b) => {
                    return a.price - b.price;
                });
                break;
            case '4':
                sortedProducts = [...products].sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
                break;
            case '5':
                sortedProducts = [...products].sort((a, b) => {
                    return b.name.localeCompare(a.name);
                });
                break;
            default:
                sortedProducts = [...products];
                break;
        }
        setProducts(sortedProducts);
    };

    const menu = (
        <Menu onClick={filterProducts}>
            <Menu.Item key="1">Relevance</Menu.Item>
            <Menu.Item key="2">Price (High to Low)</Menu.Item>
            <Menu.Item key="3">Price (Low to High)</Menu.Item>
            <Menu.Item key="4">Sort (A-Z)</Menu.Item>
            <Menu.Item key="5">Sort (Z-A)</Menu.Item>
        </Menu>
    );

    const goToProductPage = (product) => {
        const pathname = currentLocation.pathname;
        const nameWithoutSpacesAndSpecialChars = product.name
            .replace(/[^\w\s]/gi, '')
            .replace(/\s+/g, '');
        const route =
            pathname +
            `/product/${nameWithoutSpacesAndSpecialChars.toLowerCase()}/${
                product.id
            }`;
        navigate(route, { state: { product } });
    };

    return (
        <>
            <SearchHeader hideSearchBar={true} />
            <div className="breadcrumb-filter-container">
                <BreadcrumbTrail />
                <Dropdown overlay={menu}>
                    <a>
                        Filter <Icon type="filter" />
                    </a>
                </Dropdown>
            </div>
            <div className="product-container">
                <div className="product-grid">
                    {loading ? (
                        <Spin size="large" />
                    ) : (
                        products.map((product) => (
                            <Card
                                key={product.id}
                                className="product-card"
                                loading={loading}
                                cover={
                                    !loading && (
                                        <img
                                            style={{ cursor: 'pointer' }}
                                            src={product.image}
                                            alt="not found"
                                            onClick={() =>
                                                goToProductPage(product)
                                            }
                                        />
                                    )
                                }
                            >
                                <div className="add-to-cart-section">
                                    <Icon
                                        className="add-to-cart-icon"
                                        type="plus-circle"
                                        onClick={() => addToCart(product)}
                                        style={{
                                            fontSize: '24px',
                                            color: '#1890ff',
                                            marginTop: '10px',
                                            cursor: 'pointer',
                                        }}
                                    />
                                </div>
                                <h2 className="product-title">
                                    {product.name}
                                </h2>
                                <p className="product-description">
                                    {product.description}
                                </p>
                                <div className="price-section">
                                    <p className="product-price">
                                        Rs.{product.price}
                                    </p>
                                    <p className="product-max-price">
                                        Rs.{product.maxPrice}
                                    </p>
                                    <p className="product-discount">
                                        {product.discount}% OFF
                                    </p>
                                </div>
                                <Rate disabled value={product.rating} />
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductGrid;

// const generateRandom = (max, min) => {
//     // Generate a random number between 'max' and 'min' and round to two decimal places
//     return (Math.random() * (max - min) + 1).toFixed(2);
// };

// const generateProducts = () => {
//     const subproducts = [];
//     setLoading(true);
//     for (let i = 1; i <= 15; i++) {
//         const subProduct = {
//             id: i,
//             masterProduct: productType,
//             masterProductId: productId,
//             title: `${productType}-${i}`,
//             description: `Description for ${productType} - ${i}`,
//             imageUrl: `https://picsum.photos/id/${i + productId}/200/200`, // Replace with actual image URL if available
//             price: `Rs. ${Math.floor(Math.random() * 1000) + 50}`,
//             maxPrice: `Rs. ${Math.floor(Math.random() * 1000) + 1000}`,
//             discount: `(${Math.floor(Math.random() * 10)}% OFF)`,
//             rating: generateRandom(5, 1),
//         };

//         subproducts.push(subProduct);
//     }
//     setSubProducts(subproducts);
//     setTimeout(() => {
//         setLoading(false);
//     }, 1500);
// };
