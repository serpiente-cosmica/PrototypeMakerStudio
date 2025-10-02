const { createClient } = require("@supabase/supabase-js");

// Configuración de Supabase (usa las variables de entorno)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Faltan las variables de entorno de Supabase");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedData() {
  try {
    console.log("🌱 Iniciando inserción de datos de prueba...");

    // 1. Insertar pantallas en app_screens
    console.log("📱 Insertando pantallas...");
    const { data: screensData, error: screensError } = await supabase
      .from("app_screens")
      .upsert(
        [
          {
            screen_id: "login_generic_logo",
            name: "Login - Solo Logo",
          },
          {
            screen_id: "home_dashboard",
            name: "Home Dashboard",
          },
          {
            screen_id: "profile_settings",
            name: "Profile Settings",
          },
        ],
        { onConflict: "screen_id" }
      );

    if (screensError) {
      console.error("❌ Error insertando pantallas:", screensError);
    } else {
      console.log("✅ Pantallas insertadas correctamente");
    }

    // 2. Insertar approach en app_approaches
    console.log("🎯 Insertando approach...");
    const { data: approachData, error: approachError } = await supabase
      .from("app_approaches")
      .upsert(
        [
          {
            approach_id: "550e8400-e29b-41d4-a716-446655440001",
            name: "ActiveFit+",
            description: "Base configuration with dynamic white label settings",
            screen_list_json: [
              {
                id: "login_generic_logo",
                name: "Login - Solo Logo",
                order: 1,
              },
              {
                id: "home_dashboard",
                name: "Home Dashboard",
                order: 2,
              },
              {
                id: "profile_settings",
                name: "Profile Settings",
                order: 3,
              },
            ],
          },
        ],
        { onConflict: "approach_id" }
      );

    if (approachError) {
      console.error("❌ Error insertando approach:", approachError);
    } else {
      console.log("✅ Approach insertado correctamente");
    }

    // 3. Insertar relación approach_screens
    console.log("🔗 Insertando relaciones approach_screens...");
    const { data: relationData, error: relationError } = await supabase
      .from("approach_screens")
      .upsert(
        [
          {
            approach_id: "550e8400-e29b-41d4-a716-446655440001",
            screen_id: "login_generic_logo",
            order_index: 1,
          },
          {
            approach_id: "550e8400-e29b-41d4-a716-446655440001",
            screen_id: "home_dashboard",
            order_index: 2,
          },
          {
            approach_id: "550e8400-e29b-41d4-a716-446655440001",
            screen_id: "profile_settings",
            order_index: 3,
          },
        ],
        { onConflict: "approach_id,screen_id" }
      );

    if (relationError) {
      console.error("❌ Error insertando relaciones:", relationError);
    } else {
      console.log("✅ Relaciones insertadas correctamente");
    }

    // 4. Insertar cliente de prueba
    console.log("👤 Insertando cliente de prueba...");
    const { data: clientData, error: clientError } = await supabase
      .from("client_configs")
      .upsert(
        [
          {
            client_id: "activefit-demo-1234567890",
            approach_id: "550e8400-e29b-41d4-a716-446655440001",
            app_name: "ActiveFit+ Demo",
            colors_json: {
              primary: "#10b981",
              secondary: "#6b7280",
              accent: "#f59e0b",
              background: "#ffffff",
            },
            logo_url:
              "https://via.placeholder.com/150x150/10b981/ffffff?text=AF+",
          },
        ],
        { onConflict: "client_id" }
      );

    if (clientError) {
      console.error("❌ Error insertando cliente:", clientError);
    } else {
      console.log("✅ Cliente insertado correctamente");
    }

    console.log("🎉 ¡Datos de prueba insertados correctamente!");
    console.log("📋 Resumen:");
    console.log("   - 3 pantallas creadas");
    console.log("   - 1 approach creado (ActiveFit+)");
    console.log("   - 3 relaciones approach_screens");
    console.log("   - 1 cliente de prueba (activefit-demo-1234567890)");
  } catch (error) {
    console.error("❌ Error general:", error);
  }
}

// Ejecutar el script
seedData();
