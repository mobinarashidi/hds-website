import React, { useState } from 'react';
import MOCK_LECTURES from '../../data/seminars.json';
import ContentDetail from '../DetailView/DetailView';
import '../../styles/Lectures.css';

export default function LecturesPage() {
    const [selectedWeek, setSelectedWeek] = useState(MOCK_LECTURES[0]?.id || null);
    const selectedData = MOCK_LECTURES.find(item => item.id === selectedWeek);

    return (
        <div className="lectures-container">
            <div className="lectures-sidebar">
                <h3 className="sidebar-title">Seminar</h3>
                <ul className="lecture-list">
                    {MOCK_LECTURES.map(item => (
                        <li
                            key={item.id}
                            onClick={() => setSelectedWeek(item.id)}
                            className={selectedWeek === item.id ? "active" : ""}
                        >
                            <span>Week {item.id}:</span> {item.title}
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
