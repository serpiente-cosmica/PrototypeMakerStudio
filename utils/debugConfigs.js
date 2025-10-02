/**
 * Función para verificar configuraciones por defecto de un cliente
 * Útil para debugging y verificación
 */
import { supabaseClient } from "./supabaseClient";

/**
 * Verifica las configuraciones por defecto de un cliente
 * @param {string} clientId - ID del cliente
 * @returns {Object} Información sobre las configuraciones
 */
export const verifyDefaultConfigs = async (clientId) => {
  try {
    console.log(`🔍 Verifying default configs for client: ${clientId}`);

    // Obtener configuración del cliente
    const { data: clientConfig, error: clientError } = await supabaseClient
      .from("client_configs")
      .select("*")
      .eq("client_id", clientId)
      .single();

    if (clientError) {
      console.error("Error fetching client config:", clientError);
      return { success: false, error: clientError.message };
    }

    // Obtener configuraciones de pantallas
    const { data: screenConfigs, error: screenError } = await supabaseClient
      .from("client_screen_configs")
      .select("*")
      .eq("client_id", clientId);

    if (screenError) {
      console.error("Error fetching screen configs:", screenError);
      return { success: false, error: screenError.message };
    }

    // Obtener pantallas del approach
    const { data: approachScreens, error: approachError } = await supabaseClient
      .from("approach_screens")
      .select("screen_id")
      .eq("approach_id", clientConfig.approach_id);

    if (approachError) {
      console.error("Error fetching approach screens:", approachError);
      return { success: false, error: approachError.message };
    }

    const result = {
      success: true,
      clientConfig,
      approachScreens: approachScreens.map((s) => s.screen_id),
      screenConfigs: screenConfigs.map((sc) => ({
        screen_id: sc.screen_id,
        settings_json: sc.settings_json,
        created_at: sc.created_at,
      })),
      summary: {
        totalApproachScreens: approachScreens.length,
        totalScreenConfigs: screenConfigs.length,
        missingConfigs: [],
      },
    };

    // Verificar si faltan configuraciones
    const configuredScreens = screenConfigs.map((sc) => sc.screen_id);
    const missingConfigs = approachScreens
      .map((s) => s.screen_id)
      .filter((screenId) => !configuredScreens.includes(screenId));

    result.summary.missingConfigs = missingConfigs;

    console.log("✅ Verification complete:", result.summary);

    if (missingConfigs.length > 0) {
      console.warn("⚠️ Missing configs for screens:", missingConfigs);
    }

    return result;
  } catch (error) {
    console.error("Error verifying default configs:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Función para mostrar información de debug en consola
 * @param {string} clientId - ID del cliente
 */
export const debugClientConfigs = async (clientId) => {
  const result = await verifyDefaultConfigs(clientId);

  console.group(`🔍 Debug Info for Client: ${clientId}`);
  console.log("Client Config:", result.clientConfig);
  console.log("Approach Screens:", result.approachScreens);
  console.log("Screen Configs:", result.screenConfigs);
  console.log("Summary:", result.summary);
  console.groupEnd();

  return result;
};
