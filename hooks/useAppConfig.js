import { useState, useEffect, useCallback } from "react";
import { supabaseClient } from "../utils/supabaseClient";

/**
 * Hook para cargar la configuración de white label del cliente desde Supabase
 * @param {string} clientId - ID del cliente
 * @returns {Object} { config, isLoading, error, refetch }
 */
export const useAppConfig = (clientId) => {
  const [config, setConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadClientConfig = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!clientId) {
        throw new Error("Client ID is required");
      }

      console.log("🔄 Loading config for client:", clientId);

      // Consultar configuración del cliente desde Supabase
      const { data, error: queryError } = await supabaseClient
        .from("client_configs")
        .select(
          `
          *,
          app_approaches!inner(name)
        `
        )
        .eq("client_id", clientId)
        .single();

      if (queryError) {
        console.error("❌ Error loading client config:", queryError);
        throw new Error(`Error loading client config: ${queryError.message}`);
      }

      if (data) {
        console.log("useAppConfig: Client data loaded:", data);
        const finalConfig = {
          clientId: data.client_id,
          appName: data.app_name,
          logoUrl: data.logo_url,
          colors_json: data.colors_json,
          approach_id: data.approach_id,
          approach_name: data.app_approaches?.name || "Unknown Approach",
          screens: {},
          createdAt: data.created_at,
        };
        console.log("✅ Config loaded:", finalConfig);
        setConfig(finalConfig);
      }
    } catch (err) {
      console.error("❌ Error loading client config:", err);
      setError(err.message);
      // Don't set mock data - let the UI handle the error properly
      setConfig(null);
    } finally {
      setIsLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    if (clientId) {
      loadClientConfig();
    }
  }, [clientId, loadClientConfig]);

  return {
    config,
    isLoading,
    error,
    refetch: loadClientConfig,
  };
};

/**
 * Hook para obtener todos los clientes disponibles desde Supabase
 * @returns {Object} { clients, isLoading, error }
 */
export const useClients = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadClients = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Consultar todos los clientes desde Supabase con JOIN para obtener el approach_name
        const { data, error: queryError } = await supabaseClient.from(
          "client_configs"
        ).select(`
            *,
            app_approaches!inner(name)
          `);

        if (queryError) {
          throw new Error(`Error cargando clientes: ${queryError.message}`);
        }

        // Convertir configuraciones a lista de clientes con URLs
        const clientsList = data.map((client) => ({
          clientId: client.client_id,
          appName: client.app_name,
          logoUrl: client.logo_url,
          colors_json: client.colors_json,
          approach_id: client.approach_id,
          approach: client.app_approaches?.name || "Unknown Approach",
          createdAt: client.created_at,
          demoUrl: `/demo/${client.client_id}`,
          adminUrl: `/demo/${client.client_id}/admin`,
        }));

        setClients(clientsList);
      } catch (err) {
        console.error("Error cargando clientes:", err);
        setError(err.message);
        // Don't show fake clients - let the portal show "No clients found"
        setClients([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadClients();
  }, []);

  return { clients, isLoading, error };
};
