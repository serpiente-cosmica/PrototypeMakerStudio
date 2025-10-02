/**
 * Hook para obtener las pantallas disponibles de un approach
 */
import { useState, useEffect } from "react";
import { supabaseClient } from "../utils/supabaseClient";

export const useApproachScreens = (approachId) => {
  const [screens, setScreens] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!approachId) {
      console.log("useApproachScreens: No approachId provided");
      return;
    }

    console.log(
      "useApproachScreens: Fetching screens for approach:",
      approachId
    );

    const fetchApproachScreens = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabaseClient
          .from("approach_screens")
          .select(
            `
            screen_id,
            order_index,
            app_screens!inner(
              screen_id,
              name
            )
          `
          )
          .eq("approach_id", approachId)
          .order("order_index", { ascending: true });

        if (fetchError) {
          throw fetchError;
        }

        console.log("useApproachScreens: Fetched screens:", data);
        setScreens(data || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching approach screens:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApproachScreens();
  }, [approachId]);

  return { screens, isLoading, error };
};
