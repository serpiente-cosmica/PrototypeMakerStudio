import { useState, useEffect, useCallback } from "react";
import { supabaseClient } from "../utils/supabaseClient";

/**
 * Hook para manejar configuración específica por pantalla con cache local
 * @param {string} clientId - ID del cliente
 * @param {string} screenId - ID de la pantalla
 * @param {Object} defaultConfig - Configuración por defecto del cliente
 * @param {Object} cachedConfig - Configuración en cache (opcional)
 * @returns {Object} Objeto con funciones de configuración por pantalla
 */
export const useScreenSpecificConfig = (
  clientId,
  screenId,
  defaultConfig = {},
  cachedConfig = null
) => {
  const [screenConfig, setScreenConfig] = useState(cachedConfig || {});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar configuración específica de la pantalla
  const loadScreenConfig = useCallback(async () => {
    if (!clientId || !screenId) return;

    try {
      setIsLoading(true);
      setError(null);

      // Si hay configuración en cache, usarla primero
      if (cachedConfig) {
        setScreenConfig(cachedConfig);
        setIsLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabaseClient
        .from("client_screen_configs")
        .select("*")
        .eq("client_id", clientId)
        .eq("screen_id", screenId)
        .maybeSingle();

      if (fetchError) {
        console.warn("Error fetching screen config:", fetchError);
        // No lanzar error, usar valores por defecto
      }

      // Si no hay configuración específica, usar valores por defecto
      if (data) {
        // Combinar configuración guardada con valores por defecto del cliente
        const savedConfig = data.settings_json || {};
        
        // Para login_generic_logo, solo gestionar propiedades específicas de la pantalla
        if (screenId === "login_generic_logo") {
          const screenSpecificDefaults = getDefaultFieldsForScreen(screenId);
          setScreenConfig({
            ...screenSpecificDefaults, // Solo logo_size, logo_position
            ...savedConfig, // Fusionar configuración específica guardada
          });
        } else {
          // Para otras pantallas, combinar configuración del cliente con específica de pantalla
          const defaultScreenConfig = {
            logo_url: defaultConfig.logoUrl || "",
            background_color: defaultConfig.colors_json?.background || "#ffffff",
            primary_color: defaultConfig.colors_json?.primary || "#3b82f6",
            secondary_color: defaultConfig.colors_json?.secondary || "#64748b",
            accent_color: defaultConfig.colors_json?.accent || "#f59e0b",
            button_color: defaultConfig.colors_json?.primary || "#3b82f6",
            text_color: "#000000",
            // Campos específicos por tipo de pantalla
            ...getDefaultFieldsForScreen(screenId),
          };
          // Combinar configuración guardada con valores por defecto
          setScreenConfig({ ...defaultScreenConfig, ...savedConfig });
        }
      } else {
        // Crear configuración por defecto basada en la configuración del cliente
        if (screenId === "login_generic_logo") {
          // Para login_generic_logo, solo propiedades específicas de la pantalla
          const screenSpecificDefaults = getDefaultFieldsForScreen(screenId);
          setScreenConfig(screenSpecificDefaults);
        } else {
          // Para otras pantallas, incluir configuración del cliente
          const defaultScreenConfig = {
            logo_url: defaultConfig.logoUrl || "",
            background_color: defaultConfig.colors_json?.background || "#ffffff",
            primary_color: defaultConfig.colors_json?.primary || "#3b82f6",
            secondary_color: defaultConfig.colors_json?.secondary || "#64748b",
            accent_color: defaultConfig.colors_json?.accent || "#f59e0b",
            button_color: defaultConfig.colors_json?.primary || "#3b82f6",
            text_color: "#000000",
            // Campos específicos por tipo de pantalla
            ...getDefaultFieldsForScreen(screenId),
          };
          setScreenConfig(defaultScreenConfig);
        }
      }
    } catch (err) {
      setError(err.message || "Error loading screen configuration");
      console.error("Error loading screen config:", err);
    } finally {
      setIsLoading(false);
    }
  }, [clientId, screenId, defaultConfig, cachedConfig]);

  // Guardar configuración específica de la pantalla (automático)
  const saveScreenConfig = useCallback(
    async (newConfig, showSuccess = false) => {
      if (!clientId || !screenId) return false;

      try {
        setIsLoading(true);
        setError(null);

        // Verificar si ya existe configuración para esta pantalla
        const { data: existingData } = await supabaseClient
          .from("client_screen_configs")
          .select("id")
          .eq("client_id", clientId)
          .eq("screen_id", screenId)
          .maybeSingle();

        // Filtrar configuración según el tipo de pantalla
        let configToSave = { ...newConfig };
        
        // Para login_generic_logo, solo guardar propiedades específicas de la pantalla
        if (screenId === "login_generic_logo") {
          // Solo mantener logo_size y logo_position
          configToSave = {
            logo_size: newConfig.logo_size,
            logo_position: newConfig.logo_position,
          };
        }

        const configData = {
          client_id: clientId,
          screen_id: screenId,
          settings_json: configToSave,
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
            .insert(configData);
        }

        if (result.error) {
          throw result.error;
        }

        setScreenConfig(newConfig);

        if (showSuccess) {
          console.log("✅ Screen configuration saved successfully!");
        }

        return true;
      } catch (err) {
        setError(err.message || "Error saving screen configuration");
        console.error("Error saving screen config:", err);
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
    if (screenId === "login_generic_logo") {
      // Para login_generic_logo, solo propiedades específicas de la pantalla
      const screenSpecificDefaults = getDefaultFieldsForScreen(screenId);
      setScreenConfig(screenSpecificDefaults);
    } else {
      // Para otras pantallas, incluir configuración del cliente
      const defaultScreenConfig = {
        logo_url: defaultConfig.logoUrl || "",
        background_color: defaultConfig.colors_json?.background || "#ffffff",
        primary_color: defaultConfig.colors_json?.primary || "#3b82f6",
        secondary_color: defaultConfig.colors_json?.secondary || "#64748b",
        accent_color: defaultConfig.colors_json?.accent || "#f59e0b",
        button_color: defaultConfig.colors_json?.primary || "#3b82f6",
        text_color: "#000000",
        ...getDefaultFieldsForScreen(screenId),
      };
      setScreenConfig(defaultScreenConfig);
    }
  }, [defaultConfig, screenId]);

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

/**
 * Obtiene campos por defecto específicos para cada tipo de pantalla
 * @param {string} screenId - ID de la pantalla
 * @returns {Object} Campos por defecto específicos
 */
const getDefaultFieldsForScreen = (screenId) => {
  switch (screenId) {
    case "login_generic_logo":
      return {
        logo_size: "150px",
        logo_position: "center",
      };
    case "login_generic_form":
      return {
        email_placeholder: "dmorales@advantahealth.com",
        password_placeholder: "**********",
        login_button_text: "Log In",
        forgot_password_text: "Forgot Password?",
        new_account_text:
          "No account yet? Tap here to verify your eligibility.",
        button_radius: "12px",
        second_logo_url: "", // Campo para segunda imagen
      };
    case "home_dashboard":
      return {
        welcome_text: "Welcome to your dashboard",
        dashboard_title: "Dashboard",
      };
    case "profile_settings":
      return {
        profile_title: "Profile Settings",
        save_button_text: "Save Changes",
      };
    default:
      return {};
  }
};
