import { useState } from "react";
import { supabaseClient } from "../utils/supabaseClient";

/**
 * Hook para guardar configuraciones de pantalla en la base de datos
 * @returns {Object} { saveSettings, isLoading, error, success }
 */
export const useSaveScreenSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const saveSettings = async (clientId, screenId, settings) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      // Verificar si ya existe una configuración para esta pantalla
      const { data: existingConfig, error: selectError } = await supabaseClient
        .from("client_screen_configs")
        .select("*")
        .eq("client_id", clientId)
        .eq("screen_id", screenId)
        .single();

      if (selectError && selectError.code !== "PGRST116") {
        // PGRST116 = "no rows returned", que es normal si no existe la configuración
        throw new Error(
          `Error checking existing config: ${selectError.message}`
        );
      }

      if (existingConfig) {
        // Actualizar configuración existente
        const { error: updateError } = await supabaseClient
          .from("client_screen_configs")
          .update({
            settings_json: settings,
            updated_at: new Date().toISOString(),
          })
          .eq("client_id", clientId)
          .eq("screen_id", screenId);

        if (updateError) {
          throw new Error(`Error updating config: ${updateError.message}`);
        }
      } else {
        // Crear nueva configuración
        const { error: insertError } = await supabaseClient
          .from("client_screen_configs")
          .insert({
            client_id: clientId,
            screen_id: screenId,
            settings_json: settings,
            created_at: new Date().toISOString(),
          });

        if (insertError) {
          throw new Error(`Error creating config: ${insertError.message}`);
        }
      }

      setSuccess(true);
      return true;
    } catch (err) {
      console.error("Error saving screen settings:", err);
      setError(err.message || "Failed to save settings");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
  };

  return { saveSettings, isLoading, error, success, resetState };
};
