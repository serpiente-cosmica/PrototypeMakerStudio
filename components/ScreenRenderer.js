import { useScreenNavigation } from "../hooks/useScreenNavigation";

/**
 * ScreenRenderer Component
 * Renderiza la pantalla actual basada en la configuración del approach
 * @param {Object} props
 * @param {string} props.clientId - ID del cliente
 */
const ScreenRenderer = ({ clientId }) => {
  const {
    currentScreen,
    currentScreenComponent,
    isLoading,
    error,
    hasCurrentScreenComponent,
    screenExists,
  } = useScreenNavigation(clientId);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-red-600 mb-2">Error loading configuration</p>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!currentScreen) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-gray-600 mb-2">No screens configured</p>
          <p className="text-gray-500 text-sm">
            This approach has no screens defined
          </p>
        </div>
      </div>
    );
  }

  if (!screenExists) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-orange-600 mb-2">Screen not implemented</p>
          <p className="text-gray-600 text-sm">Screen ID: {currentScreen.id}</p>
          <p className="text-gray-500 text-xs mt-2">
            This screen component needs to be created
          </p>
        </div>
      </div>
    );
  }

  if (!hasCurrentScreenComponent) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-red-600 mb-2">Component not found</p>
          <p className="text-gray-600 text-sm">Screen ID: {currentScreen.id}</p>
        </div>
      </div>
    );
  }

  // Renderizar el componente de la pantalla actual
  const ScreenComponent = currentScreenComponent;
  return <ScreenComponent />;
};

export default ScreenRenderer;
