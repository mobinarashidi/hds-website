import React from 'react';
import Navbar from '../../src/components/Navbar/Navbar';
import Footer from '../../src/components/Footer/Footer';
import HomeWork from '../../src/components/Homeworks/Homeworks';

const HomeWorkPage = () => {
    return (
        <div>
            <Navbar />
            <HomeWork />
            <Footer />
        </div>
    );
};

export default HomeWorkPage;