/**
 * Index file para login_generic_form
 * Registra la pantalla en el sistema
 */
import LoginFormScreen from "./LoginFormScreen";
import LoginFormConfig from "./LoginFormConfig";
import { registerScreen } from "../../../utils/screenRegistry";

// Configuración por defecto específica de esta pantalla (basada en Figma)
const defaultConfig = {
  email_placeholder: "dmorales@advantahealth.com",
  password_placeholder: "**********",
  login_button_text: "Log In",
  forgot_password_text: "Forgot Password?",
  new_account_text: "No account yet? Tap here to verify your eligibility.",
  button_radius: "12px",
  button_color: "#017755", // Color verde de Figma
  app_logo_url: "", // Campo para imagen del formulario de login
};

// Metadatos de la pantalla
const metadata = {
  name: "Login Form Screen",
  description:
    "Pantalla de formulario de login con campos de email y contraseña",
  version: "1.0.0",
  author: "Development Team",
  category: "Authentication",
};

// Registrar la pantalla
registerScreen("login_generic_form", {
  component: LoginFormScreen,
  configComponent: LoginFormConfig,
  defaultConfig,
  dependencies: ["login_generic_logo"], // Depende de la pantalla de logo
  metadata,
});

// Exportar componentes para uso directo si es necesario
export { LoginFormScreen, LoginFormConfig };
export default LoginFormScreen;
