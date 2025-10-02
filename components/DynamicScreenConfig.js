import { useState, useEffect } from "react";
import { getScreenConfigComponent } from "../utils/screenRegistry";
import ConfigWrapper from "./common/ConfigWrapper";

/**
 * Componente para renderizar campos de configuración específicos por pantalla
 * Ahora usa el sistema de registro para obtener componentes de configuración
 * @param {Object} props
 * @param {string} props.screenId - ID de la pantalla
 * @param {Object} props.screenConfig - Configuración actual de la pantalla
 * @param {Function} props.onConfigChange - Callback cuando cambia la configuración
 * @param {Function} props.onSave - Callback para guardar
 * @param {Function} props.onReset - Callback para resetear
 * @param {boolean} props.isLoading - Estado de carga
 */
const DynamicScreenConfig = ({
  screenId,
  screenConfig,
  onConfigChange,
  onSave,
  onReset,
  isLoading = false,
  clientId,
}) => {
  // Verificar si existe un componente de configuración específico para esta pantalla
  const ConfigComponent = getScreenConfigComponent(screenId);

  if (ConfigComponent) {
    // Usar el componente de configuración específico de la pantalla
    return (
      <ConfigWrapper
        screenId={screenId}
        screenConfig={screenConfig}
        onConfigChange={onConfigChange}
        onSave={onSave}
        onReset={onReset}
        isLoading={isLoading}
        clientId={clientId}
      />
    );
  }

  // Fallback: mostrar mensaje si no hay componente de configuración
  return (
    <div className="text-center text-gray-500 py-4">
      <p>No configuration component available for screen: {screenId}</p>
      <p className="text-sm">
        Please check if the config component is properly registered.
      </p>
    </div>
  );
};

export default DynamicScreenConfig;
