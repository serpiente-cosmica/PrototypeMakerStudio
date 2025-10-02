import LoginLogoScreen from "../components/screens/LoginLogoScreen";
import HomeDashboardScreen from "../components/screens/HomeDashboardScreen";
import ProfileSettingsScreen from "../components/screens/ProfileSettingsScreen";

/**
 * Mapeo de IDs de pantalla con sus componentes correspondientes
 * Este archivo conecta los IDs de la base de datos con los componentes React
 */
export const SCREEN_COMPONENTS = {
  login_generic_logo: LoginLogoScreen,
  home_dashboard: HomeDashboardScreen,
  profile_settings: ProfileSettingsScreen,
  // Aquí se pueden agregar más pantallas conforme se vayan creando
  // 'login_form': LoginFormScreen,
  // 'dashboard_main': DashboardMainScreen,
  // etc...
};

/**
 * Función para obtener un componente de pantalla por su ID
 * @param {string} screenId - ID de la pantalla desde la base de datos
 * @returns {React.Component|null} Componente correspondiente o null si no existe
 */
export const getScreenComponent = (screenId) => {
  return SCREEN_COMPONENTS[screenId] || null;
};

/**
 * Función para verificar si existe un componente para un ID de pantalla
 * @param {string} screenId - ID de la pantalla desde la base de datos
 * @returns {boolean} true si existe el componente, false si no
 */
export const hasScreenComponent = (screenId) => {
  return screenId in SCREEN_COMPONENTS;
};

/**
 * Lista de todos los IDs de pantalla disponibles
 * @returns {string[]} Array con todos los IDs de pantalla disponibles
 */
export const getAvailableScreenIds = () => {
  return Object.keys(SCREEN_COMPONENTS);
};
