/**
 * Index file para data_privacy
 * Registra la pantalla en el sistema
 */
import DataPrivacyScreen from "./DataPrivacyScreen";
import DataPrivacyConfig from "./DataPrivacyConfig";
import { registerScreen } from "../../../utils/screenRegistry";

// Configuración por defecto específica de esta pantalla
const defaultConfig = {
  top_bar_color: "#3B82F6",
  logo_url: "",
  main_title: "Make the Most of Your Benefits",
  subtitle: "Easily explore, compare, and manage your benefits — all from one place within the app.",
  section_1_icon: "⭐",
  section_1_title: "Discover Your Plan Options",
  section_1_description: "Browse your available benefits and find the health, dental, or vision plan that works for your lifestyle and budget.",
  section_2_icon: "📋",
  section_2_title: "Enroll with Ease",
  section_2_description: "Follow simple steps to enroll in your chosen plan. No paperwork, no stress — just a smooth, digital experience.",
  section_3_icon: "🔔",
  section_3_title: "Stay Informed Year-Round",
  section_3_description: "Review your coverage details, get reminders for important dates, and make updates when your needs change.",
  continue_button_text: "Continue",
  continue_button_color: "#3B82F6",
  close_button_text: "Close",
  navigation_config: {
    continue_button: {
      target_screen_id: null,
      enabled: false,
    },
    close_button: {
      target_screen_id: null,
      enabled: false,
    },
  },
};

// Metadatos de la pantalla
const metadata = {
  name: "Onboarding Screen",
  description:
    "Customizable onboarding screen with three feature sections and navigation buttons",
  version: "2.0.0",
  author: "Development Team",
  category: "Onboarding",
};

// Registrar la pantalla
registerScreen("data_privacy", {
  component: DataPrivacyScreen,
  configComponent: DataPrivacyConfig,
  defaultConfig,
  dependencies: ["login_generic_logo"], // Depende de la pantalla de logo
  metadata,
});

// Exportar componentes para uso directo si es necesario
export { DataPrivacyScreen, DataPrivacyConfig };
export default DataPrivacyScreen;
