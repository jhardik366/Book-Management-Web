import React from 'react';
import { Carousel } from 'antd';
import './Slider.css'; // Import your CSS file for styling

const Slider = () => {
    return (
        <Carousel autoplay>
            <div>
                <img src="https://picsum.photos/id/5/200/200" alt="not found" className="carousel-image"></img>
            </div>
            <div>
                <img src="https://picsum.photos/id/6/200/200" alt="not found" className="carousel-image"></img>
            </div>
            <div>
                <img src="https://picsum.photos/id/7/200/200" alt="not found" className="carousel-image"></img>
            </div>
            <div>
                <img src="https://picsum.photos/id/9/200/200" alt="not found" className="carousel-image"></img>
            </div>
        </Carousel>
    );
};

export default Slider;
