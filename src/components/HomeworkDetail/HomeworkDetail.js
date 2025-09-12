import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { homeworkAPI } from "../../services/api";
import "../Homeworks/HomeWorks.css";

const renderContent = (content) => {
  return content.map((item, index) => {
    switch (item.content_type) {
      case "paragraph":
        return <p key={index}>{item.text}</p>;
      case "link":
        return (
          <a
            key={index}
            href={item.url}
            download={item.download}
            className="btn"
          >
            {item.text}
          </a>
        );
      case "youtube_video":
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
      case "list":
        return (
          <ul key={index}>
            {item.list_items &&
              item.list_items.map((listItem, listIndex) => (
                <li key={listIndex}>
                  <strong>{listItem.text}</strong>
                  {listItem.link && (
                    <a
                      href={listItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
  const [homework, setHomework] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomework = async () => {
      if (!homeworkId) return;

      try {
        setLoading(true);
        const homeworkData = await homeworkAPI.getById(homeworkId);
        setHomework(homeworkData);
      } catch (err) {
        setError("Failed to load homework details");
        console.error("Error fetching homework:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomework();
  }, [homeworkId]);

  if (loading) {
    return <div className="placeholder">Loading homework details...</div>;
  }

  if (error) {
    return <div className="placeholder">Error: {error}</div>;
  }

  if (!homework) {
    return (
      <div className="placeholder">Please select a homework from the list.</div>
    );
  }

  return (
    <div className="homework-detail">
      <h2>{homework.title}</h2>
      <div className="nav-links">
        {homework.sections &&
          homework.sections.map((section) => (
            <Link
              key={section.section_id}
              to={section.section_id}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              {section.title}
            </Link>
          ))}
      </div>
      <p>{homework.intro}</p>
      {homework.sections &&
        homework.sections.map((section) => (
          <div
            key={section.section_id}
            id={section.section_id}
            className="section"
          >
            <h3>{section.title}</h3>
            {renderContent(section.content)}
          </div>
        ))}
    </div>
  );
};

export default HomeworkDetail;
