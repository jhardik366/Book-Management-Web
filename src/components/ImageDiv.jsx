import React from 'react';
import './ImageDiv.css'; // Import your CSS file for styling

const ImageDiv = () => {
    return (
        <div className="image-container">
            <div className="image-div">
                <div className="image-div__left">
                    <img
                        src="https://plus.unsplash.com/premium_photo-1692340973754-224eecd37905?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE3fHxoYWlyJTIwYWNjZXNzb3J5fGVufDB8fDB8fHww"
                        alt="example"
                    />
                </div>
                <div className="image-div__right">
                    <div className="text-box">
                        <p className="text-box__heading">
                            THE SUMMER COLLECTION
                        </p>
                        <p className="text-box__description">
                            Introducing our vibrant summer collection of new
                            hair accessories, perfect for adding a touch of
                            flair to your look as you prepare for the sun-filled
                            days ahead.
                        </p>
                    </div>
                    <div className="image-box">
                        <div className="image-box__item">
                            <img
                                src="https://plus.unsplash.com/premium_photo-1674625942772-b41c3aabb094?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fGhhaXIlMjBhY2Nlc3Nvcnl8ZW58MHx8MHx8fDA%3D"
                                alt="Example 1"
                            />
                            <p>Example 1</p>
                        </div>
                        <div className="image-box__item">
                            <img
                                src="https://plus.unsplash.com/premium_photo-1677849533990-ad83e1d7024e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODl8fGhhaXIlMjBhY2Nlc3Nvcnl8ZW58MHx8MHx8fDA%3D"
                                alt="Example 2"
                            />
                            <p>Example 2</p>
                        </div>
                        <div className="image-box__item">
                            <img
                                src="https://images.unsplash.com/photo-1635423759863-4ce5e848b8b5?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Example 3"
                            />
                            <p>Example 3</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageDiv;
