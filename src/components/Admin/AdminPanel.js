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
      const response = await adminAPI.getStatus();
      setIsAdmin(response.is_admin);
    } catch (err) {
      console.error("Error checking admin status:", err);
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
    return <div className="admin-panel">Checking admin status...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="admin-panel">
        Access denied. Admin privileges required.
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
