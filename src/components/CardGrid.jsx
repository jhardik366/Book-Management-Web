import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import './CardGrid.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Meta } = Card;

const baseURL = 'http://localhost:5000/api';

const CardGrid = () => {
    const [masterProduct, setMasterProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMasterProducts = async () => {
            await axios
                .get(`${baseURL}/masterproduct`)
                .then((response) => {
                    setMasterProduct(response.data);
                    setLoading(false);
                })
                .catch(() => {});
        };

        fetchMasterProducts();
    }, []);

    const navigate = useNavigate(); // <-- use hook in component

    const goToProductDetail = (item) => {
        const nameWithoutSpacesAndSpecialChars = item.name.replace(/[^\w\s]/gi, '').replace(/\s+/g, '');
        navigate(`/masterproduct/${nameWithoutSpacesAndSpecialChars.toLowerCase()}/${item.id}`);
    };

    return (
        <div
            className="site-card-wrapper"
            style={{ background: '#ECECEC', padding: '30px' }}
        >
            {loading ? (
                <Spin size="large" />
            ) : (
                masterProduct.map((item) => (
                    <Card.Grid
                        className="grid-card"
                        onClick={() => goToProductDetail(item)}
                        key={item.id}
                    >
                        <img
                            alt="example"
                            src={item.image}
                            className="card-image"
                            width="250"
                            height="250"
                        />
                        <Meta
                            title={item.name}
                            description={item.description}
                        />
                    </Card.Grid>
                ))
            )}
        </div>
    );
};

export default CardGrid;

// const cardData = [
//     {
//         id: 1,
//         imageSrc:
//             'https://images.unsplash.com/photo-1606772016409-d4a55e32be6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//         title: 'Jewellery',
//         metadata: 'jewellery',
//         description: 'www.instagram.com',
//     },
//     {
//         id: 2,
//         imageSrc:
//             'https://images.unsplash.com/photo-1601938219471-fb3393955f15?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//         title: 'Hair Band',
//         metadata: 'hairband',
//         description: 'www.instagram.com',
//     },
//     {
//         id: 3,
//         imageSrc:
//             'https://plus.unsplash.com/premium_photo-1661645449694-5bf9766205e1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//         title: 'Scrunchies',
//         metadata: 'scrunchies',
//         description: 'www.instagram.com',
//     },
//     {
//         id: 4,
//         imageSrc:
//             'https://images.unsplash.com/photo-1609536834325-f9ecf43992f6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//         title: 'Hair Clips',
//         metadata: 'hairclips',
//         description: 'www.instagram.com',
//     },
//     {
//         id: 5,
//         imageSrc:
//             'https://images.unsplash.com/photo-1578220154766-1c39bcecc1dc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//         title: 'Hairs',
//         metadata: 'hairs',
//         description: 'www.instagram.com',
//     },
//     {
//         id: 6,
//         imageSrc:
//             'https://plus.unsplash.com/premium_photo-1661645487449-e20bf088390f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//         title: 'Hair Pins',
//         metadata: 'hairpins',
//         description: 'www.instagram.com',
//     },
//     {
//         id: 7,
//         imageSrc:
//             'https://images.unsplash.com/photo-1601057836844-a8a336439a27?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//         title: 'Hair Clutchers',
//         metadata: 'hairclutchers',
//         description: 'www.instagram.com',
//     },
//     {
//         id: 8,
//         imageSrc:
//             'https://images.unsplash.com/photo-1601057836639-5b571df9db15?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//         title: 'Rings',
//         metadata: 'rings',
//         description: 'www.instagram.com',
//     },
//     {
//         id: 9,
//         imageSrc:
//             'https://plus.unsplash.com/premium_photo-1661657759493-f21eb0d67e27?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//         title: 'Tic-Tic',
//         metadata: 'tictic',
//         description: 'www.instagram.com',
//     },
//     {
//         id: 10,
//         imageSrc:
//             'https://plus.unsplash.com/premium_photo-1661657771021-34782c0c26ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//         title: 'Hair Extensions',
//         metadata: 'hairextensions',
//         description: 'www.instagram.com',
//     },
// ];
