// Simulación simple de un cliente API
const apiClient = {
  get: async (url) => {
    // En una implementación real, esto haría una petición HTTP
    console.log(`GET request to ${url}`);
    return Promise.resolve({ data: {} });
  },
  post: async (url, data) => {
    console.log(`POST request to ${url}`, data);
    return Promise.resolve({ data: {} });
  },
};

module.exports = apiClient;
