import React, { useState, useEffect } from "react";
import { adminAPI, seminarAPI } from "../../services/api";
import "./Admin.css";

const AdminSeminarManager = () => {
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingSeminar, setEditingSeminar] = useState(null);

  useEffect(() => {
    fetchSeminars();
  }, []);

  const fetchSeminars = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await seminarAPI.getAll();

      if (!response) {
        setError("No data received from server");
        return;
      }

      if (!Array.isArray(response)) {
        setError("Invalid data format received");
        return;
      }

      setSeminars(response);
    } catch (err) {
      setError(`Failed to load seminars: ${err.message}`);
      console.error("Error fetching seminars:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingSeminar(null);
    setShowForm(true);
  };

  const handleEdit = (seminar) => {
    setEditingSeminar(seminar);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this seminar?")) {
      try {
        await adminAPI.deleteSeminar(id);
        fetchSeminars();
      } catch (err) {
        setError("Failed to delete seminar");
        console.error("Error deleting seminar:", err);
      }
    }
  };

  const handleFormSubmit = async (seminarData) => {
    try {
      if (editingSeminar) {
        await adminAPI.updateSeminar(editingSeminar.id, seminarData);
      } else {
        await adminAPI.createSeminar(seminarData);
      }
      setShowForm(false);
      setEditingSeminar(null);
      fetchSeminars();
    } catch (err) {
      setError("Failed to save seminar");
      console.error("Error saving seminar:", err);
    }
  };

  if (loading) {
    return (
      <div className="admin-manager">
        <div className="loading-message">Loading seminars...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-manager">
        <div className="error-message">
          <h3>⚠️ Error Loading Seminars</h3>
          <p>{error}</p>
          <button onClick={fetchSeminars} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-manager">
      <div className="manager-header">
        <h2>Seminar Management</h2>
        <button onClick={handleCreate} className="create-btn">
          Create New Seminar
        </button>
      </div>

      {showForm && (
        <SeminarForm
          seminar={editingSeminar}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingSeminar(null);
          }}
        />
      )}

      <div className="items-list">
        {seminars.map((seminar) => (
          <div key={seminar.id} className="item-card">
            <div className="item-info">
              <h3>{seminar.title}</h3>
            </div>
            <div className="item-actions">
              <button onClick={() => handleEdit(seminar)} className="edit-btn">
                Edit
              </button>
              <button
                onClick={() => handleDelete(seminar.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SeminarForm = ({ seminar, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: seminar?.id || "",
    title: seminar?.title || "",
    video_links: seminar?.video_links || [],
    pdf_files: seminar?.pdf_files || [],
    notebook_files: seminar?.notebook_files || [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Video Links Management
  const addVideoLink = () => {
    setFormData({
      ...formData,
      video_links: [...formData.video_links, { title: "", youtube_url: "" }],
    });
  };

  const removeVideoLink = (index) => {
    setFormData({
      ...formData,
      video_links: formData.video_links.filter((_, i) => i !== index),
    });
  };

  const updateVideoLink = (index, field, value) => {
    const updatedLinks = [...formData.video_links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setFormData({ ...formData, video_links: updatedLinks });
  };

  // PDF Files Management
  const addPDFFile = () => {
    setFormData({
      ...formData,
      pdf_files: [...formData.pdf_files, { title: "", url: "" }],
    });
  };

  const removePDFFile = (index) => {
    setFormData({
      ...formData,
      pdf_files: formData.pdf_files.filter((_, i) => i !== index),
    });
  };

  const updatePDFFile = (index, field, value) => {
    const updatedFiles = [...formData.pdf_files];
    updatedFiles[index] = { ...updatedFiles[index], [field]: value };
    setFormData({ ...formData, pdf_files: updatedFiles });
  };

  // Notebook Files Management
  const addNotebookFile = () => {
    setFormData({
      ...formData,
      notebook_files: [...formData.notebook_files, { title: "", url: "" }],
    });
  };

  const removeNotebookFile = (index) => {
    setFormData({
      ...formData,
      notebook_files: formData.notebook_files.filter((_, i) => i !== index),
    });
  };

  const updateNotebookFile = (index, field, value) => {
    const updatedFiles = [...formData.notebook_files];
    updatedFiles[index] = { ...updatedFiles[index], [field]: value };
    setFormData({ ...formData, notebook_files: updatedFiles });
  };

  const loadExample = () => {
    setFormData({
      id: `seminar${Date.now()}`,
      title: "Guest Speaker: Dr. Richard Sutton",
      video_links: [
        {
          title: "Lecture 2.1: Q-learning Explained",
          youtube_url: "https://www.youtube.com/watch?v=MGqoLm2aAgc&t=4644s",
        },
      ],
      pdf_files: [
        { title: "Presentation Slides", url: "/pdfs/1-Introduction.pdf" },
      ],
      notebook_files: [
        {
          title: "Companion Notebook",
          url: "/notebooks/sutton-notebook.ipynb",
        },
      ],
    });
  };

  return (
    <div className="form-overlay">
      <div className="seminar-form">
        <h3>{seminar ? "Edit Seminar" : "Create Seminar"}</h3>
        <button type="button" onClick={loadExample} className="example-btn">
          Load Example
        </button>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ID:</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Video Links Section */}
          <div className="section-container">
            <h4>Video Links ({formData.video_links.length})</h4>
            <button type="button" onClick={addVideoLink} className="add-btn">
              + Add Video Link
            </button>
            {formData.video_links.map((link, index) => (
              <div key={index} className="link-card">
                <div className="link-inputs">
                  <input
                    type="text"
                    placeholder="Video Title"
                    value={link.title}
                    onChange={(e) =>
                      updateVideoLink(index, "title", e.target.value)
                    }
                    required
                  />
                  <input
                    type="url"
                    placeholder="YouTube URL"
                    value={link.youtube_url}
                    onChange={(e) =>
                      updateVideoLink(index, "youtube_url", e.target.value)
                    }
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeVideoLink(index)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* PDF Files Section */}
          <div className="section-container">
            <h4>PDF Files ({formData.pdf_files.length})</h4>
            <button type="button" onClick={addPDFFile} className="add-btn">
              + Add PDF File
            </button>
            {formData.pdf_files.map((file, index) => (
              <div key={index} className="link-card">
                <div className="link-inputs">
                  <input
                    type="text"
                    placeholder="PDF Title"
                    value={file.title}
                    onChange={(e) =>
                      updatePDFFile(index, "title", e.target.value)
                    }
                    required
                  />
                  <input
                    type="url"
                    placeholder="PDF URL"
                    value={file.url}
                    onChange={(e) =>
                      updatePDFFile(index, "url", e.target.value)
                    }
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removePDFFile(index)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Notebook Files Section */}
          <div className="section-container">
            <h4>Notebook Files ({formData.notebook_files.length})</h4>
            <button type="button" onClick={addNotebookFile} className="add-btn">
              + Add Notebook File
            </button>
            {formData.notebook_files.map((file, index) => (
              <div key={index} className="link-card">
                <div className="link-inputs">
                  <input
                    type="text"
                    placeholder="Notebook Title"
                    value={file.title}
                    onChange={(e) =>
                      updateNotebookFile(index, "title", e.target.value)
                    }
                    required
                  />
                  <input
                    type="url"
                    placeholder="Notebook URL"
                    value={file.url}
                    onChange={(e) =>
                      updateNotebookFile(index, "url", e.target.value)
                    }
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeNotebookFile(index)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">
              {seminar ? "Update" : "Create"}
            </button>
            <button type="button" onClick={onCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSeminarManager;
