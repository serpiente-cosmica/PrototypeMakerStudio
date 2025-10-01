import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";

/**
 * Hook para cargar la configuración de white label del cliente desde Supabase
 * @returns {Object} { config, isLoading, error }
 */
export const useAppConfig = () => {
  const router = useRouter();
  const [config, setConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadClientConfig = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Obtener clientId de la URL o usar 'default-foodbox' como fallback
        const clientId = router.query.clientId || "default-foodbox";

        // Realizar consultas simultáneas a ambas tablas
        const [clientConfigResult, screenConfigResult] = await Promise.all([
          supabase
            .from("client_configs")
            .select("*")
            .eq("client_id", clientId)
            .single(),
          supabase
            .from("client_screen_configs")
            .select("*")
            .eq("client_id", clientId),
        ]);

        // Verificar errores en las consultas
        if (clientConfigResult.error) {
          throw new Error(
            `Error cargando configuración del cliente: ${clientConfigResult.error.message}`
          );
        }

        if (screenConfigResult.error) {
          throw new Error(
            `Error cargando configuración de pantallas: ${screenConfigResult.error.message}`
          );
        }

        // Combinar los resultados en un objeto final
        const finalConfig = {
          clientId: clientConfigResult.data.client_id,
          appName: clientConfigResult.data.app_name,
          logo: clientConfigResult.data.logo,
          primaryColor: clientConfigResult.data.primary_color,
          secondaryColor: clientConfigResult.data.secondary_color,
          approach: clientConfigResult.data.approach,
          features: clientConfigResult.data.features || {},
          screens: screenConfigResult.data.reduce((acc, screen) => {
            acc[screen.screen_name] = {
              ...screen,
              // Agregar cualquier transformación necesaria aquí
            };
            return acc;
          }, {}),
          createdAt: clientConfigResult.data.created_at,
          status: clientConfigResult.data.status,
        };

        setConfig(finalConfig);
      } catch (err) {
        console.error("Error cargando configuración del cliente:", err);
        setError(err.message);

        // Fallback a configuración por defecto si hay error
        setConfig({
          clientId: "default-foodbox",
          appName: "Demo App",
          logo: "/logos/default-logo.png",
          primaryColor: "#3b82f6",
          secondaryColor: "#64748b",
          approach: "Foodbox",
          features: { defaultFeature: true },
          screens: {},
          createdAt: new Date().toISOString(),
          status: "active",
        });
      } finally {
        setIsLoading(false);
      }
    };

    // Solo ejecutar cuando el router esté listo
    if (router.isReady) {
      loadClientConfig();
    }
  }, [router.isReady, router.query.clientId]);

  return {
    config,
    isLoading,
    error,
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

        // Consultar todos los clientes desde Supabase
        const { data, error: queryError } = await supabase
          .from("client_configs")
          .select("*")
          .eq("status", "active");

        if (queryError) {
          throw new Error(`Error cargando clientes: ${queryError.message}`);
        }

        // Convertir configuraciones a lista de clientes con URLs
        const clientsList = data.map((client) => ({
          clientId: client.client_id,
          appName: client.app_name,
          logoUrl: client.logo,
          approach: client.approach,
          primaryColor: client.primary_color,
          secondaryColor: client.secondary_color,
          features: client.features || {},
          createdAt: client.created_at,
          status: client.status,
          demoUrl: `/demo/${client.client_id}`,
          adminUrl: `/demo/${client.client_id}/admin`,
        }));

        setClients(clientsList);
      } catch (err) {
        console.error("Error cargando clientes:", err);
        setError(err.message);
        setClients([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadClients();
  }, []);

  return {
    clients,
    isLoading,
    error,
  };
};

export default useAppConfig;
