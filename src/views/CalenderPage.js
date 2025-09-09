import React from 'react';
import Navbar from '../../src/components/Navbar/Navbar';
import Footer from '../../src/components/Footer/Footer';
import Calendar from '../../src/components/Calendar/Calendar';

const CalenderPage = () => {
    return (
        <div>
            <Navbar />
            <Calendar />
            <Footer />
        </div>
    );
};

export default CalenderPage;