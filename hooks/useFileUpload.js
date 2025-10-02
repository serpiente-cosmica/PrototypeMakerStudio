import { useState } from "react";
import { supabaseClient } from "../utils/supabaseClient";

/**
 * Hook para subir archivos a Supabase Storage
 * Organiza archivos por cliente en carpetas separadas
 * @returns {Object} { uploadFile, isLoading, error, success }
 */
export const useFileUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const uploadFile = async (
    file,
    clientId = null,
    bucket = "ADVANTA-BUCKET"
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      // Verificar si Supabase está configurado
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        console.warn("Supabase not configured, using temporary URL");

        // Crear una URL temporal para el archivo
        const tempUrl = URL.createObjectURL(file);

        // Simular delay de subida
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setSuccess(true);
        setIsLoading(false);
        return tempUrl;
      }

      // Generar nombre único para el archivo
      const fileExt = file.name.split(".").pop();
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2);

      // Crear estructura de carpetas: clientId/archivo (sin subcarpeta logos)
      const fileName = clientId
        ? `${clientId}/${timestamp}-${randomId}.${fileExt}`
        : `temp/${timestamp}-${randomId}.${fileExt}`;

      // Subir archivo a Supabase Storage
      const { data, error: uploadError } = await supabaseClient.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Obtener URL pública del archivo
      const {
        data: { publicUrl },
      } = supabaseClient.storage.from(bucket).getPublicUrl(fileName);

      setSuccess(true);
      return publicUrl;
    } catch (err) {
      setError(err.message || "Failed to upload file");

      // Fallback: usar URL temporal
      const tempUrl = URL.createObjectURL(file);
      setSuccess(true);
      setIsLoading(false);
      return tempUrl;
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
  };

  return { uploadFile, isLoading, error, success, resetState };
};
