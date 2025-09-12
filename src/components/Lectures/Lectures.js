import React, { useState, useEffect } from "react";
import { weeklyContentAPI } from "../../services/api";
import ContentDetail from "../DetailView/DetailView";
import "../../styles/Lectures.css";

export default function Lectures() {
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        setLoading(true);
        const lecturesData = await weeklyContentAPI.getAll();
        setLectures(lecturesData);
        if (lecturesData.length > 0) {
          setSelectedWeek(lecturesData[0].week_number);
        }
      } catch (err) {
        setError("Failed to load lectures");
        console.error("Error fetching lectures:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
  }, []);

  const selectedData = lectures.find(
    (item) => item.week_number === selectedWeek
  );

  if (loading) {
    return <div className="lectures-container">Loading lectures...</div>;
  }

  if (error) {
    return <div className="lectures-container">Error: {error}</div>;
  }

  return (
    <div className="lectures-container">
      <div className="lectures-sidebar">
        <h3 className="sidebar-title">Lectures</h3>
        <ul className="lecture-list">
          {lectures.map((item) => (
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
