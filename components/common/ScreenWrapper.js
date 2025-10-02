/**
 * ScreenWrapper - Componente wrapper para todas las pantallas
 * Proporciona funcionalidad común y aislamiento
 */
import React from "react";
import { getScreenComponent } from "../../utils/screenRegistry";

const ScreenWrapper = ({
  screenId,
  screenSettings = {},
  clientId,
  config,
  onNavigate,
  availableScreens = [],
  ...props
}) => {
  const ScreenComponent = getScreenComponent(screenId);

  if (!ScreenComponent) {
    console.error(`Screen component not found for screenId: ${screenId}`);
    return (
      <div className="h-full flex items-center justify-center bg-white">
        <div className="text-center text-gray-600">
          <p>Screen not found: {screenId}</p>
          <p className="text-sm">
            Please check if the screen is properly registered.
          </p>
        </div>
      </div>
    );
  }

  // Props comunes que todas las pantallas reciben
  const commonProps = {
    screenSettings,
    clientId,
    config,
    onNavigate,
    availableScreens,
    screenId, // ID de la pantalla actual
    ...props,
  };

  return (
    <div className="screen-wrapper h-full w-full" data-screen-id={screenId}>
      <ScreenComponent {...commonProps} />
    </div>
  );
};

export default ScreenWrapper;
