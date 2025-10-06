/**
 * Index file para data_privacy
 * Registra la pantalla en el sistema
 */
import DataPrivacyScreen from "./DataPrivacyScreen";
import DataPrivacyConfig from "./DataPrivacyConfig";
import { registerScreen } from "../../../utils/screenRegistry";

// Configuración por defecto específica de esta pantalla
const defaultConfig = {
  title: "Data Privacy",
  intro_text:
    'At Advanta Health, we treat any data that relates to an identified or identifiable individual as "personal data," and only use it within our services.',
  data_section_title: "Data we capture:",
  steps_text: "Steps",
  calories_text: "Calories",
  active_minutes_text: "Active Minutes",
  distance_text: "Distance",
  location_text: "Location",
  workout_photos_text: "Workout Photos with Location",
  training_text: "Training and Exercises",
  events_text: "Events from Partner Solutions",
  device_metadata_text: "Device Metadata",
  legal_text_prefix: "By continuing, you agree to the",
  eula_text: "EULA",
  legal_text_middle: ". Note: Advanta",
  privacy_policy_text: "Privacy Policy",
  legal_text_suffix: "describes how data is handled in this service.",
  accept_button_text: "Accept & Continue",
  button_radius: "12px",
  // Nota: Los colores de fondo, primario y secundario se toman de la configuración global del cliente
};

// Metadatos de la pantalla
const metadata = {
  name: "Data Privacy Screen",
  description:
    "Pantalla de privacidad de datos con lista de información capturada",
  version: "1.0.0",
  author: "Development Team",
  category: "Onboarding",
};

// Registrar la pantalla
registerScreen("onboarding_data_privacy", {
  component: DataPrivacyScreen,
  configComponent: DataPrivacyConfig,
  defaultConfig,
  dependencies: ["login_generic_logo"], // Depende de la pantalla de logo
  metadata,
});

// Exportar componentes para uso directo si es necesario
export { DataPrivacyScreen, DataPrivacyConfig };
export default DataPrivacyScreen;
