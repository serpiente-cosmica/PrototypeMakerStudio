import { useState } from "react";
import { supabaseClient } from "../utils/supabaseClient";

/**
 * Hook para crear un nuevo cliente
 * @returns {Object} { createClient, isLoading, error, success }
 */
export const useCreateClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createClient = async (clientData) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      const { data, error: supabaseError } = await supabaseClient
        .from("client_configs")
        .insert([
          {
            client_id: clientData.client_id,
            approach_id: clientData.approach_id,
            app_name: clientData.app_name,
            colors_json: clientData.colors_json || null,
            logo_url: clientData.logo_url || null,
          },
        ])
        .select()
        .single();

      if (supabaseError) {
        throw supabaseError;
      }

      setSuccess(true);
      return data;
    } catch (err) {
      console.error("Error creating client:", err);
      setError(err.message || "Failed to create client");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
  };

  return { createClient, isLoading, error, success, resetState };
};
