import { useState } from "react";
import { supabaseClient } from "../utils/supabaseClient";
import { createDefaultScreenConfigs } from "../utils/defaultScreenConfigs";
import { DEFAULT_LOGO_URL } from "../utils/defaultLogo";
import { DEFAULT_BRAND_COLORS } from "../utils/defaultConfig";

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

      console.log("🔄 Creating client with data:", clientData);

      // 1. Crear el cliente en la base de datos
      // Establecer configuración por defecto si no se proporciona
      const defaultLogoUrl = DEFAULT_LOGO_URL;
      // Verificar si logo_url está vacío o es null/undefined
      const hasValidLogo = clientData.logo_url && clientData.logo_url.trim() !== "";
      const finalLogoUrl = hasValidLogo ? clientData.logo_url : defaultLogoUrl;
      const finalColors = clientData.colors_json || DEFAULT_BRAND_COLORS;

      console.log(`📷 Logo configuration:`, {
        provided: clientData.logo_url,
        default: defaultLogoUrl,
        final: finalLogoUrl,
        hasValidLogo: hasValidLogo,
      });

      console.log(`🎨 Colors configuration:`, {
        provided: clientData.colors_json,
        default: DEFAULT_BRAND_COLORS,
        final: finalColors,
      });

      const { data, error: supabaseError } = await supabaseClient
        .from("client_configs")
        .insert([
          {
            client_id: clientData.client_id,
            approach_id: clientData.approach_id,
            app_name: clientData.app_name,
            colors_json: finalColors,
            logo_url: finalLogoUrl, // Logo por defecto si no se proporciona
          },
        ])
        .select()
        .single();

      if (supabaseError) {
        throw supabaseError;
      }

      console.log("✅ Client created successfully:", data);

      // 2. Crear configuraciones por defecto para todas las pantallas del approach
      const configsCreated = await createDefaultScreenConfigs(
        clientData.client_id,
        clientData.approach_id,
        {
          logoUrl: finalLogoUrl, // Usar logo por defecto si no se proporciona
          colors_json: finalColors, // Usar colores por defecto si no se proporcionan
        }
      );

      if (!configsCreated) {
        console.warn(
          "⚠️ Failed to create default screen configs, but client was created"
        );
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
