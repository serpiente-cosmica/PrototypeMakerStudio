/**
 * ConfigWrapper - Componente wrapper para configuraciones de pantallas
 * Proporciona funcionalidad común y aislamiento para configuraciones
 */
import React from "react";
import { getScreenConfigComponent } from "../../utils/screenRegistry";

const ConfigWrapper = ({
  screenId,
  screenConfig,
  onConfigChange,
  onSave,
  onReset,
  isLoading = false,
  ...props
}) => {
  const ConfigComponent = getScreenConfigComponent(screenId);

  if (!ConfigComponent) {
    console.error(`Config component not found for screenId: ${screenId}`);
    return (
      <div className="text-center text-gray-500 py-4">
        <p>Configuration not available for screen: {screenId}</p>
        <p className="text-sm">
          Please check if the config component is properly registered.
        </p>
      </div>
    );
  }

  // Props comunes que todas las configuraciones reciben
  const commonProps = {
    screenId,
    screenConfig,
    onConfigChange,
    onSave,
    onReset,
    isLoading,
    ...props,
  };

  return (
    <div className="config-wrapper" data-screen-id={screenId}>
      <ConfigComponent {...commonProps} />
    </div>
  );
};

export default ConfigWrapper;
