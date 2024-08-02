import React, { useEffect } from 'react';
import './Home.css';
import SearchHeader from './SearchHeader.jsx';
import Slider from './Slider.jsx';
import CardGrid from './CardGrid.jsx';
import InformationDiv from './InformationDiv.jsx';
import ImageDiv from './ImageDiv.jsx';
import InformationDiv2 from './InformationDiv2.jsx';
import InformationDiv3 from './InformationDiv3.jsx';
import InformationDiv4 from './InformationDiv4.jsx';

function Home() {
    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top when component mounts
    }, []);

    return (
        <div className="Home">
            <SearchHeader hideSearchBar={false}/>
            <Slider />
            <CardGrid />
            <InformationDiv />
            <ImageDiv />
            <InformationDiv2 />
            <InformationDiv3 />
            <InformationDiv4 />
        </div>
    );
}

export default Home;
