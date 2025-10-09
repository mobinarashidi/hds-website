const API_BASE_URL = "http://localhost:8000/api";

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {
      // If response is not JSON, use the status text
      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  // Handle empty responses
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    try {
      const data = await response.json();
      return data;
    } catch (e) {
      console.warn("Failed to parse JSON response:", e);
      return null;
    }
  }

  return null;
};

// API service for homeworks
export const homeworkAPI = {
  // Get all homeworks
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/homeworks/`);
    const data = await handleResponse(response);
    // Handle paginated response
    return data.results || data;
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
    const data = await handleResponse(response);
    // Handle paginated response
    return data.results || data;
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
    const data = await handleResponse(response);
    // Handle paginated response
    return data.results || data;
  },

  // Get weekly content by week number
  getByWeekNumber: async (weekNumber) => {
    const response = await fetch(
      `${API_BASE_URL}/weekly-content/?week_number=${weekNumber}`
    );
    const data = await handleResponse(response);
    // Handle paginated response
    return data.results || data;
  },
};

// API service for TA classes
export const taClassAPI = {
  // Get all TA classes
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/ta-classes/`);
    const data = await handleResponse(response);
    // Handle paginated response
    return data.results || data;
  },

  // Get TA class by week number
  getByWeekNumber: async (weekNumber) => {
    const response = await fetch(
      `${API_BASE_URL}/ta-classes/?week_number=${weekNumber}`
    );
    const data = await handleResponse(response);
    // Handle paginated response
    return data.results || data;
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

  deleteWeeklyContent: async (id) => {
    const response = await fetch(
      `${API_BASE_URL}/admin/weekly-content/${id}/`,
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

  deleteTAClass: async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/ta-classes/${id}/`, {
      method: "DELETE",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      credentials: "include",
    });
    return handleResponse(response);
  },
};
