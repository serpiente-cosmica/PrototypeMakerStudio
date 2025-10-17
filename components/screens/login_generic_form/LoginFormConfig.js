/**
 * LoginFormConfig - Configuración específica para LoginFormScreen
 * Maneja todas las propiedades específicas de esta pantalla
 */
import React, { useState, useEffect } from "react";
import { useFileUpload } from "../../../hooks/useFileUpload";

const LoginFormConfig = ({
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
    // Llamar inmediatamente para preview en tiempo real
    onConfigChange(newConfig);
  };

  const handleFileChange = async (e, field) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadedUrl = await uploadFile(file, clientId);
        handleFieldChange(field, uploadedUrl);
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
    onConfigChange(newConfig);
  };

  return (
    <div className="space-y-4">
      {/* Imagen para pantalla 2 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Top Image
        </label>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Upload Image File
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "app_logo_url")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {uploadLoading && (
              <p className="text-xs text-blue-600 mt-1">Uploading...</p>
            )}
          </div>
          <div className="text-center text-gray-500 text-sm">OR</div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={localConfig.app_logo_url || ""}
              onChange={(e) =>
                handleFieldChange("app_logo_url", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.png"
            />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Image that appears at the top of the login form
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Placeholder
        </label>
        <input
          type="text"
          value={localConfig.email_placeholder || ""}
          onChange={(e) =>
            handleFieldChange("email_placeholder", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="dmorales@advantahealth.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password Placeholder
        </label>
        <input
          type="text"
          value={localConfig.password_placeholder || "**********"}
          onChange={(e) =>
            handleFieldChange("password_placeholder", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="**********"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Login Button Text
        </label>
        <input
          type="text"
          value={localConfig.login_button_text || "Log In"}
          onChange={(e) =>
            handleFieldChange("login_button_text", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Log In"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Button Color
        </label>
        <div className="flex items-center space-x-3">
          <input
            type="color"
            value={localConfig.button_color || "#017755"}
            onChange={(e) => handleFieldChange("button_color", e.target.value)}
            className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
          />
          <input
            type="text"
            value={localConfig.button_color || "#017755"}
            onChange={(e) => handleFieldChange("button_color", e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="#017755"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Button Border Radius
        </label>
        <input
          type="text"
          value={localConfig.button_radius || "12px"}
          onChange={(e) => handleFieldChange("button_radius", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="12px"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Forgot Password Text
        </label>
        <input
          type="text"
          value={localConfig.forgot_password_text || "Forgot Password?"}
          onChange={(e) =>
            handleFieldChange("forgot_password_text", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Forgot Password?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          New Account Text
        </label>
        <input
          type="text"
          value={
            localConfig.new_account_text ||
            "No account yet? Tap here to verify your eligibility."
          }
          onChange={(e) =>
            handleFieldChange("new_account_text", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="No account yet? Tap here to verify your eligibility."
        />
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

          <div className="flex items-center space-x-3">
            <label className="w-24 text-sm text-gray-700">Login Button →</label>
            <select
              value={
                localConfig.navigation_config?.login_button?.target_screen_id ||
                ""
              }
              onChange={(e) =>
                handleNavigationChange("login_button", e.target.value)
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

          <div className="flex items-center space-x-3">
            <label className="w-24 text-sm text-gray-700">
              Forgot Password →
            </label>
            <select
              value={
                localConfig.navigation_config?.forgot_password
                  ?.target_screen_id || ""
              }
              onChange={(e) =>
                handleNavigationChange("forgot_password", e.target.value)
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

          <div className="flex items-center space-x-3">
            <label className="w-24 text-sm text-gray-700">New Account →</label>
            <select
              value={
                localConfig.navigation_config?.new_account?.target_screen_id ||
                ""
              }
              onChange={(e) =>
                handleNavigationChange("new_account", e.target.value)
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

      {/* Información sobre configuración de colores */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
        <h4 className="text-sm font-medium text-blue-800 mb-2">
          ℹ️ Color Configuration
        </h4>
        <p className="text-xs text-blue-600">
          Colors are managed globally from the first screen
          (login_generic_logo). Changes made there will be applied to all
          screens including this one.
        </p>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-between items-center pt-4 border-t">
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 hover:text-gray-900 transition-colors font-medium shadow-sm border border-gray-300"
        >
          🔄 Reset to Default
        </button>
        <div className="text-xs text-gray-500 flex items-center bg-green-50 px-3 py-2 rounded-md border border-green-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1 text-green-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Auto-save enabled
        </div>
      </div>
    </div>
  );
};

export default LoginFormConfig;
