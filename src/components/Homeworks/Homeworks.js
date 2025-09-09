import React, { useState } from 'react';
import HomeworkDetail from '../HomeworkDetail/HomeworkDetail';
import homeworksData from '../../data/homeworksData.json';
import './HomeWorks.css';

const HomeWorks = () => {
    const [selectedHw, setSelectedHw] = useState('hw1');

    const homeworksList = Object.keys(homeworksData).map(id => ({
        id,
        title: homeworksData[id].title
    }));

    return (
        <div className="homework-container">
            <div className="sidebar">
                <h3 className="sidebar-title">Homeworks</h3>
                <ul className="homework-list">
                    {homeworksList.map((hw) => (
                        <li key={hw.id} onClick={() => setSelectedHw(hw.id)} className={selectedHw === hw.id ? 'active' : ''}>
                            {hw.title}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="content">
                <HomeworkDetail homeworkId={selectedHw} />
            </div>
        </div>
    );
};

export default HomeWorks;