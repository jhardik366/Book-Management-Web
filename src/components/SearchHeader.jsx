import React, { useEffect, useContext, useState } from 'react';
import { Input, Badge, Icon, Popover, Modal } from 'antd';
import logo from '../assets/logo.png';
import { CartContext } from '../context/CartContext';
import CartPopoverContent from './CartPopoverContent.jsx';
import './SearchHeader.css';

const SearchHeader = (props) => {
    const { getTotalQuantity } = useContext(CartContext);
    const [isMobile, setIsMobile] = useState(
        window.innerWidth <= 768 ? true : false
    );
    const [searchBarVisible, setSearchBarVisible] = useState(false);
    const [loginIconVisible, setLoginIconVisible] = useState(false);

    useEffect(() => {
        handleResize();
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [window.innerWidth]);

    const handleResize = () => {
        if (window.innerWidth <= 768) {
            setIsMobile(true);
            setSearchBarVisible(false);
        } else {
            setIsMobile(false);
            setSearchBarVisible(true);
        }
    };

    const handleSearchClick = () => {
        isMobile
            ? setSearchBarVisible(!searchBarVisible)
            : setSearchBarVisible(searchBarVisible);
    };

    const handleLoginClick = () => {
        setLoginIconVisible(!loginIconVisible);
    };

    const handleLoginCancel = () => {
        setLoginIconVisible(false);
    };

    return (
        <div className="header">
            <a href="/">
                <img className="logo" src={logo} alt="Logo" />
            </a>
            <div className={`search-bar ${searchBarVisible ? 'visible' : ''}`}>
                <Input
                    className="search-input"
                    placeholder="Search..."
                    hidden={props.hideSearchBar}
                />
            </div>
            <div className="icon-section">
                {isMobile && (
                    <Icon
                        type="search"
                        className="header-icon"
                        onClick={handleSearchClick}
                        hidden={props.hideSearchBar}
                    />
                )}
                {getTotalQuantity() > 0 ? (
                    <Popover
                        content={<CartPopoverContent />}
                        title="Cart Details"
                        placement="bottom"
                        trigger="hover"
                    >
                        <div className="cart-section">
                            <Badge count={getTotalQuantity()}>
                                <Icon
                                    type="shopping-cart"
                                    style={{
                                        fontSize: '24px',
                                        cursor: 'pointer',
                                    }}
                                />
                            </Badge>
                        </div>
                    </Popover>
                ) : (
                    <Popover
                        content={'Your shopping cart is empty!'}
                        placement="bottom"
                        trigger="hover"
                    >
                        <div className="cart-section">
                            <Badge count={getTotalQuantity()} showZero>
                                <Icon
                                    type="shopping-cart"
                                    style={{ fontSize: '24px' }}
                                />
                            </Badge>
                        </div>
                    </Popover>
                )}
                <Icon
                    type="user"
                    className="header-icon"
                    onClick={() => handleLoginClick()}
                />
            </div>
            <Modal
                title="Basic Modal"
                visible={loginIconVisible}
                onOk={handleLoginClick}
                onCancel={handleLoginCancel}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    );
};

export default SearchHeader;
