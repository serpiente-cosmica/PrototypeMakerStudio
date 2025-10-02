/**
 * ScreenMapper - Sistema de mapeo de pantallas usando el registro
 * Ahora usa el sistema de registro en lugar de imports directos
 */
import {
  getScreenComponent as getRegisteredScreenComponent,
  getAllScreens,
} from "./screenRegistry";

// Importar todas las pantallas para que se registren automáticamente
import "../components/screens/login_generic_logo";
import "../components/screens/login_generic_form";

/**
 * Obtiene el componente de una pantalla usando el sistema de registro
 * @param {string} screenId - ID de la pantalla
 * @returns {React.Component|null} Componente de la pantalla
 */
export const getScreenComponent = (screenId) => {
  return getRegisteredScreenComponent(screenId);
};

/**
 * Verifica si una pantalla está disponible
 * @param {string} screenId - ID de la pantalla
 * @returns {boolean} True si la pantalla está disponible
 */
export const hasScreenComponent = (screenId) => {
  return getScreenComponent(screenId) !== null;
};

/**
 * Obtiene todas las pantallas disponibles
 * @returns {Array} Array de IDs de pantallas disponibles
 */
export const getAvailableScreenIds = () => {
  return getAllScreens().map((screen) => screen.id);
};

/**
 * Obtiene información detallada de todas las pantallas
 * @returns {Array} Array con información detallada de las pantallas
 */
export const getAllScreenInfo = () => {
  return getAllScreens();
};
