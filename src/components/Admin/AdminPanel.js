import React, { useState, useEffect } from "react";
import { adminAPI } from "../../services/api";
import AdminHomeworkManager from "./AdminHomeworkManager";
import AdminSeminarManager from "./AdminSeminarManager";
import AdminLectureManager from "./AdminLectureManager";
import AdminTAClassManager from "./AdminTAClassManager";
import "./Admin.css";

const AdminPanel = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("homeworks");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getStatus();

      if (!response) {
        console.error("No response from admin status API");
        setIsAdmin(false);
        return;
      }

      setIsAdmin(response.is_admin || false);
    } catch (err) {
      console.error("Error checking admin status:", err);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await adminAPI.logout();
      onLogout();
    } catch (err) {
      console.error("Logout error:", err);
      onLogout(); // Still logout locally even if API call fails
    }
  };

  if (loading) {
    return (
      <div className="admin-panel">
        <div className="loading-message">Checking admin status...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-panel">
        <div className="error-message">
          <h3>🚫 Access Denied</h3>
          <p>
            Admin privileges required. Please log in with admin credentials.
          </p>
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

  const tabs = [
    { id: "homeworks", label: "Homeworks" },
    { id: "seminars", label: "Seminars" },
    { id: "lectures", label: "Lectures" },
    { id: "ta-classes", label: "TA Classes" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "homeworks":
        return <AdminHomeworkManager />;
      case "seminars":
        return <AdminSeminarManager />;
      case "lectures":
        return <AdminLectureManager />;
      case "ta-classes":
        return <AdminTAClassManager />;
      default:
        return <AdminHomeworkManager />;
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="admin-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="admin-content">{renderContent()}</div>
    </div>
  );
};

export default AdminPanel;
