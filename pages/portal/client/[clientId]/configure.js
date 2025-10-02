import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useAppConfig } from "../../../../hooks/useAppConfig";
import { useApproachScreens } from "../../../../hooks/useApproachScreens";
import { useFileUpload } from "../../../../hooks/useFileUpload";
import { useUpdateClientConfig } from "../../../../hooks/useUpdateClientConfig";
import { useModal } from "../../../../hooks/useModal";
import ScreenPreview from "../../../../components/ScreenPreview";
import Modal from "../../../../components/common/Modal";

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
  const { screens, isLoading: screensLoading } = useApproachScreens(
    config?.approach_id
  );
  const { uploadFile, isLoading: uploadLoading } = useFileUpload();

  const [selectedScreen, setSelectedScreen] = useState(null);
  const [screenSettings, setScreenSettings] = useState({});
  const configLoadedRef = useRef(false);

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
    if (screens.length > 0 && !selectedScreen) {
      setSelectedScreen(screens[0]); // Seleccionar automáticamente la primera pantalla
    }
  }, [screens, selectedScreen]);

  // Cargar configuración del cliente cuando se carga
  useEffect(() => {
    if (config && !configLoadedRef.current) {
      setScreenSettings({
        logo_url: config.logoUrl || null,
        background_color: config.colors_json?.background || "#ffffff",
      });
      configLoadedRef.current = true;
    }
  }, [config]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadedUrl = await uploadFile(file, clientId);
        setScreenSettings((prev) => ({
          ...prev,
          logo_url: uploadedUrl,
        }));
        showSuccess("Logo uploaded successfully!");
      } catch (error) {
        console.error("Error uploading file:", error);
        showError("Error uploading file. Please try again.");
      }
    }
  };

  const handleSaveSettings = async () => {
    if (!selectedScreen) {
      showWarning("No screen selected");
      return;
    }

    try {
      console.log("💾 Saving settings:", screenSettings);

      // Actualizar la configuración del cliente en client_configs
      const updates = {
        logo_url: screenSettings.logo_url,
        colors_json: {
          ...config.colors_json, // Mantener otros colores existentes
          background: screenSettings.background_color,
        },
      };

      const success = await updateClientConfig(clientId, updates);

      if (success) {
        showSuccess("Settings saved successfully!");
        // Refrescar la configuración para que la demo la vea
        await refetchAppConfig();
      } else {
        showError("Error saving settings. Please try again.");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      showError("Error saving settings. Please try again.");
    }
  };

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
                  Preview: {selectedScreen ? selectedScreen.name : "Loading..."}
                </h2>
                <div className="text-sm text-gray-500">
                  Screen ID: {selectedScreen ? selectedScreen.screen_id : "N/A"}
                </div>
              </div>

              {/* Mobile Preview Container */}
              <div className="bg-gray-100 rounded-lg p-4 flex justify-center">
                <div className="w-80 h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
                  <ScreenPreview
                    clientId={clientId}
                    screenId={selectedScreen?.screen_id || "login_generic_logo"}
                    screenSettings={screenSettings}
                  />
                </div>
              </div>
            </div>

            {/* Configuration Panel */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Screen Configuration
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo
                  </label>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Upload Logo File
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={uploadLoading}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {uploadLoading && (
                        <p className="text-xs text-blue-600 mt-1">
                          Uploading...
                        </p>
                      )}
                    </div>
                    <div className="text-center text-gray-500 text-sm">OR</div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Logo URL
                      </label>
                      <input
                        type="url"
                        value={screenSettings.logo_url || ""}
                        onChange={(e) =>
                          setScreenSettings((prev) => ({
                            ...prev,
                            logo_url: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty to use the client's logo from creation
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={screenSettings.background_color || "#ffffff"}
                      onChange={(e) =>
                        setScreenSettings((prev) => ({
                          ...prev,
                          background_color: e.target.value,
                        }))
                      }
                      className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={screenSettings.background_color || "#ffffff"}
                        onChange={(e) =>
                          setScreenSettings((prev) => ({
                            ...prev,
                            background_color: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="#ffffff"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Current: {screenSettings.background_color || "#ffffff"}
                  </p>
                </div>

                {updateError && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3 mt-4">
                    <p className="text-red-600 text-sm">{updateError}</p>
                  </div>
                )}

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setScreenSettings({
                        logo_url: config.logo_url || "",
                        background_color:
                          config.colors_json?.background || "#ffffff",
                      });
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleSaveSettings}
                    disabled={updateLoading || uploadLoading}
                    className={`px-6 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                      updateLoading || uploadLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {updateLoading ? "Saving..." : "Save Settings"}
                  </button>
                </div>
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
