import React, { useState } from 'react';
import MOCK_LECTURES from '../../data/taClass.json';
import ContentDetail from '../DetailView/DetailView';
import '../../styles/Lectures.css';

export default function Lectures() {
    const [selectedWeek, setSelectedWeek] = useState(MOCK_LECTURES[0]?.week_number || null);
    const selectedData = MOCK_LECTURES.find(item => item.week_number === selectedWeek);

    return (
        <div className="lectures-container">
            <div className="lectures-sidebar">
                <h3 className="sidebar-title">TA Classes</h3>
                <ul className="lecture-list">
                    {MOCK_LECTURES.map(item => (
                        <li
                            key={item.week_number}
                            onClick={() => setSelectedWeek(item.week_number)}
                            className={selectedWeek === item.week_number ? "active" : ""}
                        >
                            <span>Week {item.week_number}:</span> {item.week_title}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="content">
                <ContentDetail data={selectedData} />
            </div>
        </div>
    );
}
