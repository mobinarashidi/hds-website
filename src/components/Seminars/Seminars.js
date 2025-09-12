import React, { useState, useEffect } from "react";
import { seminarAPI } from "../../services/api";
import ContentDetail from "../DetailView/DetailView";
import "../../styles/Lectures.css";

export default function SeminarsPage() {
  const [selectedSeminar, setSelectedSeminar] = useState(null);
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeminars = async () => {
      try {
        setLoading(true);
        setError(null);
        const seminarsData = await seminarAPI.getAll();

        if (!seminarsData) {
          setError("No data received from server");
          return;
        }

        if (!Array.isArray(seminarsData)) {
          setError("Invalid data format received");
          return;
        }

        setSeminars(seminarsData);
        if (seminarsData.length > 0) {
          setSelectedSeminar(seminarsData[0].id);
        } else {
          setError("No seminars available");
        }
      } catch (err) {
        setError(`Failed to load seminars: ${err.message}`);
        console.error("Error fetching seminars:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeminars();
  }, []);

  const selectedData = seminars.find((item) => item.id === selectedSeminar);

  if (loading) {
    return (
      <div className="lectures-container">
        <div className="loading-message">Loading seminars...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lectures-container">
        <div className="error-message">
          <h3>⚠️ Error Loading Seminars</h3>
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
    <div className="lectures-container">
      <div className="lectures-sidebar">
        <h3 className="sidebar-title">Seminar</h3>
        <ul className="lecture-list">
          {seminars.map((item) => (
            <li
              key={item.id}
              onClick={() => setSelectedSeminar(item.id)}
              className={selectedSeminar === item.id ? "active" : ""}
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
