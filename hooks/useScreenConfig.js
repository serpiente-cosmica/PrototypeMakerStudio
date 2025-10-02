/**
 * useScreenConfig - Hook aislado para configuraciones de pantalla
 * Cada pantalla puede usar este hook sin afectar a otras
 */
import { useState, useEffect, useCallback } from "react";
import { supabaseClient } from "../utils/supabaseClient";
import { getScreenDefaultConfig } from "../utils/screenRegistry";
import { getDefaultScreenConfig } from "../utils/defaultScreenConfigs";

/**
 * Hook para manejar configuración específica de una pantalla
 * @param {string} clientId - ID del cliente
 * @param {string} screenId - ID de la pantalla
 * @param {Object} clientConfig - Configuración base del cliente
 * @param {Object} cachedConfig - Configuración en cache (opcional)
 * @returns {Object} Objeto con funciones de configuración
 */
export const useScreenConfig = (
  clientId,
  screenId,
  clientConfig = {},
  cachedConfig = null
) => {
  const [screenConfig, setScreenConfig] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener configuración por defecto específica de la pantalla
  const getDefaultConfig = useCallback(() => {
    // Usar la función mejorada que combina configuración del cliente con Figma defaults
    return getDefaultScreenConfig(screenId, clientConfig);
  }, [screenId, clientConfig]);

  // Cargar configuración específica de la pantalla
  const loadScreenConfig = useCallback(async () => {
    if (!clientId || !screenId) return;

    // Si hay configuración en cache, usarla primero
    if (cachedConfig) {
      setScreenConfig(cachedConfig);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const defaultConfig = getDefaultConfig();

      if (screenId === "login_generic_logo") {
        // Para login_generic_logo, cargar navigation_config desde client_screen_configs
        console.log(
          "ℹ️ login_generic_logo: Loading navigation_config from client_screen_configs"
        );

        const { data: screenData, error: fetchError } = await supabaseClient
          .from("client_screen_configs")
          .select("settings_json")
          .eq("client_id", clientId)
          .eq("screen_id", screenId)
          .maybeSingle();

        if (fetchError) {
          console.warn("Error loading navigation config:", fetchError);
        }

        const navigationConfig =
          screenData?.settings_json?.navigation_config || {};

        setScreenConfig({
          ...defaultConfig,
          logo_url: clientConfig.logoUrl || defaultConfig.logo_url, // Logo del cliente
          logo_size: "150px", // Default size
          logo_position: "center", // Default position
          navigation_config: navigationConfig, // Navigation config desde DB
        });
      } else {
        // Para otras pantallas, consultar client_screen_configs normalmente
        const { data, error: fetchError } = await supabaseClient
          .from("client_screen_configs")
          .select("*")
          .eq("client_id", clientId)
          .eq("screen_id", screenId)
          .maybeSingle();

        if (fetchError) {
          console.warn(
            `Error fetching config for screen ${screenId}:`,
            fetchError
          );
        }

        const savedConfig = data?.settings_json || {};

        // Combinar configuración del cliente con específica de pantalla
        setScreenConfig({
          ...defaultConfig,
          ...savedConfig,
        });
      }
    } catch (err) {
      setError(
        err.message || `Error loading configuration for screen ${screenId}`
      );
      console.error(`Error loading screen config for ${screenId}:`, err);
    } finally {
      setIsLoading(false);
    }
  }, [clientId, screenId, clientConfig, cachedConfig, getDefaultConfig]);

  // Guardar configuración específica de la pantalla
  const saveScreenConfig = useCallback(
    async (newConfig, showSuccess = false) => {
      if (!clientId || !screenId) return false;

      try {
        setIsLoading(true);
        setError(null);

        // Para login_generic_logo, manejar logo_url y navigation_config por separado
        if (screenId === "login_generic_logo") {
          // 1. Actualizar client_configs si se cambió el logo_url
          if (
            newConfig.logo_url &&
            newConfig.logo_url !== clientConfig.logoUrl
          ) {
            console.log("🔄 Updating client logo_url:", newConfig.logo_url);
            await supabaseClient
              .from("client_configs")
              .update({
                logo_url: newConfig.logo_url,
                updated_at: new Date().toISOString(),
              })
              .eq("client_id", clientId);
          }

          // 2. Guardar navigation_config en client_screen_configs (excepción especial)
          if (newConfig.navigation_config) {
            console.log("🔄 Saving navigation_config for login_generic_logo");

            // Verificar si ya existe configuración para esta pantalla
            const { data: existingData } = await supabaseClient
              .from("client_screen_configs")
              .select("id")
              .eq("client_id", clientId)
              .eq("screen_id", screenId)
              .maybeSingle();

            const configData = {
              client_id: clientId,
              screen_id: screenId,
              settings_json: { navigation_config: newConfig.navigation_config },
              updated_at: new Date().toISOString(),
            };

            let result;
            if (existingData) {
              // Actualizar configuración existente
              result = await supabaseClient
                .from("client_screen_configs")
                .update(configData)
                .eq("id", existingData.id);
            } else {
              // Crear nueva configuración
              result = await supabaseClient
                .from("client_screen_configs")
                .insert({
                  ...configData,
                  created_at: new Date().toISOString(),
                });
            }

            if (result.error) {
              throw result.error;
            }
          }

          setScreenConfig(newConfig);
          return true;
        }

        // Para otras pantallas, verificar si ya existe configuración
        const { data: existingData } = await supabaseClient
          .from("client_screen_configs")
          .select("id")
          .eq("client_id", clientId)
          .eq("screen_id", screenId)
          .maybeSingle();

        // Filtrar configuración según el tipo de pantalla
        let configToSave = { ...newConfig };

        const configData = {
          client_id: clientId,
          screen_id: screenId,
          settings_json: configToSave,
          updated_at: new Date().toISOString(),
        };

        let result;
        if (existingData) {
          result = await supabaseClient
            .from("client_screen_configs")
            .update(configData)
            .eq("id", existingData.id);
        } else {
          result = await supabaseClient
            .from("client_screen_configs")
            .insert(configData);
        }

        if (result.error) {
          throw result.error;
        }

        setScreenConfig(newConfig);

        if (showSuccess) {
          console.log(`✅ Screen configuration saved for ${screenId}`);
        }

        return true;
      } catch (err) {
        setError(
          err.message || `Error saving configuration for screen ${screenId}`
        );
        console.error(`Error saving screen config for ${screenId}:`, err);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [clientId, screenId]
  );

  // Actualizar configuración local
  const updateScreenConfig = useCallback((updates) => {
    setScreenConfig((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  // Resetear a configuración por defecto
  const resetToDefault = useCallback(() => {
    const defaultConfig = getDefaultConfig();
    setScreenConfig(defaultConfig);
  }, [getDefaultConfig]);

  // Cargar configuración cuando cambie el clientId o screenId
  useEffect(() => {
    if (clientId && screenId) {
      loadScreenConfig();
    }
  }, [clientId, screenId, loadScreenConfig]);

  return {
    screenConfig,
    isLoading,
    error,
    saveScreenConfig,
    updateScreenConfig,
    resetToDefault,
    refetch: loadScreenConfig,
  };
};
