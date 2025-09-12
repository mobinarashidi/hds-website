import React, { useState, useEffect } from "react";
import HomeworkDetail from "../HomeworkDetail/HomeworkDetail";
import { homeworkAPI } from "../../services/api";
import "./HomeWorks.css";

const HomeWorks = () => {
  const [selectedHw, setSelectedHw] = useState(null);
  const [homeworksList, setHomeworksList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeworks = async () => {
      try {
        setLoading(true);
        const homeworks = await homeworkAPI.getAll();
        setHomeworksList(homeworks);
        if (homeworks.length > 0) {
          setSelectedHw(homeworks[0].id);
        }
      } catch (err) {
        setError("Failed to load homeworks");
        console.error("Error fetching homeworks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeworks();
  }, []);

  if (loading) {
    return <div className="homework-container">Loading homeworks...</div>;
  }

  if (error) {
    return <div className="homework-container">Error: {error}</div>;
  }

  return (
    <div className="homework-container">
      <div className="sidebar">
        <h3 className="sidebar-title">Homeworks</h3>
        <ul className="homework-list">
          {homeworksList.map((hw) => (
            <li
              key={hw.id}
              onClick={() => setSelectedHw(hw.id)}
              className={selectedHw === hw.id ? "active" : ""}
            >
              {hw.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="content">
        {selectedHw && <HomeworkDetail homeworkId={selectedHw} />}
      </div>
    </div>
  );
};

export default HomeWorks;
