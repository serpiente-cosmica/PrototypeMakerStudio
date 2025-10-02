import { useAppConfig } from "../hooks/useAppConfig";
import { getScreenComponent } from "../utils/screenMapper";

/**
 * ScreenPreview Component
 * Renderiza una pantalla específica con la configuración del cliente
 * @param {Object} props
 * @param {string} props.clientId - ID del cliente
 * @param {string} props.screenId - ID de la pantalla a renderizar
 */
const ScreenPreview = ({ clientId, screenId, screenSettings = {} }) => {
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

  const ScreenComponent = getScreenComponent(screenId);

  if (!ScreenComponent) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600 mb-2">Screen not implemented</p>
          <p className="text-gray-500 text-sm">Screen ID: {screenId}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white overflow-hidden">
      <ScreenComponent
        screenSettings={screenSettings}
        clientId={clientId}
        config={config}
      />
    </div>
  );
};

export default ScreenPreview;
