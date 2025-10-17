import { useAppConfig } from "../hooks/useAppConfig";
import { getScreenComponent } from "../utils/screenMapper";
import ScreenWrapper from "./common/ScreenWrapper";
import { inheritColors } from "../utils/colorInheritance";

/**
 * ScreenPreview Component
 * Renderiza una pantalla específica con la configuración del cliente
 * @param {Object} props
 * @param {string} props.clientId - ID del cliente
 * @param {string} props.screenId - ID de la pantalla a renderizar
 */
const ScreenPreview = ({
  clientId,
  screenId,
  screenSettings = {},
  onNavigate,
  availableScreens = [],
}) => {
  const { config, isLoading } = useAppConfig(clientId);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600">No configuration found</p>
        </div>
      </div>
    );
  }

  // Verificar si la pantalla está disponible usando el nuevo sistema
  const ScreenComponent = getScreenComponent(screenId);
  if (!ScreenComponent) {
    console.warn(`Screen ${screenId} not found in registry`);
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600 mb-2">Screen not implemented</p>
          <p className="text-gray-500 text-sm">Screen ID: {screenId}</p>
          <p className="text-gray-500 text-xs">
            Please check if the screen is properly registered.
          </p>
        </div>
      </div>
    );
  }

  // Apply color inheritance: global colors + screen-specific colors
  const mergedSettings = inheritColors(config.colors_json, screenSettings);

  return (
    <div className="h-full overflow-hidden">
      <ScreenWrapper
        screenId={screenId}
        screenSettings={mergedSettings}
        clientId={clientId}
        config={config}
        onNavigate={onNavigate}
        availableScreens={availableScreens}
      />
    </div>
  );
};

export default ScreenPreview;
