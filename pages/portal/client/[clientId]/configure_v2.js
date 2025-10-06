import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useAppConfig } from "../../../../hooks/useAppConfig";
import { useApproachScreens } from "../../../../hooks/useApproachScreens";
import ScreenPreview from "../../../../components/ScreenPreview";

/**
 * Client Configuration Page
 * Permite configurar las pantallas específicas del cliente
 * Route: /portal/client/[clientId]/configure
 */
const ClientConfigurationPage = () => {
  const router = useRouter();
  const { clientId } = router.query;
  const { config, isLoading: configLoading } = useAppConfig(clientId);
  const { screens, isLoading: screensLoading } = useApproachScreens(
    config?.approach_id
  );

  const [selectedScreen, setSelectedScreen] = useState(null);
  const [screenSettings, setScreenSettings] = useState({});
  const configLoadedRef = useRef(false);

  useEffect(() => {
    if (screens.length > 0 && !selectedScreen) {
      setSelectedScreen(screens[0]);
    }
  }, [screens, selectedScreen]);

  // Precargar configuración del cliente UNA SOLA VEZ
  useEffect(() => {
    if (config && !configLoadedRef.current) {
      console.log("🎨 Loading config:", config);
      console.log("🎨 Colors JSON:", config.colors_json);
      console.log("🎨 Background color:", config.colors_json?.background);

      setScreenSettings({
        logo_url: config.logo_url || "",
        background_color: config.colors_json?.background || "#ffffff",
      });
      configLoadedRef.current = true;
    }
  }, [config]);

  const handleSaveSettings = () => {
    console.log(
      "Saving settings for screen:",
      selectedScreen.screen_id,
      screenSettings
    );
    alert("Settings saved! (This will be implemented with the API)");
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
          {selectedScreen ? (
            <>
              {/* Screen Preview */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Preview: {selectedScreen.name}
                  </h2>
                  <div className="text-sm text-gray-500">
                    Screen ID: {selectedScreen.screen_id}
                  </div>
                </div>

                {/* Mobile Preview Container */}
                <div className="bg-gray-100 rounded-lg p-4 flex justify-center">
                  <div
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                    style={{
                      width: "350px",
                      height: "700px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <ScreenPreview
                      clientId={clientId}
                      screenId={selectedScreen.screen_id}
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

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() =>
                        setScreenSettings({
                          logo_url: config.logo_url || "",
                          background_color:
                            config.colors_json?.background || "#ffffff",
                        })
                      }
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Reset
                    </button>
                    <button
                      onClick={handleSaveSettings}
                      className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-600">
                No screens configured for this approach or client.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientConfigurationPage;
