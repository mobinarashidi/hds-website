const API_BASE_URL = "http://localhost:8000/api";

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// API service for homeworks
export const homeworkAPI = {
  // Get all homeworks
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/homeworks/`);
    return handleResponse(response);
  },

  // Get homework by ID
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/homeworks/${id}/`);
    return handleResponse(response);
  },
};

// API service for seminars
export const seminarAPI = {
  // Get all seminars
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/seminars/`);
    return handleResponse(response);
  },

  // Get seminar by ID
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/seminars/${id}/`);
    return handleResponse(response);
  },
};

// API service for weekly content
export const weeklyContentAPI = {
  // Get all weekly content
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/weekly-content/`);
    return handleResponse(response);
  },

  // Get weekly content by week number
  getByWeekNumber: async (weekNumber) => {
    const response = await fetch(
      `${API_BASE_URL}/weekly-content/?week_number=${weekNumber}`
    );
    return handleResponse(response);
  },
};

// API service for TA classes
export const taClassAPI = {
  // Get all TA classes
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/ta-classes/`);
    return handleResponse(response);
  },

  // Get TA class by week number
  getByWeekNumber: async (weekNumber) => {
    const response = await fetch(
      `${API_BASE_URL}/ta-classes/?week_number=${weekNumber}`
    );
    return handleResponse(response);
  },
};

// Admin API services
export const adminAPI = {
  // Authentication
  login: async (username, password) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: "POST",
      body: formData,
      credentials: "include",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    return handleResponse(response);
  },

  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    return handleResponse(response);
  },

  getStatus: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/status/`, {
      credentials: "include",
    });
    return handleResponse(response);
  },

  // Homework management
  createHomework: async (homeworkData) => {
    const response = await fetch(`${API_BASE_URL}/admin/homeworks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(homeworkData),
      credentials: "include",
    });
    return handleResponse(response);
  },

  updateHomework: async (id, homeworkData) => {
    const response = await fetch(`${API_BASE_URL}/admin/homeworks/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(homeworkData),
      credentials: "include",
    });
    return handleResponse(response);
  },

  deleteHomework: async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/homeworks/${id}/`, {
      method: "DELETE",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      credentials: "include",
    });
    return handleResponse(response);
  },

  // Seminar management
  createSeminar: async (seminarData) => {
    const response = await fetch(`${API_BASE_URL}/admin/seminars/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(seminarData),
      credentials: "include",
    });
    return handleResponse(response);
  },

  updateSeminar: async (id, seminarData) => {
    const response = await fetch(`${API_BASE_URL}/admin/seminars/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(seminarData),
      credentials: "include",
    });
    return handleResponse(response);
  },

  deleteSeminar: async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/seminars/${id}/`, {
      method: "DELETE",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      credentials: "include",
    });
    return handleResponse(response);
  },

  // Weekly content management
  createWeeklyContent: async (contentData) => {
    const response = await fetch(`${API_BASE_URL}/admin/weekly-content/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(contentData),
      credentials: "include",
    });
    return handleResponse(response);
  },

  updateWeeklyContent: async (weekNumber, contentData) => {
    const response = await fetch(
      `${API_BASE_URL}/admin/weekly-content/${weekNumber}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(contentData),
        credentials: "include",
      }
    );
    return handleResponse(response);
  },

  deleteWeeklyContent: async (weekNumber) => {
    const response = await fetch(
      `${API_BASE_URL}/admin/weekly-content/${weekNumber}/`,
      {
        method: "DELETE",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "include",
      }
    );
    return handleResponse(response);
  },

  // TA class management
  createTAClass: async (taClassData) => {
    const response = await fetch(`${API_BASE_URL}/admin/ta-classes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(taClassData),
      credentials: "include",
    });
    return handleResponse(response);
  },

  updateTAClass: async (weekNumber, taClassData) => {
    const response = await fetch(
      `${API_BASE_URL}/admin/ta-classes/${weekNumber}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(taClassData),
        credentials: "include",
      }
    );
    return handleResponse(response);
  },

  deleteTAClass: async (weekNumber) => {
    const response = await fetch(
      `${API_BASE_URL}/admin/ta-classes/${weekNumber}/`,
      {
        method: "DELETE",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "include",
      }
    );
    return handleResponse(response);
  },
};
