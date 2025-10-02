/**
 * LoginLogoConfig - Configuración específica para LoginLogoScreen
 * Maneja propiedades específicas de esta pantalla incluyendo el logo
 */
import React, { useState, useEffect } from "react";
import { useFileUpload } from "../../../hooks/useFileUpload";

const LoginLogoConfig = ({
  screenId,
  screenConfig,
  onConfigChange,
  onSave,
  onReset,
  isLoading = false,
  clientId,
  availableScreens = [],
}) => {
  const [localConfig, setLocalConfig] = useState(screenConfig);
  const { uploadFile, isLoading: uploadLoading } = useFileUpload();

  // Actualizar configuración local cuando cambie la prop
  useEffect(() => {
    setLocalConfig(screenConfig);
  }, [screenConfig]);

  const handleFieldChange = (field, value) => {
    const newConfig = { ...localConfig, [field]: value };
    setLocalConfig(newConfig);

    // Para login_generic_logo, solo llamar onConfigChange para campos específicos
    // que deben guardarse en client_configs (como logo_url)
    if (field === "logo_url") {
      onConfigChange(newConfig);
    } else {
      // Para otros campos (como navigation_config), solo actualizar localmente
      console.log(
        `ℹ️ login_generic_logo: Field ${field} updated locally only (not saved to DB)`
      );
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadedUrl = await uploadFile(file, clientId);
        handleFieldChange("logo_url", uploadedUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file. Please try again.");
      }
    }
  };

  const handleReset = () => {
    onReset();
  };

  const handleNavigationChange = (elementId, targetScreenId) => {
    const currentNavigation = localConfig.navigation_config || {};
    const newNavigation = {
      ...currentNavigation,
      [elementId]: {
        target_screen_id: targetScreenId || null,
        enabled: !!targetScreenId,
      },
    };

    // Si no hay target_screen_id, eliminar el elemento
    if (!targetScreenId) {
      delete newNavigation[elementId];
    }

    const newConfig = {
      ...localConfig,
      navigation_config: newNavigation,
    };

    setLocalConfig(newConfig);

    // Para login_generic_logo, llamar onConfigChange para guardar navigation_config
    console.log(
      "🔄 login_generic_logo: Navigation config will be saved to client_screen_configs"
    );
    onConfigChange(newConfig);
  };

  return (
    <div className="space-y-4">
      {/* Campo para cambiar el logo */}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {uploadLoading && (
              <p className="text-xs text-blue-600 mt-1">Uploading...</p>
            )}
          </div>
          <div className="text-center text-gray-500 text-sm">OR</div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Logo URL</label>
            <input
              type="url"
              value={localConfig.logo_url || ""}
              onChange={(e) => handleFieldChange("logo_url", e.target.value)}
              placeholder="https://example.com/logo.png"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Campos específicos de la pantalla */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Logo Size
        </label>
        <input
          type="text"
          value={localConfig.logo_size || "150px"}
          onChange={(e) => handleFieldChange("logo_size", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="150px"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Logo Position
        </label>
        <select
          value={localConfig.logo_position || "center"}
          onChange={(e) => handleFieldChange("logo_position", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="center">Center</option>
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
        </select>
      </div>

      {/* Configuración de navegación */}
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <h4 className="text-sm font-medium text-gray-800 mb-3">
          🧭 Navigation Configuration
        </h4>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <label className="w-24 text-sm text-gray-700">Logo →</label>
            <select
              value={
                localConfig.navigation_config?.logo_click?.target_screen_id ||
                ""
              }
              onChange={(e) =>
                handleNavigationChange("logo_click", e.target.value)
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="">No navigation</option>
              {availableScreens
                .filter((screen) => screen.screen_id !== screenId)
                .map((screen) => (
                  <option key={screen.screen_id} value={screen.screen_id}>
                    {screen.app_screens?.name || screen.screen_id}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Choose which elements should be clickable and where they should
          navigate. Leave empty for no navigation.
        </p>
      </div>

      {/* Información sobre configuración */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
        <h4 className="text-sm font-medium text-blue-800 mb-2">
          ℹ️ Screen Configuration
        </h4>
        <p className="text-xs text-blue-600">
          You can change the logo image, size, and position for this screen.
          Background color and brand colors are managed in the client's main
          configuration.
        </p>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          onClick={handleReset}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Reset
        </button>
        <div className="text-sm text-gray-500 flex items-center">
          💾 Changes are saved automatically when navigating
        </div>
      </div>
    </div>
  );
};

export default LoginLogoConfig;
