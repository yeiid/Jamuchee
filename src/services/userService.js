const apiClient = require("./apiClient");

const userService = {
  getUserDetails: async (userId) => {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error("No se pudo obtener el usuario");
    }
  },

  fetchUserData: async (userId) => {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error("No se pudo obtener el usuario");
    }
  },
};

module.exports = userService;
