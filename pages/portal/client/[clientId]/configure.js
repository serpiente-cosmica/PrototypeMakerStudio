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
  } = useScreenConfig(
    clientId,
    currentScreen?.screen_id,
    config,
    cachedConfig,
    refetchConfig
  );

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
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Client Not Found
          </h1>
          <p className="text-gray-600 mb-2">
            The client <span className="font-mono bg-gray-200 px-2 py-1 rounded text-sm">{clientId}</span> does not exist in the database.
          </p>
          <p className="text-gray-500 text-sm mb-6">
            Please create this client first or select an existing client from the portal.
          </p>
          <button
            onClick={() => router.push("/portal")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-lg hover:shadow-xl"
          >
            ← Back to Portal
          </button>
        </div>
      </div>
    );
  }

  if (screensError || (!screensLoading && screens.length === 0)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            No Screens Found
          </h1>
          <p className="text-gray-600 mb-2">
            The approach for client <span className="font-mono bg-gray-200 px-2 py-1 rounded text-sm">{clientId}</span> has no screens configured.
          </p>
          {screensError && (
            <p className="text-red-600 text-sm mb-4">
              Error: {screensError}
            </p>
          )}
          <p className="text-gray-500 text-sm mb-6">
            Please run the database setup SQL to add screens to this approach.
          </p>
          <button
            onClick={() => router.push("/portal")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-lg hover:shadow-xl"
          >
            ← Back to Portal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header - Fixed with Gradient */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-30 backdrop-blur-sm bg-opacity-95">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent flex items-center gap-2">
                  Configure Prototype:{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {config.app_name}
                  </span>
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Client ID:
                    </span>
                    <span className="font-mono bg-gradient-to-r from-blue-100 to-indigo-100 px-3 py-1 rounded-lg text-blue-700 font-semibold border border-blue-200">
                      {config.client_id}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => router.push("/portal")}
              className="group px-5 py-2.5 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center gap-2 border border-gray-300"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Portal
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Content - Screen Preview & Configuration */}
          <>
            {/* Screen Preview - Fixed on screen */}
            <div className="lg:fixed lg:top-24 lg:h-[calc(100vh-7rem)] lg:overflow-auto" style={{ left: "max(1rem, calc((100vw - 1280px) / 2 + 1rem))", width: "calc(min(1280px, 100vw - 2rem) / 2 - 1.5rem)" }}>
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200 hover:shadow-3xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg shadow-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    Live Preview
                  </h2>
                  <div className="text-xs font-semibold text-indigo-700 bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1.5 rounded-full border border-indigo-200 shadow-sm">
                    {currentScreen ? currentScreen.name : "Loading..."}
                  </div>
                </div>

                {/* Mobile Preview Container - iPhone 14/15/16 Pro Max */}
                <div className="bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-3xl p-8 flex justify-center shadow-2xl">
                  <div
                    className="bg-white shadow-2xl overflow-hidden relative ring-4 ring-gray-700/50"
                    style={{
                      width: "430px",
                      height: "932px",
                      border: "12px solid #1f2937",
                      borderRadius: "60px",
                    }}
                  >
                    {currentScreen ? (
                      <div className="w-full h-full overflow-y-auto">
                        <ScreenPreview
                          clientId={clientId}
                          screenId={currentScreen.screen_id}
                          screenSettings={screenConfig}
                        />
                      </div>
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

                {/* Navigation Controls - Enhanced Carousel */}
                <div className="mt-4 flex justify-center items-center space-x-6 border-t pt-4 bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-b-xl -mx-6 px-6 -mb-6 pb-6">
                  <button
                    onClick={handlePreviousScreen}
                    disabled={currentScreenIndex === 0}
                    className={`group px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                      currentScreenIndex === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                        : "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 shadow-lg hover:shadow-xl border border-gray-600 hover:scale-105"
                    }`}
                  >
                    <svg className={`w-4 h-4 ${currentScreenIndex !== 0 ? 'group-hover:-translate-x-1' : ''} transition-transform`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Previous
                  </button>

                  <div className="flex flex-col items-center space-y-2 bg-white px-4 py-2 rounded-xl shadow-md border border-gray-200">
                    <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {currentScreenIndex + 1} / {screens.length}
                    </span>
                    <span className="text-xs font-semibold text-gray-600">
                      {currentScreen?.app_screens?.name || currentScreen?.screen_id || "..."}
                    </span>
                    <div className="flex space-x-2">
                      {screens.map((_, index) => (
                        <div
                          key={index}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            index === currentScreenIndex
                              ? "bg-gradient-to-r from-blue-500 to-indigo-600 w-8 shadow-md"
                              : "bg-gray-300 w-2 hover:bg-gray-400 cursor-pointer"
                          }`}
                          onClick={() => setCurrentScreenIndex(index)}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleNextScreen}
                    disabled={currentScreenIndex === screens.length - 1}
                    className={`group px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                      currentScreenIndex === screens.length - 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl border border-blue-600 hover:scale-105"
                    }`}
                  >
                    Next
                    <svg className={`w-4 h-4 ${currentScreenIndex !== screens.length - 1 ? 'group-hover:translate-x-1' : ''} transition-transform`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Spacer for fixed preview on large screens */}
            <div className="hidden lg:block"></div>

            {/* Configuration Panel - Scrollable with Enhanced UI */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 hover:shadow-3xl transition-shadow duration-300 overflow-hidden">
              <div className="sticky top-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-6 pb-5 border-b border-indigo-200 z-10">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-3">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <div>Screen Configuration</div>
                    <p className="text-sm font-semibold text-indigo-600 mt-1">
                      {currentScreen ? currentScreen.name : "Loading..."}
                    </p>
                  </div>
                </h3>
              </div>

              <div className="p-6 overflow-y-auto" style={{ maxHeight: "calc(100vh - 240px)" }}>
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
