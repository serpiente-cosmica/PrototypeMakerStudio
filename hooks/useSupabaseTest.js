import { supabaseClient } from "../utils/supabaseClient";

/**
 * Hook de prueba para verificar conexión con Supabase Storage
 */
export const useSupabaseTest = () => {
  const testConnection = async () => {
    try {
      console.log("🔍 Testing Supabase connection...");

      // Test 1: Verificar configuración
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      console.log(
        "✅ Supabase URL:",
        supabaseUrl ? "Configurado" : "❌ No configurado"
      );
      console.log(
        "✅ Supabase Key:",
        supabaseKey ? "Configurado" : "❌ No configurado"
      );

      if (!supabaseUrl || !supabaseKey) {
        throw new Error("Supabase not configured");
      }

      // Test 2: Listar buckets
      const { data: buckets, error: bucketsError } =
        await supabaseClient.storage.listBuckets();

      if (bucketsError) {
        console.error("❌ Error listing buckets:", bucketsError);
        throw bucketsError;
      }

      console.log(
        "✅ Available buckets:",
        buckets.map((b) => b.name)
      );
      console.log("📋 Full bucket details:", buckets);

      // Mostrar todos los nombres de buckets disponibles
      if (buckets.length === 0) {
        console.warn(
          "⚠️ No buckets found! You may need to create a bucket first."
        );
        console.log("💡 Go to Supabase Dashboard > Storage > Create Bucket");
      } else {
        console.log("🎯 Available bucket names:");
        buckets.forEach((bucket, index) => {
          console.log(
            `  ${index + 1}. "${bucket.name}" (${
              bucket.public ? "Public" : "Private"
            })`
          );
        });
      }

      // Test 3: Verificar bucket ADVANTA-BUCKET
      const targetBucket = buckets.find((b) => b.name === "ADVANTA-BUCKET");

      if (!targetBucket) {
        console.warn(
          "⚠️ Bucket ADVANTA-BUCKET not found. Attempting to create it..."
        );

        try {
          const { data: newBucket, error: createError } =
            await supabaseClient.storage.createBucket("ADVANTA-BUCKET", {
              public: true,
              allowedMimeTypes: ["image/*"],
              fileSizeLimit: 5242880, // 5MB
            });

          if (createError) {
            console.error("❌ Error creating bucket:", createError);
            throw new Error(`Failed to create bucket: ${createError.message}`);
          }

          console.log(
            "✅ Bucket ADVANTA-BUCKET created successfully:",
            newBucket
          );
        } catch (createErr) {
          console.error("❌ Failed to create bucket:", createErr);
          throw new Error(
            `Bucket ADVANTA-BUCKET not found and could not be created: ${createErr.message}`
          );
        }
      }

      console.log("✅ Bucket ADVANTA-BUCKET found:", targetBucket);

      // Test 4: Listar contenido del bucket
      const { data: files, error: filesError } = await supabaseClient.storage
        .from("ADVANTA-BUCKET")
        .list("", { limit: 10 });

      if (filesError) {
        console.error("❌ Error listing files:", filesError);
        throw filesError;
      }

      console.log("✅ Files in ADVANTA-BUCKET:", files);

      return { success: true, buckets, files };
    } catch (error) {
      console.error("❌ Supabase test failed:", error);
      return { success: false, error: error.message };
    }
  };

  return { testConnection };
};
