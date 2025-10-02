// Script de prueba para verificar que las configuraciones por defecto se crean correctamente
import { createDefaultScreenConfigs } from "./utils/defaultScreenConfigs.js";
import { debugClientConfigs } from "./utils/debugConfigs.js";

// Datos de prueba
const testClientData = {
  client_id: "test-client-" + Date.now(),
  approach_id: "activefit-plus", // Asumiendo que este es el approach ID
  app_name: "Test App",
  colors_json: {
    primary: "#3b82f6",
    secondary: "#64748b",
    background: "#ffffff",
    accent: "#f59e0b",
  },
  logo_url: "https://example.com/logo.png",
};

console.log("🧪 Testing default config creation...");
console.log("Test client data:", testClientData);

// Simular creación de configuraciones por defecto
createDefaultScreenConfigs(
  testClientData.client_id,
  testClientData.approach_id,
  {
    logoUrl: testClientData.logo_url,
    colors_json: testClientData.colors_json,
  }
)
  .then((success) => {
    if (success) {
      console.log("✅ Default configs created successfully");
      // Verificar las configuraciones
      return debugClientConfigs(testClientData.client_id);
    } else {
      console.error("❌ Failed to create default configs");
    }
  })
  .catch((error) => {
    console.error("❌ Error:", error);
  });
