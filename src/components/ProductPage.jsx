import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Carousel, Card, Spin, Rate, Icon, notification } from 'antd';
import axios from 'axios';
import BreadcrumbTrail from './BreadcrumbTrail';
import SearchHeader from './SearchHeader';
import './ProductPage.css';
import { CartContext } from '../context/CartContext';

const { Meta } = Card;

const baseURL = 'http://localhost:5000/api';

const ProductPage = () => {
    const location = useLocation();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const { cart, setCart } = useContext(CartContext);

    useEffect(() => {
        if (!location.state) {
            const fetchProduct = async (productId) => {
                await axios
                    .get(`${baseURL}/product/${productId}`)
                    .then((response) => {
                        setProduct(response.data);
                        setLoading(false);
                    })
                    .catch(() => {});
            };

            const productId = location.pathname.split('/')[6];
            fetchProduct(productId);
        } else {
            setProduct(location.state.product);
            setLoading(false);
        }
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

    return (
        <div>
            <SearchHeader hideSearchBar={true} />
            <div className="breadcrumb-filter-container">
                <BreadcrumbTrail />
            </div>

            {loading ? (
                <Spin />
            ) : (
                <div className="product-viewer-container">
                    {/* Image Viewer */}
                    <div className="product-viewer-image">
                        <img src={product.image} alt={product.name} />
                    </div>
                    {/* Product Details */}
                    <div className="product-viewer-details">
                        <h1>{product.name}</h1>
                        <p>{product.description}</p>
                        <Rate disabled value={product.rating} />
                        <h2>Rs. {product.price}</h2>
                        <p>{product.discount}% OFF</p>
                        <p>Rs. {product.maxPrice}</p>
                        <button className="add-to-cart" onClick={() => addToCart(product)}>
                            Add to Cart <Icon type="shopping-cart" />
                        </button>
                    </div>
                </div>
            )}

            {/* Similar Products Carousel */}
            <div className="similar-products">
                <div style={{ padding: '4px 20px' }}>
                    <h2>Similar Products</h2>
                </div>
                {/* <Carousel autoplay>
                    {product.map((similarProduct) => (
                        <div key={similarProduct.id}>
                            <Card
                                hoverable
                                cover={
                                    <img
                                        alt={similarProduct.name}
                                        src={similarProduct.image}
                                    />
                                }
                            >
                                <Meta
                                    title={similarProduct.name}
                                    description={similarProduct.price}
                                />
                            </Card>
                        </div>
                    ))}
                </Carousel> */}
            </div>
        </div>
    );
};

export default ProductPage;
