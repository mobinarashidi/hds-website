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
        setError(null);
        const homeworks = await homeworkAPI.getAll();

        if (!homeworks) {
          setError("No data received from server");
          return;
        }

        if (!Array.isArray(homeworks)) {
          setError("Invalid data format received");
          return;
        }

        setHomeworksList(homeworks);
        if (homeworks.length > 0) {
          setSelectedHw(homeworks[0].id);
        } else {
          setError("No homeworks available");
        }
      } catch (err) {
        setError(`Failed to load homeworks: ${err.message}`);
        console.error("Error fetching homeworks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeworks();
  }, []);

  if (loading) {
    return (
      <div className="homework-container">
        <div className="loading-message">Loading homeworks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="homework-container">
        <div className="error-message">
          <h3>⚠️ Error Loading Homeworks</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Retry
          </button>
        </div>
      </div>
    );
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
