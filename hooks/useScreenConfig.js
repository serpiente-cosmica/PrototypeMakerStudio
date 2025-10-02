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
  cachedConfig = null,
  refetchClientConfig = null
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
          // Colores desde client_configs
          background_color: clientConfig.colors_json?.background || "#ffffff",
          primary_color: clientConfig.colors_json?.primary || "#017755",
          secondary_color: clientConfig.colors_json?.secondary || "#64748b",
          accent_color: clientConfig.colors_json?.accent || "#f97316",
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

        // Para pantallas posteriores a login_generic_logo, agregar colores globales
        const globalColors =
          screenId !== "login_generic_logo"
            ? {
                background_color:
                  clientConfig.colors_json?.background || "#ffffff",
                primary_color: clientConfig.colors_json?.primary || "#017755",
                secondary_color:
                  clientConfig.colors_json?.secondary || "#64748b",
                accent_color: clientConfig.colors_json?.accent || "#f97316",
              }
            : {};

        console.log(`🔍 useScreenConfig - ${screenId} color sources:`, {
          clientConfig_colors: clientConfig.colors_json,
          globalColors,
          savedConfig,
        });

        // Combinar configuración del cliente con específica de pantalla
        // Los colores globales tienen prioridad sobre savedConfig para evitar sobrescritura
        const finalConfig = {
          ...defaultConfig,
          ...savedConfig,
          ...globalColors, // Colores globales para pantallas posteriores (prioridad final)
        };

        console.log(`🎨 useScreenConfig - ${screenId} final config:`, {
          defaultConfig,
          savedConfig,
          globalColors,
          finalConfig: {
            background_color: finalConfig.background_color,
            primary_color: finalConfig.primary_color,
            secondary_color: finalConfig.secondary_color,
            accent_color: finalConfig.accent_color,
          },
        });

        setScreenConfig(finalConfig);
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

        // Para login_generic_logo, manejar logo_url, colores y navigation_config por separado
        if (screenId === "login_generic_logo") {
          // 1. Actualizar client_configs si se cambiaron campos
          const updates = {};
          let hasUpdates = false;

          // Logo URL
          if (
            newConfig.logo_url &&
            newConfig.logo_url !== clientConfig.logoUrl
          ) {
            updates.logo_url = newConfig.logo_url;
            hasUpdates = true;
            console.log("🔄 Updating client logo_url:", newConfig.logo_url);
          }

          // Colores
          const currentColors = clientConfig.colors_json || {};
          const newColors = { ...currentColors };

          if (
            newConfig.background_color &&
            newConfig.background_color !== currentColors.background
          ) {
            newColors.background = newConfig.background_color;
            hasUpdates = true;
            console.log(
              "🔄 Updating background color:",
              newConfig.background_color
            );
          }

          if (
            newConfig.primary_color &&
            newConfig.primary_color !== currentColors.primary
          ) {
            newColors.primary = newConfig.primary_color;
            hasUpdates = true;
            console.log("🔄 Updating primary color:", newConfig.primary_color);
          }

          if (
            newConfig.secondary_color &&
            newConfig.secondary_color !== currentColors.secondary
          ) {
            newColors.secondary = newConfig.secondary_color;
            hasUpdates = true;
            console.log(
              "🔄 Updating secondary color:",
              newConfig.secondary_color
            );
          }

          if (
            newConfig.accent_color &&
            newConfig.accent_color !== currentColors.accent
          ) {
            newColors.accent = newConfig.accent_color;
            hasUpdates = true;
            console.log("🔄 Updating accent color:", newConfig.accent_color);
          }

          if (hasUpdates) {
            if (Object.keys(newColors).length > 0) {
              updates.colors_json = newColors;
            }
            updates.updated_at = new Date().toISOString();

            await supabaseClient
              .from("client_configs")
              .update(updates)
              .eq("client_id", clientId);

            // Refrescar clientConfig después de actualizar colores
            if (refetchClientConfig) {
              console.log("🔄 Refreshing client config after color update");
              await refetchClientConfig();
            }
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

        // Para login_generic_form y pantallas posteriores, NO guardar colores globales
        if (screenId !== "login_generic_logo") {
          // Eliminar colores globales de la configuración a guardar
          delete configToSave.background_color;
          delete configToSave.primary_color;
          delete configToSave.secondary_color;
          delete configToSave.accent_color;
          console.log(
            `ℹ️ ${screenId}: Removed global colors from screen config (managed globally)`
          );
        }

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
