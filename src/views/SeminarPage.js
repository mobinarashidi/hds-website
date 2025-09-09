import React from 'react';
import Navbar from '../../src/components/Navbar/Navbar';
import Footer from '../../src/components/Footer/Footer';
import Seminars from '../../src/components/Seminars/Seminars';

const SeminarPage = () => {
    return (
        <div>
            <Navbar />
            <Seminars />
            <Footer />
        </div>
    );
};

export default SeminarPage;