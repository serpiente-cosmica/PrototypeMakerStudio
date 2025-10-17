import { useState } from "react";
import { supabaseClient } from "../utils/supabaseClient";

/**
 * Hook para eliminar clientes de la base de datos
 * @returns {Object} { deleteClient, isDeleting, error }
 */
export const useDeleteClient = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const deleteClient = async (clientId) => {
    try {
      setIsDeleting(true);
      setError(null);

      console.log(`🗑️ Deleting client: ${clientId}`);

      // Delete client_screen_configs first (foreign key constraint)
      const { error: configError } = await supabaseClient
        .from("client_screen_configs")
        .delete()
        .eq("client_id", clientId);

      if (configError) {
        console.error("❌ Error deleting screen configs:", configError);
        throw new Error(`Failed to delete screen configs: ${configError.message}`);
      }

      // Delete client_configs
      const { error: clientError } = await supabaseClient
        .from("client_configs")
        .delete()
        .eq("client_id", clientId);

      if (clientError) {
        console.error("❌ Error deleting client:", clientError);
        throw new Error(`Failed to delete client: ${clientError.message}`);
      }

      console.log(`✅ Client ${clientId} deleted successfully`);
      return { success: true };
    } catch (err) {
      console.error("❌ Error in deleteClient:", err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteClient,
    isDeleting,
    error,
  };
};

