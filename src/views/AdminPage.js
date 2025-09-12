import React, { useState, useEffect } from "react";
import AdminLogin from "../components/Admin/AdminLogin";
import AdminPanel from "../components/Admin/AdminPanel";
import { adminAPI } from "../services/api";

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await adminAPI.getStatus();
      setIsAuthenticated(response.is_admin);
    } catch (err) {
      console.error("Error checking auth status:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>
    );
  }

  return (
    <div>
      {isAuthenticated ? (
        <AdminPanel onLogout={handleLogout} />
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </div>
  );
};

export default AdminPage;


