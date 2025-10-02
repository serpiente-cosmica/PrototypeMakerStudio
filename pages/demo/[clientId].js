import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppConfig } from "../../hooks/useAppConfig";
import { useApproachScreens } from "../../hooks/useApproachScreens";
import ScreenPreview from "../../components/ScreenPreview";

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

  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [screenSettings, setScreenSettings] = useState({});

  // Load initial screen settings from client config
  useEffect(() => {
    if (config) {
      setScreenSettings({
        logo_url: config.logoUrl || "",
        background_color: config.colors_json?.background || "#ffffff",
      });
    }
  }, [config]);

  // Set initial selected screen
  useEffect(() => {
    if (screens.length > 0 && currentScreenIndex >= screens.length) {
      setCurrentScreenIndex(0); // Reset if current index is out of bounds
    }
  }, [screens, currentScreenIndex]);

  const handleNextScreen = () => {
    setCurrentScreenIndex((prevIndex) => (prevIndex + 1) % screens.length);
  };

  const handlePreviousScreen = () => {
    setCurrentScreenIndex((prevIndex) =>
      prevIndex === 0 ? screens.length - 1 : prevIndex - 1
    );
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

  const currentScreen = screens[currentScreenIndex];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Marco de la aplicación móvil */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-80 h-[600px] bg-white rounded-lg shadow-lg overflow-hidden relative">
          {currentScreen ? (
            <ScreenPreview
              clientId={clientId}
              screenId={currentScreen.screen_id}
              screenSettings={screenSettings}
            />
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-100">
              <p className="text-gray-600">
                No screens available for this approach.
              </p>
            </div>
          )}

          {/* Controles de navegación */}
          {screens.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              <button
                onClick={handlePreviousScreen}
                className="p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {screens.map((_, index) => (
                <span
                  key={index}
                  className={`block w-2 h-2 rounded-full mx-1 ${
                    index === currentScreenIndex ? "bg-blue-600" : "bg-gray-300"
                  }`}
                ></span>
              ))}
              <button
                onClick={handleNextScreen}
                className="p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
