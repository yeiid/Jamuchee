const dataProcessor = {
  processUserData: (userData) => {
    return {
      formattedName: `${userData.nombre || ""} ${
        userData.apellido || ""
      }`.trim(),
      status: userData.activo ? "Activo" : "Inactivo",
      // Otros campos procesados
    };
  },
};

module.exports = dataProcessor;
