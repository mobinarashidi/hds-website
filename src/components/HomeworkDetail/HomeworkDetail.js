import React from 'react';
import { Link } from 'react-scroll';
import homeworksData from '../../data/homeworksData.json';
import '../Homeworks/HomeWorks.css';

const renderContent = (content) => {
    return content.map((item, index) => {
        switch (item.type) {
            case 'paragraph':
                return <p key={index}>{item.text}</p>;
            case 'link':
                return (
                    <a key={index} href={item.url} download={item.download} className="btn">
                        {item.text}
                    </a>
                );
            case 'youtube_video':
                return (
                    <div key={index} className="video-container">
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${item.embed_id}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded Video"
                        ></iframe>
                    </div>
                );
            case 'list':
                return (
                    <ul key={index}>
                        {item.items.map((listItem, listIndex) => (
                            <li key={listIndex}>
                                <strong>{listItem.text}</strong>
                                {listItem.link && (
                                    <a href={listItem.link} target="_blank" rel="noopener noreferrer">
                                        {listItem.link_text}
                                    </a>
                                )}
                                {!listItem.link && listItem.link_text}
                            </li>
                        ))}
                    </ul>
                );
            default:
                return null;
        }
    });
};

const HomeworkDetail = ({ homeworkId }) => {
    const currentHw = homeworksData[homeworkId];

    if (!currentHw) {
        return <div className="placeholder">Please select a homework from the list.</div>;
    }

    return (
        <div className="homework-detail">
            <h2>{currentHw.title}</h2>
            <div className="nav-links">
                {currentHw.sections.map(section => (
                    <Link
                        key={section.id}
                        to={section.id}
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        {section.title}
                    </Link>
                ))}
            </div>
            <p>{currentHw.intro}</p>
            {currentHw.sections.map(section => (
                <div key={section.id} id={section.id} className="section">
                    <h3>{section.title}</h3>
                    {renderContent(section.content)}
                </div>
            ))}
        </div>
    );
};

export default HomeworkDetail;