import React, { useState, useEffect } from "react";
import { adminAPI, homeworkAPI } from "../../services/api";
import "./Admin.css";

const AdminHomeworkManager = () => {
  const [homeworks, setHomeworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingHomework, setEditingHomework] = useState(null);

  useEffect(() => {
    fetchHomeworks();
  }, []);

  const fetchHomeworks = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await homeworkAPI.getAll();

      if (!response) {
        setError("No data received from server");
        return;
      }

      if (!Array.isArray(response)) {
        setError("Invalid data format received");
        return;
      }

      setHomeworks(response);
    } catch (err) {
      setError(`Failed to load homeworks: ${err.message}`);
      console.error("Error fetching homeworks:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingHomework(null);
    setShowForm(true);
  };

  const handleEdit = (homework) => {
    setEditingHomework(homework);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this homework?")) {
      try {
        await adminAPI.deleteHomework(id);
        fetchHomeworks();
      } catch (err) {
        setError("Failed to delete homework");
        console.error("Error deleting homework:", err);
      }
    }
  };

  const handleFormSubmit = async (homeworkData) => {
    try {
      if (editingHomework) {
        await adminAPI.updateHomework(editingHomework.id, homeworkData);
      } else {
        await adminAPI.createHomework(homeworkData);
      }
      setShowForm(false);
      setEditingHomework(null);
      fetchHomeworks();
    } catch (err) {
      setError("Failed to save homework");
      console.error("Error saving homework:", err);
    }
  };

  return (
    <div className="admin-manager">
      <div className="manager-header">
        <h2>Homework Management</h2>
        <button onClick={handleCreate} className="create-btn">
          Create New Homework
        </button>
      </div>

      {loading && <div className="loading-message">Loading homeworks...</div>}

      {error && (
        <div className="error-message">
          <h3>⚠️ Error Loading Homeworks</h3>
          <p>{error}</p>
          <button onClick={fetchHomeworks} className="retry-button">
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          {showForm && (
            <HomeworkForm
              homework={editingHomework}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingHomework(null);
              }}
            />
          )}

          <div className="items-list">
            {homeworks.map((homework) => (
              <div key={homework.id} className="item-card">
                <div className="item-info">
                  <h3>{homework.title}</h3>
                  <p>{homework.intro}</p>
                  <div className="homework-meta">
                    <span className="meta-item">
                      <strong>ID:</strong> {homework.id}
                    </span>
                    <span className="meta-item">
                      <strong>Sections:</strong>{" "}
                      {homework.sections?.length || 0}
                    </span>
                    <span className="meta-item">
                      <strong>Total Content:</strong>{" "}
                      {homework.sections?.reduce(
                        (total, section) =>
                          total + (section.content?.length || 0),
                        0
                      ) || 0}
                    </span>
                  </div>
                </div>
                <div className="item-actions">
                  <button
                    onClick={() => handleEdit(homework)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(homework.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const HomeworkForm = ({ homework, onSubmit, onCancel }) => {
  // Transform homework data to match form field names
  const transformHomeworkData = (homeworkData) => {
    if (!homeworkData) return null;

    return {
      id: homeworkData.id || "",
      title: homeworkData.title || "",
      intro: homeworkData.intro || "",
      sections: (homeworkData.sections || []).map((section) => ({
        section_id: section.section_id || section.id || "",
        title: section.title || "",
        content: (section.content || []).map((content) => ({
          content_type: content.content_type || content.type || "paragraph",
          text: content.text || "",
          url: content.url || "",
          download: content.download || false,
          embed_id: content.embed_id || "",
          list_items: content.list_items || [],
        })),
      })),
    };
  };

  const [formData, setFormData] = useState(() => {
    const transformed = transformHomeworkData(homework);
    return (
      transformed || {
        id: "",
        title: "",
        intro: "",
        sections: [],
      }
    );
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

  const addSection = () => {
    setFormData({
      ...formData,
      sections: [
        ...formData.sections,
        {
          section_id: `section_${Date.now()}`,
          title: "New Section",
          content: [],
        },
      ],
    });
  };

  const removeSection = (index) => {
    setFormData({
      ...formData,
      sections: formData.sections.filter((_, i) => i !== index),
    });
  };

  const updateSection = (index, field, value) => {
    const newSections = [...formData.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setFormData({ ...formData, sections: newSections });
  };

  const addContent = (sectionIndex) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].content = [
      ...newSections[sectionIndex].content,
      {
        content_type: "paragraph",
        text: "",
      },
    ];
    setFormData({ ...formData, sections: newSections });
  };

  const removeContent = (sectionIndex, contentIndex) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].content = newSections[
      sectionIndex
    ].content.filter((_, i) => i !== contentIndex);
    setFormData({ ...formData, sections: newSections });
  };

  const updateContent = (sectionIndex, contentIndex, field, value) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].content[contentIndex] = {
      ...newSections[sectionIndex].content[contentIndex],
      [field]: value,
    };
    setFormData({ ...formData, sections: newSections });
  };

  const addListItem = (sectionIndex, contentIndex) => {
    const newSections = [...formData.sections];
    if (!newSections[sectionIndex].content[contentIndex].list_items) {
      newSections[sectionIndex].content[contentIndex].list_items = [];
    }
    newSections[sectionIndex].content[contentIndex].list_items.push({
      text: "",
    });
    setFormData({ ...formData, sections: newSections });
  };

  const loadExample = () => {
    setFormData({
      id: `hw_example_${Date.now()}`,
      title: "HW1: Introduction to RL",
      intro:
        "Welcome to the first homework assignment of the Deep Reinforcement Learning course!",
      sections: [
        {
          section_id: "homework",
          title: "Homework",
          content: [
            {
              content_type: "paragraph",
              text: "You can download the homework questions and the notebook from the following links:",
            },
            {
              content_type: "link",
              text: "HW1 Questions",
              url: "/path/to/HW1-Questions.pdf",
              download: true,
            },
            {
              content_type: "link",
              text: "HW1 Notebook",
              url: "/path/to/HW1-Notebook.ipynb",
              download: true,
            },
            {
              content_type: "paragraph",
              text: "You can use this template for your answers.",
            },
          ],
        },
      ],
    });
  };

  const removeListItem = (sectionIndex, contentIndex, itemIndex) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].content[contentIndex].list_items = newSections[
      sectionIndex
    ].content[contentIndex].list_items.filter((_, i) => i !== itemIndex);
    setFormData({ ...formData, sections: newSections });
  };

  const updateListItem = (sectionIndex, contentIndex, itemIndex, value) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].content[contentIndex].list_items[itemIndex] = {
      text: value,
    };
    setFormData({ ...formData, sections: newSections });
  };

  return (
    <div className="form-overlay">
      <div className="form-container homework-form">
        <h3>{homework ? "Edit Homework" : "Create Homework"}</h3>
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
          <div className="form-group">
            <label>Introduction:</label>
            <textarea
              name="intro"
              value={formData.intro}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="sections-container">
            <div className="sections-header">
              <h4>Sections</h4>
              <div className="section-buttons">
                <button
                  type="button"
                  onClick={loadExample}
                  className="example-btn"
                >
                  Load Example
                </button>
                <button type="button" onClick={addSection} className="add-btn">
                  Add Section
                </button>
              </div>
            </div>

            {formData.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="section-card">
                <div className="section-header">
                  <input
                    type="text"
                    value={section.section_id || ""}
                    onChange={(e) =>
                      updateSection(sectionIndex, "section_id", e.target.value)
                    }
                    placeholder="Section ID"
                    className="section-id-input"
                  />
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) =>
                      updateSection(sectionIndex, "title", e.target.value)
                    }
                    placeholder="Section Title"
                    className="section-title-input"
                  />
                  <button
                    type="button"
                    onClick={() => removeSection(sectionIndex)}
                    className="remove-btn"
                  >
                    Remove Section
                  </button>
                </div>

                <div className="content-container">
                  <div className="content-header">
                    <h5>Content</h5>
                    <button
                      type="button"
                      onClick={() => addContent(sectionIndex)}
                      className="add-btn small"
                    >
                      Add Content
                    </button>
                  </div>

                  {section.content.map((content, contentIndex) => (
                    <div key={contentIndex} className="content-card">
                      <div className="content-type-selector">
                        <label>Type:</label>
                        <select
                          value={content.content_type || "paragraph"}
                          onChange={(e) =>
                            updateContent(
                              sectionIndex,
                              contentIndex,
                              "content_type",
                              e.target.value
                            )
                          }
                        >
                          <option value="paragraph">Paragraph</option>
                          <option value="link">Link</option>
                          <option value="youtube_video">YouTube Video</option>
                          <option value="list">List</option>
                        </select>
                        <button
                          type="button"
                          onClick={() =>
                            removeContent(sectionIndex, contentIndex)
                          }
                          className="remove-btn small"
                        >
                          Remove
                        </button>
                      </div>

                      {content.content_type === "paragraph" && (
                        <textarea
                          value={content.text || ""}
                          onChange={(e) =>
                            updateContent(
                              sectionIndex,
                              contentIndex,
                              "text",
                              e.target.value
                            )
                          }
                          placeholder="Enter paragraph text"
                          rows="3"
                        />
                      )}

                      {content.content_type === "link" && (
                        <div className="link-inputs">
                          <input
                            type="text"
                            value={content.text || ""}
                            onChange={(e) =>
                              updateContent(
                                sectionIndex,
                                contentIndex,
                                "text",
                                e.target.value
                              )
                            }
                            placeholder="Link text"
                          />
                          <input
                            type="url"
                            value={content.url || ""}
                            onChange={(e) =>
                              updateContent(
                                sectionIndex,
                                contentIndex,
                                "url",
                                e.target.value
                              )
                            }
                            placeholder="URL"
                          />
                          <label>
                            <input
                              type="checkbox"
                              checked={content.download || false}
                              onChange={(e) =>
                                updateContent(
                                  sectionIndex,
                                  contentIndex,
                                  "download",
                                  e.target.checked
                                )
                              }
                            />
                            Download link
                          </label>
                        </div>
                      )}

                      {content.content_type === "youtube_video" && (
                        <input
                          type="text"
                          value={content.embed_id || ""}
                          onChange={(e) =>
                            updateContent(
                              sectionIndex,
                              contentIndex,
                              "embed_id",
                              e.target.value
                            )
                          }
                          placeholder="YouTube embed ID"
                        />
                      )}

                      {content.content_type === "list" && (
                        <div className="list-container">
                          <div className="list-header">
                            <h6>List Items</h6>
                            <button
                              type="button"
                              onClick={() =>
                                addListItem(sectionIndex, contentIndex)
                              }
                              className="add-btn small"
                            >
                              Add Item
                            </button>
                          </div>
                          {(content.list_items || []).map((item, itemIndex) => (
                            <div key={itemIndex} className="list-item">
                              <input
                                type="text"
                                value={item.text || ""}
                                onChange={(e) =>
                                  updateListItem(
                                    sectionIndex,
                                    contentIndex,
                                    itemIndex,
                                    e.target.value
                                  )
                                }
                                placeholder="List item text"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  removeListItem(
                                    sectionIndex,
                                    contentIndex,
                                    itemIndex
                                  )
                                }
                                className="remove-btn small"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">
              {homework ? "Update" : "Create"}
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

export default AdminHomeworkManager;
