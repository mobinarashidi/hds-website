import React from 'react';
import { FileText } from 'lucide-react';
import { Link } from 'react-scroll';
import '../../styles/Lectures.css';

const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

export default function DetailView({ data }) {
    if (!data) return <div className="placeholder">Please select an item from the list.</div>;

    const sections = [
        {
            id: 'materials',
            title: 'Materials',
            content: data.pdf_files?.map(file => ({ type: 'pdf', title: file.title, url: file.url })) || []
        },
        {
            id: 'videos',
            title: 'Videos',
            content: data.video_links?.map(video => ({ type: 'youtube_video', title: video.title, url: video.youtube_url })) || []
        }
    ];

    return (
        <div className="lecture-detail-content">
            <h2 className="lectures-title">{data.week_title || data.title}</h2>
            <p className="week-full-description">{data.description || data.intro}</p>

            <div className="nav-links">
                {sections.map(section => (
                    <Link key={section.id} to={section.id} spy={true} smooth={true} offset={-70} duration={500}>
                        {section.title}
                    </Link>
                ))}
            </div>

            {sections.map(section => (
                <div key={section.id} id={section.id} className="section">
                    <h3>{section.title}</h3>
                    {section.content.map((item, idx) => {
                        if (item.type === 'pdf') return (
                            <a key={idx} href={item.url} download className="btn">
                                <FileText size={16} /> {item.title}
                            </a>
                        );
                        if (item.type === 'youtube_video') {
                            const videoId = getYouTubeId(item.url);
                            return videoId ? (
                                <div key={idx} className="video-container">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${videoId}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title={item.title}
                                    ></iframe>
                                </div>
                            ) : null;
                        }
                        return null;
                    })}
                </div>
            ))}
        </div>
    );
}

