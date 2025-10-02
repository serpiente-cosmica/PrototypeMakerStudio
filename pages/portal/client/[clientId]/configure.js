import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useAppConfig } from "../../../../hooks/useAppConfig";
import { useApproachScreens } from "../../../../hooks/useApproachScreens";
import { useFileUpload } from "../../../../hooks/useFileUpload";
import { useUpdateClientConfig } from "../../../../hooks/useUpdateClientConfig";
import { useScreenConfig } from "../../../../hooks/useScreenConfig";
import DynamicScreenConfig from "../../../../components/DynamicScreenConfig";
import { useScreenNavigation } from "../../../../hooks/useScreenNavigation";
import { useModal } from "../../../../hooks/useModal";
import ScreenPreview from "../../../../components/ScreenPreview";
import Modal from "../../../../components/common/Modal";

// Importar todas las pantallas para que se registren
import "../../../../components/screens";

/**
 * Client Configuration Page
 * Permite configurar las pantallas específicas del cliente
 * Route: /portal/client/[clientId]/configure
 */
const ClientConfigurationPage = () => {
  const router = useRouter();
  const { clientId } = router.query;
  const {
    config,
    isLoading: configLoading,
    refetch: refetchConfig,
  } = useAppConfig(clientId);
  const {
    screens,
    isLoading: screensLoading,
    error: screensError,
  } = useApproachScreens(config?.approach_id);
  const { uploadFile, isLoading: uploadLoading } = useFileUpload();

  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const configLoadedRef = useRef(false);
  const [screenConfigsCache, setScreenConfigsCache] = useState({});

  // Hook para configuración específica por pantalla
  const currentScreen = screens[currentScreenIndex];
  const cachedConfig = screenConfigsCache[currentScreen?.screen_id];

  // Debug logs
  console.log("configure.js: config:", config);
  console.log("configure.js: screens:", screens);
  console.log("configure.js: currentScreen:", currentScreen);
  console.log("configure.js: currentScreenIndex:", currentScreenIndex);
  const {
    screenConfig,
    isLoading: screenConfigLoading,
    error: screenConfigError,
    saveScreenConfig,
    updateScreenConfig,
    resetToDefault,
  } = useScreenConfig(clientId, currentScreen?.screen_id, config, cachedConfig);

  // Funciones de navegación tipo carrusel con guardado automático
  const handleNextScreen = async () => {
    if (currentScreenIndex < screens.length - 1) {
      // Guardar configuración actual antes de cambiar
      await saveCurrentScreenConfig();
      setCurrentScreenIndex(currentScreenIndex + 1);
    }
  };

  const handlePreviousScreen = async () => {
    if (currentScreenIndex > 0) {
      // Guardar configuración actual antes de cambiar
      await saveCurrentScreenConfig();
      setCurrentScreenIndex(currentScreenIndex - 1);
    }
  };

  // Función para guardar configuración actual automáticamente
  const saveCurrentScreenConfig = async () => {
    if (!currentScreen?.screen_id || !screenConfig) return;

    try {
      // Si hay un archivo temporal, subirlo primero
      if (screenConfig.logo_url && screenConfig.logo_url.startsWith("blob:")) {
        const response = await fetch(screenConfig.logo_url);
        const blob = await response.blob();
        const file = new File([blob], "logo.png", { type: blob.type });
        const uploadedUrl = await uploadFile(file, clientId);

        // Actualizar configuración con URL real
        const updatedConfig = { ...screenConfig, logo_url: uploadedUrl };
        await saveScreenConfig(updatedConfig, false); // No mostrar mensaje de éxito
      } else {
        await saveScreenConfig(screenConfig, false); // No mostrar mensaje de éxito
      }
    } catch (error) {
      console.error("Error auto-saving screen config:", error);
      // No mostrar error al usuario, solo log
    }
  };

  const handleConfigChange = (newConfig) => {
    updateScreenConfig(newConfig);
    // Guardar en cache local
    if (currentScreen?.screen_id) {
      setScreenConfigsCache((prev) => ({
        ...prev,
        [currentScreen.screen_id]: newConfig,
      }));
    }
  };

  const handleSaveScreenConfig = async (newConfig) => {
    try {
      // Si hay un archivo temporal, subirlo primero
      if (newConfig.logo_url && newConfig.logo_url.startsWith("blob:")) {
        // Convertir blob URL a archivo y subirlo
        const response = await fetch(newConfig.logo_url);
        const blob = await response.blob();
        const file = new File([blob], "logo.png", { type: blob.type });

        const uploadedUrl = await uploadFile(file, clientId);
        newConfig.logo_url = uploadedUrl;
      }

      const success = await saveScreenConfig(newConfig);
      if (success) {
        showSuccess("Screen configuration saved successfully!");
        // Refrescar la configuración para mantener los cambios
        await refetchConfig();
      } else {
        showError("Error saving screen configuration. Please try again.");
      }
    } catch (error) {
      console.error("Error saving screen config:", error);
      showError("Error saving screen configuration. Please try again.");
    }
  };

  const {
    updateClientConfig,
    isLoading: updateLoading,
    error: updateError,
  } = useUpdateClientConfig();

  const {
    isOpen: isModalOpen,
    modalProps,
    hideModal,
    showSuccess,
    showError,
    showWarning,
  } = useModal();

  useEffect(() => {
    if (screens.length > 0 && currentScreenIndex >= screens.length) {
      setCurrentScreenIndex(0); // Reset if current index is out of bounds
    }
  }, [screens, currentScreenIndex]);

  if (configLoading || screensLoading) {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Configure Client: {config.app_name}
              </h1>
              <p className="text-gray-600">Client ID: {config.client_id}</p>
            </div>
            <button
              onClick={() => router.push("/portal")}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              ← Back to Portal
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Content - Screen Preview & Configuration */}
          <>
            {/* Screen Preview */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Preview: {currentScreen ? currentScreen.name : "Loading..."}
                </h2>
                <div className="text-sm text-gray-500">
                  Screen ID: {currentScreen ? currentScreen.screen_id : "N/A"}
                </div>
              </div>

              {/* Mobile Preview Container */}
              <div className="bg-gray-100 rounded-lg p-4 flex justify-center">
                <div className="w-80 h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
                  {currentScreen ? (
                    <ScreenPreview
                      clientId={clientId}
                      screenId={currentScreen.screen_id}
                      screenSettings={screenConfig}
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center bg-gray-100">
                      <div className="text-center text-gray-600">
                        <p>Loading screens...</p>
                        {screensLoading && (
                          <p className="text-sm">Fetching from database...</p>
                        )}
                        {screensError && (
                          <p className="text-sm text-red-600">
                            Error: {screensError}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation Controls - Carrusel */}
              <div className="mt-4 flex justify-center items-center space-x-4">
                <button
                  onClick={handlePreviousScreen}
                  disabled={currentScreenIndex === 0}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    currentScreenIndex === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gray-600 text-white hover:bg-gray-700"
                  }`}
                >
                  ← Back
                </button>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {currentScreenIndex + 1} of {screens.length}
                  </span>
                  <div className="flex space-x-1">
                    {screens.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentScreenIndex
                            ? "bg-blue-600"
                            : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleNextScreen}
                  disabled={currentScreenIndex === screens.length - 1}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    currentScreenIndex === screens.length - 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Configuration Panel */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Screen Configuration:{" "}
                {currentScreen ? currentScreen.name : "Loading..."}
              </h3>

              {screenConfigError && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                  <p className="text-red-600 text-sm">{screenConfigError}</p>
                </div>
              )}

              <DynamicScreenConfig
                screenId={currentScreen?.screen_id}
                screenConfig={screenConfig}
                onConfigChange={handleConfigChange}
                onSave={handleSaveScreenConfig}
                onReset={resetToDefault}
                isLoading={screenConfigLoading}
                clientId={clientId}
                approachId={config?.approach_id}
              />
            </div>
          </>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} {...modalProps} />
    </div>
  );
};

export default ClientConfigurationPage;
