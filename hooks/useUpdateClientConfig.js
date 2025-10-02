import { useState } from "react";
import { supabaseClient } from "../utils/supabaseClient";

/**
 * Hook para actualizar la configuración del cliente en client_configs
 * @returns {Object} { updateClientConfig, isLoading, error, success }
 */
export const useUpdateClientConfig = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateClientConfig = async (clientId, updates) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      console.log("🔄 Updating client config:", { clientId, updates });

      const { data, error: updateError } = await supabaseClient
        .from("client_configs")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("client_id", clientId)
        .select();

      if (updateError) {
        console.error("❌ Error updating client config:", updateError);
        throw updateError;
      }

      console.log("✅ Client config updated successfully:", data);
      setSuccess(true);
      return true;
    } catch (err) {
      console.error("❌ Error in updateClientConfig:", err);
      setError(err.message || "Failed to update client configuration");
      setSuccess(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
  };

  return { updateClientConfig, isLoading, error, success, resetState };
};
