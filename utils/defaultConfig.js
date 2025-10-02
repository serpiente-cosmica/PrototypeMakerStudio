/**
 * Configuración por defecto de colores del diseño
 * Se usa cuando el cliente no proporciona colores personalizados
 */
export const DEFAULT_BRAND_COLORS = {
  primary: "#017755", // Verde principal de Advanta
  secondary: "#64748b", // Gris secundario
  background: "#ffffff", // Fondo blanco
  accent: "#f59e0b", // Naranja de acento
};

/**
 * Configuración completa por defecto para un cliente nuevo
 */
export const DEFAULT_CLIENT_CONFIG = {
  logo_url: null, // Se establecerá dinámicamente
  colors_json: DEFAULT_BRAND_COLORS,
};

/**
 * Verifica si un cliente tiene configuración por defecto
 * @param {Object} clientConfig - Configuración del cliente
 * @returns {boolean} True si usa configuración por defecto
 */
export const isUsingDefaultConfig = (clientConfig) => {
  if (!clientConfig) return true;

  // Verificar si los colores coinciden con los por defecto
  const colorsMatch =
    JSON.stringify(clientConfig.colors_json) ===
    JSON.stringify(DEFAULT_BRAND_COLORS);

  // Verificar si no hay logo personalizado
  const hasCustomLogo =
    clientConfig.logo_url &&
    !clientConfig.logo_url.includes("data:image/svg+xml") &&
    !clientConfig.logo_url.includes("via.placeholder.com");

  return colorsMatch && !hasCustomLogo;
};
