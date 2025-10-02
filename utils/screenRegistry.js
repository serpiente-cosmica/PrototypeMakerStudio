/**
 * Sistema de Registro de Pantallas
 * Permite registrar pantallas de forma aislada y escalable
 */

// Registro central de pantallas
const screenRegistry = new Map();

/**
 * Registra una nueva pantalla en el sistema
 * @param {string} screenId - ID único de la pantalla
 * @param {Object} screenData - Datos de la pantalla
 * @param {React.Component} screenData.component - Componente de la pantalla
 * @param {React.Component} screenData.configComponent - Componente de configuración
 * @param {Object} screenData.defaultConfig - Configuración por defecto
 * @param {Array} screenData.dependencies - Dependencias de otras pantallas
 */
export const registerScreen = (screenId, screenData) => {
  if (screenRegistry.has(screenId)) {
    console.warn(`Screen ${screenId} is already registered. Overwriting...`);
  }

  screenRegistry.set(screenId, {
    id: screenId,
    component: screenData.component,
    configComponent: screenData.configComponent,
    defaultConfig: screenData.defaultConfig || {},
    dependencies: screenData.dependencies || [],
    metadata: screenData.metadata || {},
    ...screenData,
  });

  console.log(`✅ Screen ${screenId} registered successfully. Total screens: ${screenRegistry.size}`);
};

/**
 * Obtiene una pantalla registrada
 * @param {string} screenId - ID de la pantalla
 * @returns {Object|null} Datos de la pantalla o null si no existe
 */
export const getScreen = (screenId) => {
  return screenRegistry.get(screenId) || null;
};

/**
 * Obtiene todas las pantallas registradas
 * @returns {Array} Array de todas las pantallas registradas
 */
export const getAllScreens = () => {
  return Array.from(screenRegistry.values());
};

/**
 * Obtiene el componente de una pantalla
 * @param {string} screenId - ID de la pantalla
 * @returns {React.Component|null} Componente de la pantalla
 */
export const getScreenComponent = (screenId) => {
  const screen = getScreen(screenId);
  if (!screen) {
    console.warn(`Screen ${screenId} not found in registry. Available screens:`, Array.from(screenRegistry.keys()));
  }
  return screen ? screen.component : null;
};

/**
 * Obtiene el componente de configuración de una pantalla
 * @param {string} screenId - ID de la pantalla
 * @returns {React.Component|null} Componente de configuración
 */
export const getScreenConfigComponent = (screenId) => {
  const screen = getScreen(screenId);
  return screen ? screen.configComponent : null;
};

/**
 * Obtiene la configuración por defecto de una pantalla
 * @param {string} screenId - ID de la pantalla
 * @returns {Object} Configuración por defecto
 */
export const getScreenDefaultConfig = (screenId) => {
  const screen = getScreen(screenId);
  return screen ? screen.defaultConfig : {};
};

/**
 * Verifica si una pantalla está registrada
 * @param {string} screenId - ID de la pantalla
 * @returns {boolean} True si está registrada
 */
export const isScreenRegistered = (screenId) => {
  return screenRegistry.has(screenId);
};

/**
 * Obtiene las dependencias de una pantalla
 * @param {string} screenId - ID de la pantalla
 * @returns {Array} Array de IDs de pantallas dependientes
 */
export const getScreenDependencies = (screenId) => {
  const screen = getScreen(screenId);
  return screen ? screen.dependencies : [];
};

/**
 * Valida que todas las dependencias estén registradas
 * @param {string} screenId - ID de la pantalla
 * @returns {boolean} True si todas las dependencias están registradas
 */
export const validateScreenDependencies = (screenId) => {
  const dependencies = getScreenDependencies(screenId);
  return dependencies.every((depId) => isScreenRegistered(depId));
};

/**
 * Obtiene información de debug del registro
 * @returns {Object} Información del registro
 */
export const getRegistryDebugInfo = () => {
  return {
    totalScreens: screenRegistry.size,
    registeredScreens: Array.from(screenRegistry.keys()),
    screens: getAllScreens().map((screen) => ({
      id: screen.id,
      hasComponent: !!screen.component,
      hasConfigComponent: !!screen.configComponent,
      dependencies: screen.dependencies,
      metadata: screen.metadata,
    })),
  };
};
