import { useState, useEffect } from "react";
import { supabaseClient } from "../utils/supabaseClient";

/**
 * Hook para cargar configuraciones de pantalla desde la base de datos
 * @param {string} clientId - ID del cliente
 * @param {string} screenId - ID de la pantalla
 * @returns {Object} { settings, isLoading, error }
 */
export const useLoadScreenSettings = (clientId, screenId) => {
  const [settings, setSettings] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      if (!clientId || !screenId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const { data, error: queryError } = await supabaseClient
          .from("client_screen_configs")
          .select("settings_json")
          .eq("client_id", clientId)
          .eq("screen_id", screenId)
          .single();

        if (queryError && queryError.code !== "PGRST116") {
          // PGRST116 = "no rows returned", que es normal si no existe la configuración
          throw new Error(`Error loading settings: ${queryError.message}`);
        }

        if (data && data.settings_json) {
          setSettings(data.settings_json);
        } else {
          setSettings({});
        }
      } catch (err) {
        console.error("Error loading screen settings:", err);
        setError(err.message || "Failed to load settings");
        setSettings({});
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, [clientId, screenId]);

  return { settings, isLoading, error };
};
