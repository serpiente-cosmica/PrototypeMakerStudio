import { useState, useEffect } from "react";
import { supabaseClient } from "../utils/supabaseClient";

/**
 * Hook para obtener las pantallas de un approach específico
 * @param {string} approachId - UUID del approach
 * @returns {Object} { screens, isLoading, error }
 */
export const useApproachScreens = (approachId) => {
  const [screens, setScreens] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!approachId) {
      setScreens([]);
      return;
    }

    const fetchApproachScreens = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Consulta para obtener las pantallas del approach ordenadas por order_index
        const { data, error: supabaseError } = await supabaseClient
          .from("approach_screens")
          .select(
            `
            order_index,
            app_screens (
              screen_id,
              name
            )
          `
          )
          .eq("approach_id", approachId)
          .order("order_index", { ascending: true });

        if (supabaseError) {
          throw supabaseError;
        }

        // Transformar los datos para obtener solo la información de pantallas
        const screensData =
          data?.map((item) => ({
            screen_id: item.app_screens.screen_id,
            name: item.app_screens.name,
            order_index: item.order_index,
          })) || [];

        setScreens(screensData);
      } catch (err) {
        console.error("Error fetching approach screens:", err);
        setError(err.message || "Failed to fetch approach screens");

        // Fallback con datos mock si hay error de conexión
        console.log("Using mock data for approach screens");
        setScreens([
          {
            screen_id: "login_generic_logo",
            name: "Login - Solo Logo",
            order_index: 1,
          },
          {
            screen_id: "home_dashboard",
            name: "Home Dashboard",
            order_index: 2,
          },
          {
            screen_id: "profile_settings",
            name: "Profile Settings",
            order_index: 3,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApproachScreens();
  }, [approachId]);

  return { screens, isLoading, error };
};
