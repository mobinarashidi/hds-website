import React, { useState, useEffect } from "react";
import { taClassAPI } from "../../services/api";
import ContentDetail from "../DetailView/DetailView";
import "../../styles/Lectures.css";

export default function TAClasses() {
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [taClasses, setTaClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTAClasses = async () => {
      try {
        setLoading(true);
        const taClassesData = await taClassAPI.getAll();
        setTaClasses(taClassesData);
        if (taClassesData.length > 0) {
          setSelectedWeek(taClassesData[0].week_number);
        }
      } catch (err) {
        setError("Failed to load TA classes");
        console.error("Error fetching TA classes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTAClasses();
  }, []);

  const selectedData = taClasses.find(
    (item) => item.week_number === selectedWeek
  );

  if (loading) {
    return <div className="lectures-container">Loading TA classes...</div>;
  }

  if (error) {
    return <div className="lectures-container">Error: {error}</div>;
  }

  return (
    <div className="lectures-container">
      <div className="lectures-sidebar">
        <h3 className="sidebar-title">TA Classes</h3>
        <ul className="lecture-list">
          {taClasses.map((item) => (
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
