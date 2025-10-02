import { supabaseClient } from "./utils/supabaseClient";

/**
 * Script para diagnosticar problemas de conexión con Supabase
 * Ejecuta este script en la consola del navegador para diagnosticar problemas
 */
export const diagnoseSupabase = async () => {
  console.log("🔍 Diagnosing Supabase connection...");

  try {
    // 1. Verificar configuración básica
    console.log("📋 Environment variables:");
    console.log(
      "SUPABASE_URL:",
      process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing"
    );
    console.log(
      "SUPABASE_KEY:",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing"
    );

    // 2. Probar conexión básica
    console.log("\n🔌 Testing basic connection...");
    const { data: testData, error: testError } = await supabaseClient
      .from("app_approaches")
      .select("count")
      .limit(1);

    if (testError) {
      console.error("❌ Basic connection failed:", testError);
      return;
    }
    console.log("✅ Basic connection successful");

    // 3. Probar lectura de client_configs
    console.log("\n📖 Testing client_configs read...");
    const { data: clientData, error: clientError } = await supabaseClient
      .from("client_configs")
      .select("*")
      .limit(1);

    if (clientError) {
      console.error("❌ client_configs read failed:", clientError);
      console.log("💡 This might be the source of the 406 error");
    } else {
      console.log("✅ client_configs read successful");
    }

    // 4. Probar lectura de client_screen_configs
    console.log("\n📖 Testing client_screen_configs read...");
    const { data: screenData, error: screenError } = await supabaseClient
      .from("client_screen_configs")
      .select("*")
      .limit(1);

    if (screenError) {
      console.error("❌ client_screen_configs read failed:", screenError);
      console.log("💡 This might be the source of the 406 error");
    } else {
      console.log("✅ client_screen_configs read successful");
    }

    // 5. Probar inserción en client_screen_configs
    console.log("\n📝 Testing client_screen_configs insert...");
    const testSettings = {
      logo_url: "https://example.com/test.png",
      background_color: "#ffffff",
    };

    const { data: insertData, error: insertError } = await supabaseClient
      .from("client_screen_configs")
      .insert({
        client_id: "test-client",
        screen_id: "test-screen",
        settings_json: testSettings,
      })
      .select();

    if (insertError) {
      console.error("❌ client_screen_configs insert failed:", insertError);
      console.log("💡 This might be the source of the save error");
    } else {
      console.log("✅ client_screen_configs insert successful");

      // Limpiar el registro de prueba
      await supabaseClient
        .from("client_screen_configs")
        .delete()
        .eq("client_id", "test-client")
        .eq("screen_id", "test-screen");
      console.log("🧹 Test record cleaned up");
    }

    console.log("\n✅ Diagnosis complete!");
  } catch (error) {
    console.error("❌ Diagnosis failed:", error);
  }
};

// Función para ejecutar desde la consola del navegador
window.diagnoseSupabase = diagnoseSupabase;
