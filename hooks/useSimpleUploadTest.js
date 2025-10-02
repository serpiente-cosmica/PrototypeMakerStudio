import { supabaseClient } from "../utils/supabaseClient";

/**
 * Hook simplificado para probar solo la subida de archivos
 */
export const useSimpleUploadTest = () => {
  const testUpload = async (file, clientId = "test-client") => {
    try {
      console.log("🔍 Testing simple file upload...");

      // Generar nombre único para el archivo
      const fileExt = file.name.split(".").pop();
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2);
      const fileName = `${clientId}/logos/${timestamp}-${randomId}.${fileExt}`;

      console.log(`📁 Uploading to: ADVANTA-BUCKET/${fileName}`);
      console.log("📄 File details:", {
        name: file.name,
        size: file.size,
        type: file.type,
      });

      // Intentar subir directamente sin listar buckets
      const { data, error } = await supabaseClient.storage
        .from("ADVANTA-BUCKET")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("❌ Upload error:", error);
        console.error("❌ Error details:", {
          message: error.message,
          statusCode: error.statusCode,
          error: error.error,
        });
        throw error;
      }

      console.log("✅ Upload successful:", data);

      // Obtener URL pública
      const {
        data: { publicUrl },
      } = supabaseClient.storage.from("ADVANTA-BUCKET").getPublicUrl(fileName);

      console.log("🔗 Public URL:", publicUrl);

      return { success: true, publicUrl, data };
    } catch (err) {
      console.error("❌ Upload test failed:", err);
      return { success: false, error: err.message };
    }
  };

  return { testUpload };
};
