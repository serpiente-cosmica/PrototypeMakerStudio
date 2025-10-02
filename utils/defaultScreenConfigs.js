/**
 * Función para crear configuraciones por defecto de pantallas para un nuevo cliente
 * Se ejecuta automáticamente cuando se crea un cliente
 */
import { supabaseClient } from "./supabaseClient";
import { getAllScreens } from "./screenRegistry";
import { DEFAULT_LOGO_URL } from "./defaultLogo";

/**
 * Crea configuraciones por defecto para todas las pantallas de un approach
 * @param {string} clientId - ID del cliente
 * @param {string} approachId - ID del approach
 * @param {Object} clientConfig - Configuración base del cliente
 */
export const createDefaultScreenConfigs = async (
  clientId,
  approachId,
  clientConfig = {}
) => {
  try {
    console.log(
      `🔄 Creating default screen configs for client: ${clientId}, approach: ${approachId}`
    );

    // Obtener todas las pantallas disponibles
    const allScreens = getAllScreens();

    // Obtener las pantallas que pertenecen a este approach desde la base de datos
    const { data: approachScreens, error: approachError } = await supabaseClient
      .from("approach_screens")
      .select("screen_id")
      .eq("approach_id", approachId);

    if (approachError) {
      console.error("Error fetching approach screens:", approachError);
      return false;
    }

    if (!approachScreens || approachScreens.length === 0) {
      console.warn(`No screens found for approach: ${approachId}`);
      return false;
    }

    // Crear configuraciones por defecto para cada pantalla del approach
    const configsToInsert = [];

    for (const approachScreen of approachScreens) {
      const screenId = approachScreen.screen_id;
      const screenData = allScreens.find((screen) => screen.id === screenId);

      if (!screenData) {
        console.warn(`Screen ${screenId} not found in registry`);
        continue;
      }

      // Para login_generic_logo, NO crear configuración en client_screen_configs
      if (screenId === "login_generic_logo") {
        console.log(
          `ℹ️ Skipping client_screen_configs creation for ${screenId} - uses client_configs only`
        );
        continue;
      }

      // Para otras pantallas, crear configuración en client_screen_configs
      // Verificar si hay logo válido del cliente, sino usar logo por defecto
      const hasValidClientLogo =
        clientConfig.logoUrl && clientConfig.logoUrl.trim() !== "";
      const finalLogoUrl = hasValidClientLogo
        ? clientConfig.logoUrl
        : DEFAULT_LOGO_URL;

      const defaultConfig = {
        // Configuración base del cliente con valores por defecto de Figma
        logo_url: finalLogoUrl,
        background_color: clientConfig.colors_json?.background || "#ffffff",
        primary_color: clientConfig.colors_json?.primary || "#017755",
        secondary_color: clientConfig.colors_json?.secondary || "#64748b",
        accent_color: clientConfig.colors_json?.accent || "#f59e0b",
        button_color: clientConfig.colors_json?.primary || "#017755",
        text_color: "#000000",
        // Configuración específica de la pantalla (basada en Figma)
        ...screenData.defaultConfig,
      };

      configsToInsert.push({
        client_id: clientId,
        screen_id: screenId,
        settings_json: defaultConfig,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      console.log(`✅ Prepared default config for screen: ${screenId}`, {
        logo_url: defaultConfig.logo_url?.substring(0, 50) + "...",
        primary_color: defaultConfig.primary_color,
        background_color: defaultConfig.background_color,
      });
    }

    // Insertar todas las configuraciones de una vez
    if (configsToInsert.length > 0) {
      const { error: insertError } = await supabaseClient
        .from("client_screen_configs")
        .insert(configsToInsert);

      if (insertError) {
        console.error("Error inserting default screen configs:", insertError);
        return false;
      }

      console.log(
        `✅ Created ${configsToInsert.length} default screen configurations`
      );
    }

    return true;
  } catch (error) {
    console.error("Error creating default screen configs:", error);
    return false;
  }
};

/**
 * Función para obtener configuración por defecto de una pantalla específica
 * @param {string} screenId - ID de la pantalla
 * @param {Object} clientConfig - Configuración base del cliente
 * @returns {Object} Configuración por defecto combinada
 */
export const getDefaultScreenConfig = (screenId, clientConfig = {}) => {
  const allScreens = getAllScreens();
  const screenData = allScreens.find((screen) => screen.id === screenId);

  if (!screenData) {
    console.warn(`Screen ${screenId} not found in registry`);
    return {};
  }

  // Para login_generic_logo, solo propiedades específicas de la pantalla
  if (screenId === "login_generic_logo") {
    return { ...screenData.defaultConfig };
  }

  // Para otras pantallas, combinar con configuración del cliente
  return {
    // Configuración base del cliente
    logo_url: clientConfig.logoUrl || "",
    background_color: clientConfig.colors_json?.background || "#ffffff",
    primary_color: clientConfig.colors_json?.primary || "#3b82f6",
    secondary_color: clientConfig.colors_json?.secondary || "#64748b",
    accent_color: clientConfig.colors_json?.accent || "#f59e0b",
    button_color: clientConfig.colors_json?.primary || "#3b82f6",
    text_color: "#000000",
    // Configuración específica de la pantalla (basada en Figma)
    ...screenData.defaultConfig,
  };
};
