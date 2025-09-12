import React, { useState, useEffect } from "react";
import { adminAPI, taClassAPI } from "../../services/api";
import "./Admin.css";

const AdminTAClassManager = () => {
  const [taClasses, setTaClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTAClass, setEditingTAClass] = useState(null);

  useEffect(() => {
    fetchTAClasses();
  }, []);

  const fetchTAClasses = async () => {
    try {
      setLoading(true);
      const response = await taClassAPI.getAll();
      setTaClasses(response);
    } catch (err) {
      setError("Failed to load TA classes");
      console.error("Error fetching TA classes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingTAClass(null);
    setShowForm(true);
  };

  const handleEdit = (taClass) => {
    setEditingTAClass(taClass);
    setShowForm(true);
  };

  const handleDelete = async (weekNumber) => {
    if (window.confirm("Are you sure you want to delete this TA class?")) {
      try {
        await adminAPI.deleteTAClass(weekNumber);
        fetchTAClasses();
      } catch (err) {
        setError("Failed to delete TA class");
        console.error("Error deleting TA class:", err);
      }
    }
  };

  const handleFormSubmit = async (taClassData) => {
    try {
      if (editingTAClass) {
        await adminAPI.updateTAClass(editingTAClass.week_number, taClassData);
      } else {
        await adminAPI.createTAClass(taClassData);
      }
      setShowForm(false);
      setEditingTAClass(null);
      fetchTAClasses();
    } catch (err) {
      setError("Failed to save TA class");
      console.error("Error saving TA class:", err);
    }
  };

  if (loading) {
    return <div>Loading TA classes...</div>;
  }

  return (
    <div className="admin-manager">
      <div className="manager-header">
        <h2>TA Class Management</h2>
        <button onClick={handleCreate} className="create-btn">
          Create New TA Class
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <TAClassForm
          taClass={editingTAClass}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingTAClass(null);
          }}
        />
      )}

      <div className="items-list">
        {taClasses.map((taClass) => (
          <div key={taClass.week_number} className="item-card">
            <div className="item-info">
              <h3>
                Week {taClass.week_number}: {taClass.week_title}
              </h3>
              <p>{taClass.description}</p>
            </div>
            <div className="item-actions">
              <button onClick={() => handleEdit(taClass)} className="edit-btn">
                Edit
              </button>
              <button
                onClick={() => handleDelete(taClass.week_number)}
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

const TAClassForm = ({ taClass, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    week_number: taClass?.week_number || "",
    week_title: taClass?.week_title || "",
    description: taClass?.description || "",
    pdf_files: taClass?.pdf_files || [],
    video_links: taClass?.video_links || [],
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

  const loadExample = () => {
    setFormData({
      week_number: 1,
      week_title: "Introduction to RL",
      description:
        "An overview of the fundamental concepts and history of reinforcement learning.",
      pdf_files: [
        { title: "Lecture 1 Slides", url: "/pdfs/1-Introduction.pdf" },
        { title: "Assignment 1", url: "/pdfs/2-Relations.pdf" },
      ],
      video_links: [
        {
          title: "Lecture 1.1: What is RL?",
          youtube_url: "https://www.youtube.com/watch?v=MGqoLm2aAgc&t=4644s",
        },
        {
          title: "Lecture 1.2: Key Components",
          youtube_url: "https://www.youtube.com/watch?v=1VhnDdQsELo",
        },
      ],
    });
  };

  return (
    <div className="form-overlay">
      <div className="ta-class-form">
        <h3>{taClass ? "Edit TA Class" : "Create TA Class"}</h3>
        <button type="button" onClick={loadExample} className="example-btn">
          Load Example
        </button>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Week Number:</label>
            <input
              type="number"
              name="week_number"
              value={formData.week_number}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Week Title:</label>
            <input
              type="text"
              name="week_title"
              value={formData.week_title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
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

          <div className="form-actions">
            <button type="submit" className="save-btn">
              {taClass ? "Update" : "Create"}
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

export default AdminTAClassManager;
