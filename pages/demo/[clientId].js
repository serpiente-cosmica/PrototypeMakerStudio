import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppConfig } from "../../hooks/useAppConfig";
import { useApproachScreens } from "../../hooks/useApproachScreens";
import { useScreenConfig } from "../../hooks/useScreenConfig";
import ScreenPreview from "../../components/ScreenPreview";

// Importar todas las pantallas para que se registren
import "../../components/screens";

/**
 * Main demo page - shows client screens as a real mobile app
 * Route: /demo/[clientId]
 */
const DemoPage = () => {
  const router = useRouter();
  const { clientId } = router.query;
  const { config, isLoading: configLoading } = useAppConfig(clientId);
  const { screens, isLoading: screensLoading } = useApproachScreens(
    config?.approach_id
  );

  // Hook para navegación entre pantallas
  const availableScreenIds = screens.map((screen) => screen.screen_id);

  // Encontrar la pantalla con el order_index más bajo (primera pantalla)
  const firstScreenIndex =
    screens.length > 0
      ? screens.findIndex(
          (screen) =>
            screen.order_index ===
            Math.min(...screens.map((s) => s.order_index))
        )
      : 0;

  const [currentScreenIndex, setCurrentScreenIndex] =
    useState(firstScreenIndex);
  const currentScreen =
    screens.length > 0 ? screens[currentScreenIndex]?.screen_id : null;

  // Actualizar currentScreenIndex cuando cambien las pantallas
  useEffect(() => {
    if (screens.length > 0) {
      const newFirstScreenIndex = screens.findIndex(
        (screen) =>
          screen.order_index === Math.min(...screens.map((s) => s.order_index))
      );
      setCurrentScreenIndex(newFirstScreenIndex);
    }
  }, [screens]);

  // Hook para cargar configuración específica de la pantalla actual
  const { screenConfig: screenSettings, isLoading: screenConfigLoading } =
    useScreenConfig(clientId, currentScreen, config);

  // Función para navegar entre pantallas
  const handleNavigate = (targetScreenId) => {
    console.log("🎯 DEMO Navigation called with targetScreenId:", targetScreenId);
    console.log("📋 Available screens:", screens.map(s => s.screen_id));
    
    const targetIndex = screens.findIndex(
      (screen) => screen.screen_id === targetScreenId
    );
    
    if (targetIndex !== -1) {
      console.log("✅ Target screen found at index:", targetIndex);
      console.log("🔄 Navigating from screen", currentScreenIndex, "to screen", targetIndex);
      setCurrentScreenIndex(targetIndex);
    } else {
      console.error("❌ Target screen NOT found:", targetScreenId);
    }
  };

  if (configLoading || screensLoading || screenConfigLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Client Not Found
          </h1>
          <button
            onClick={() => router.push("/portal")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Portal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* iPhone 14/15/16 Pro Max Frame */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div
          className="bg-white shadow-2xl overflow-hidden relative"
          style={{
            width: "430px",
            height: "932px",
            border: "12px solid #1f2937",
            borderRadius: "60px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {currentScreen ? (
            <ScreenPreview
              clientId={clientId}
              screenId={currentScreen}
              screenSettings={screenSettings}
              onNavigate={handleNavigate}
              availableScreens={screens}
            />
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-100">
              <p className="text-gray-600">
                No screens available for this approach.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
