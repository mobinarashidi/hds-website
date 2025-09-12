import React, { useState, useEffect } from "react";
import { adminAPI, weeklyContentAPI } from "../../services/api";
import "./Admin.css";

const AdminLectureManager = () => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingLecture, setEditingLecture] = useState(null);

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await weeklyContentAPI.getAll();

      if (!response) {
        setError("No data received from server");
        return;
      }

      if (!Array.isArray(response)) {
        setError("Invalid data format received");
        return;
      }

      setLectures(response);
    } catch (err) {
      setError(`Failed to load lectures: ${err.message}`);
      console.error("Error fetching lectures:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingLecture(null);
    setShowForm(true);
  };

  const handleEdit = (lecture) => {
    setEditingLecture(lecture);
    setShowForm(true);
  };

  const handleDelete = async (weekNumber) => {
    if (window.confirm("Are you sure you want to delete this lecture?")) {
      try {
        await adminAPI.deleteWeeklyContent(weekNumber);
        fetchLectures();
      } catch (err) {
        setError("Failed to delete lecture");
        console.error("Error deleting lecture:", err);
      }
    }
  };

  const handleFormSubmit = async (lectureData) => {
    try {
      if (editingLecture) {
        await adminAPI.updateWeeklyContent(
          editingLecture.week_number,
          lectureData
        );
      } else {
        await adminAPI.createWeeklyContent(lectureData);
      }
      setShowForm(false);
      setEditingLecture(null);
      fetchLectures();
    } catch (err) {
      setError("Failed to save lecture");
      console.error("Error saving lecture:", err);
    }
  };

  if (loading) {
    return (
      <div className="admin-manager">
        <div className="loading-message">Loading lectures...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-manager">
        <div className="error-message">
          <h3>⚠️ Error Loading Lectures</h3>
          <p>{error}</p>
          <button onClick={fetchLectures} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-manager">
      <div className="manager-header">
        <h2>Lecture Management</h2>
        <button onClick={handleCreate} className="create-btn">
          Create New Lecture
        </button>
      </div>

      {showForm && (
        <LectureForm
          lecture={editingLecture}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingLecture(null);
          }}
        />
      )}

      <div className="items-list">
        {lectures.map((lecture) => (
          <div key={lecture.week_number} className="item-card">
            <div className="item-info">
              <h3>
                Week {lecture.week_number}: {lecture.week_title}
              </h3>
              <p>{lecture.description}</p>
            </div>
            <div className="item-actions">
              <button onClick={() => handleEdit(lecture)} className="edit-btn">
                Edit
              </button>
              <button
                onClick={() => handleDelete(lecture.week_number)}
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

const LectureForm = ({ lecture, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    week_number: lecture?.week_number || "",
    week_title: lecture?.week_title || "",
    description: lecture?.description || "",
    pdf_files: lecture?.pdf_files || [],
    video_links: lecture?.video_links || [],
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
      <div className="lecture-form">
        <h3>{lecture ? "Edit Lecture" : "Create Lecture"}</h3>
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
              {lecture ? "Update" : "Create"}
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

export default AdminLectureManager;
