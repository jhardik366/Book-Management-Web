import React, { useContext } from 'react';
import { List, Button, Icon, notification } from 'antd';
import { CartContext } from '../context/CartContext.js';
import { useNavigate } from 'react-router-dom';
import './CartPopoverContent.css';

const CartPopoverContent = () => {
    const navigate = useNavigate(); // <-- use hook in component
    const { cart, setCart } = useContext(CartContext);

    const showNotification = (productTitle) => {
        notification.warning({
            message: 'Product Removed from Cart',
            description: `${productTitle} has been removed from your cart.`,
            placement: 'bottomRight',
        });
    };

    const removeItem = (product) => {
        setCart((prevCart) =>
            prevCart.filter((item) => item.id !== product.id)
        );
        showNotification(product.name);
    };

    return (
        <div className="cart-popover">
            <List
                dataSource={cart}
                renderItem={(item) => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <Icon
                                className="delete-icon"
                                type="delete"
                                onClick={() => removeItem(item)}
                            />,
                        ]}
                    >
                        <List.Item.Meta
                            title={`${item.name} (x${item.quantity})`}
                            description={`Price: ${item.price}`}
                        />
                    </List.Item>
                )}
            />
            <Button type="primary" style={{ marginTop: '10px' }} onClick={() => navigate('/checkout')}>
                Checkout
            </Button>
        </div>
    );
};

export default CartPopoverContent;
