import React from 'react';
import Navbar from '../../src/components/Navbar/Navbar';
import Footer from '../../src/components/Footer/Footer';
import Lectures from '../../src/components/Lectures/Lectures';
import '../../src/styles/App.css';
const LecturePage = () => {
    return (
        <div className="page-container">
            <Navbar />
            <div className="content-wrapper">
                <Lectures />
            </div>
            <Footer />
        </div>
    );
};

export default LecturePage;