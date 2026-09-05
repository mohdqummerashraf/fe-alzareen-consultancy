import api from './api';

const handleError = (error) => {
  const response = error.response;

  if (!response) {
    throw {
      success: false,
      message: 'Network error. Please check your internet connection.',
    };
  }

  if (response.data?.detail) {
    throw {
      success: false,
      message: response.data.detail,
      errors: response.data,
    };
  }

  if (response.data?.message) {
    throw {
      success: false,
      message: response.data.message,
      errors: response.data,
    };
  }

  if (response.data) {
    throw {
      success: false,
      message: 'Validation failed',
      errors: response.data,
    };
  }

  throw {
    success: false,
    message: 'Something went wrong',
  };
};

const apiService = {
  async get(url, params = {}) {
    console.log("url", url)
    try {
      const response = await api.get(url, { params });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      handleError(error);
    }
  },

  async post(url, data = {}) {
    try {
      const response = await api.post(url, data);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      handleError(error);
    }
  },

  async put(url, id, data = {}) {
    try {
      const response = await api.put(`${url}/${id}/`, data);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      handleError(error);
    }
  },

  async patch(url, id, data = {}) {
    try {
      const response = await api.patch(`${url}/${id}/`, data);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      handleError(error);
    }
  },

  async delete(url, id) {
    try {
      const response = await api.delete(`${url}/${id}/`);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      handleError(error);
    }
  },
};

export default apiService;
