import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "../src/views/HomePage";
import CalendarPage from "../src/views/CalenderPage";
import LecturePage from "../src/views/LecturePage";
import HomeWorkPage from "../src/views/HomeWorkPage";
import TAClassPage from "./views/TAClassPage";
import SeminarPage from "./views/SeminarPage";

const App = () => {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<HomePage />} />
                <Route path="/Calendar" element={<CalendarPage />} />
                <Route path="/Lectures" element={<LecturePage />} />
                <Route path="/HomeWorks" element={<HomeWorkPage />} />
                <Route path="/TAClasses" element={<TAClassPage />} />
                <Route path="/Seminar" element={<SeminarPage />} />
            </Routes>
        </Router>

    );
};

export default App;
