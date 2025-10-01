import { useState, useEffect } from "react";
import { supabaseClient } from "../utils/supabaseClient";

/**
 * Hook para obtener los approaches disponibles desde Supabase
 * @returns {Object} { approaches, isLoading, error }
 */
export const useAppApproaches = () => {
  const [approaches, setApproaches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApproaches = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Consulta a la tabla app_approaches
        const { data, error: supabaseError } = await supabaseClient
          .from("app_approaches")
          .select("*")
          .order("created_at", { ascending: true });

        if (supabaseError) {
          throw supabaseError;
        }

        // Marcar todos los approaches de la DB como disponibles
        const approachesWithAvailability = (data || []).map((approach) => ({
          ...approach,
          available: true,
          color: approach.color || "blue", // Color por defecto si no existe
        }));

        setApproaches(approachesWithAvailability);
      } catch (err) {
        console.error("Error fetching approaches:", err);
        setError(err.message || "Failed to fetch approaches");

        // Fallback con datos mock si hay error de conexión
        setApproaches([
          {
            approach_id: "550e8400-e29b-41d4-a716-446655440001",
            name: "Approach 1",
            description: "Base configuration with dynamic white label settings",
            screen_list_json: null,
            created_at: new Date().toISOString(),
            updated_at: null,
            // Campos adicionales para el frontend
            color: "blue",
            available: true,
          },
          {
            approach_id: "550e8400-e29b-41d4-a716-446655440002",
            name: "Approach 2",
            description: "Advanced customization features",
            screen_list_json: null,
            created_at: new Date().toISOString(),
            updated_at: null,
            // Campos adicionales para el frontend
            color: "purple",
            available: false,
          },
          {
            approach_id: "550e8400-e29b-41d4-a716-446655440003",
            name: "Approach 3",
            description: "Enterprise-level configurations",
            screen_list_json: null,
            created_at: new Date().toISOString(),
            updated_at: null,
            // Campos adicionales para el frontend
            color: "green",
            available: false,
          },
          {
            approach_id: "550e8400-e29b-41d4-a716-446655440004",
            name: "Approach 4",
            description: "Mobile-first design approach",
            screen_list_json: null,
            created_at: new Date().toISOString(),
            updated_at: null,
            // Campos adicionales para el frontend
            color: "orange",
            available: false,
          },
          {
            approach_id: "550e8400-e29b-41d4-a716-446655440005",
            name: "Approach 5",
            description: "Custom integrations and APIs",
            screen_list_json: null,
            created_at: new Date().toISOString(),
            updated_at: null,
            // Campos adicionales para el frontend
            color: "red",
            available: false,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApproaches();
  }, []);

  return { approaches, isLoading, error };
};
