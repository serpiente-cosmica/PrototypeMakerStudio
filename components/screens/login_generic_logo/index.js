/**
 * Index file para login_generic_logo
 * Registra la pantalla en el sistema
 */
import LoginLogoScreen from "./LoginLogoScreen";
import LoginLogoConfig from "./LoginLogoConfig";
import { registerScreen } from "../../../utils/screenRegistry";

// Configuración por defecto específica de esta pantalla (basada en @logo.png)
const defaultConfig = {
  logo_size: "150px", // Tamaño óptimo para el logo proporcionado
  logo_position: "center",
};

// Metadatos de la pantalla
const metadata = {
  name: "Login Logo Screen",
  description: "Pantalla de logo para el proceso de login",
  version: "1.0.0",
  author: "Development Team",
  category: "Authentication",
};

// Registrar la pantalla
registerScreen("login_generic_logo", {
  component: LoginLogoScreen,
  configComponent: LoginLogoConfig,
  defaultConfig,
  dependencies: [], // No depende de otras pantallas
  metadata,
});

// Exportar componentes para uso directo si es necesario
export { LoginLogoScreen, LoginLogoConfig };
export default LoginLogoScreen;
