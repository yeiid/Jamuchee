
const { fetchUserData } = require("../../src/services/userService");
const { processUserData } = require("../../src/utils/dataProcessor");

describe("Integración de servicios de usuario", () => {
  test("obtiene y procesa datos de usuario", async () => {
    const userData = await fetchUserData(1);
    const processedData = processUserData(userData);

    expect(processedData).toHaveProperty("formattedName");
    expect(processedData).toHaveProperty("status");
  });
});
