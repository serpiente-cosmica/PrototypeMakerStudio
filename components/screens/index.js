/**
 * Index file para todas las pantallas
 * Importa y registra todas las pantallas disponibles
 */

// Importar todas las pantallas para que se registren automáticamente
import "./login_generic_logo";
import "./login_generic_form";
import "./data_privacy";

// Exportar funciones del registry para uso externo
export {
  registerScreen,
  getScreen,
  getAllScreens,
  getScreenComponent,
  getScreenConfigComponent,
  getScreenDefaultConfig,
  isScreenRegistered,
  getScreenDependencies,
  validateScreenDependencies,
  getRegistryDebugInfo,
} from "../../utils/screenRegistry";
