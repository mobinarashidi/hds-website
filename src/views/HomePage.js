import React from 'react';
import Navbar from '../../src/components/Navbar/Navbar';
import Footer from '../../src/components/Footer/Footer';
import Home from '../../src/components/Home/Home';

const HomePage = () => {
    return (
        <div>
            <Navbar />
            <Home />
            <Footer />
        </div>
    );
};

export default HomePage;
