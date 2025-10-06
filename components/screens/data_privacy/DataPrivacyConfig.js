/**
 * DataPrivacyConfig - Configuración específica para DataPrivacyScreen
 * Maneja todas las propiedades específicas de esta pantalla
 */
import React, { useState, useEffect } from "react";

const DataPrivacyConfig = ({
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

  const handleReset = () => {
    onReset();
  };

  return (
    <div className="space-y-4">
      {/* Configuración de texto */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          value={localConfig.title || "Data Privacy"}
          onChange={(e) => handleFieldChange("title", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Data Privacy"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Intro Text
        </label>
        <textarea
          value={
            localConfig.intro_text ||
            'At Advanta Health, we treat any data that relates to an identified or identifiable individual as "personal data," and only use it within our services.'
          }
          onChange={(e) => handleFieldChange("intro_text", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
          placeholder="Introductory text about data privacy"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Data Section Title
        </label>
        <input
          type="text"
          value={localConfig.data_section_title || "Data we capture:"}
          onChange={(e) =>
            handleFieldChange("data_section_title", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Data we capture:"
        />
      </div>

      {/* Configuración de elementos de datos */}
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <h4 className="text-sm font-medium text-gray-800 mb-3">
          📊 Data Items Configuration
        </h4>

        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Steps Text
            </label>
            <input
              type="text"
              value={localConfig.steps_text || "Steps"}
              onChange={(e) => handleFieldChange("steps_text", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Calories Text
            </label>
            <input
              type="text"
              value={localConfig.calories_text || "Calories"}
              onChange={(e) =>
                handleFieldChange("calories_text", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Active Minutes Text
            </label>
            <input
              type="text"
              value={localConfig.active_minutes_text || "Active Minutes"}
              onChange={(e) =>
                handleFieldChange("active_minutes_text", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Distance Text
            </label>
            <input
              type="text"
              value={localConfig.distance_text || "Distance"}
              onChange={(e) =>
                handleFieldChange("distance_text", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Location Text
            </label>
            <input
              type="text"
              value={localConfig.location_text || "Location"}
              onChange={(e) =>
                handleFieldChange("location_text", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Workout Photos Text
            </label>
            <input
              type="text"
              value={
                localConfig.workout_photos_text ||
                "Workout Photos with Location"
              }
              onChange={(e) =>
                handleFieldChange("workout_photos_text", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Training Text
            </label>
            <input
              type="text"
              value={localConfig.training_text || "Training and Exercises"}
              onChange={(e) =>
                handleFieldChange("training_text", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Events Text
            </label>
            <input
              type="text"
              value={localConfig.events_text || "Events from Partner Solutions"}
              onChange={(e) => handleFieldChange("events_text", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Device Metadata Text
            </label>
            <input
              type="text"
              value={localConfig.device_metadata_text || "Device Metadata"}
              onChange={(e) =>
                handleFieldChange("device_metadata_text", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Configuración de texto legal */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-3">
          ⚖️ Legal Text Configuration
        </h4>

        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Legal Text Prefix
            </label>
            <input
              type="text"
              value={
                localConfig.legal_text_prefix ||
                "By continuing, you agree to the"
              }
              onChange={(e) =>
                handleFieldChange("legal_text_prefix", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              EULA Text
            </label>
            <input
              type="text"
              value={localConfig.eula_text || "EULA"}
              onChange={(e) => handleFieldChange("eula_text", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Legal Text Middle
            </label>
            <input
              type="text"
              value={localConfig.legal_text_middle || ". Note: Advanta"}
              onChange={(e) =>
                handleFieldChange("legal_text_middle", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Privacy Policy Text
            </label>
            <input
              type="text"
              value={localConfig.privacy_policy_text || "Privacy Policy"}
              onChange={(e) =>
                handleFieldChange("privacy_policy_text", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Legal Text Suffix
            </label>
            <input
              type="text"
              value={
                localConfig.legal_text_suffix ||
                "describes how data is handled in this service."
              }
              onChange={(e) =>
                handleFieldChange("legal_text_suffix", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Configuración del botón */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Accept Button Text
        </label>
        <input
          type="text"
          value={localConfig.accept_button_text || "Accept & Continue"}
          onChange={(e) =>
            handleFieldChange("accept_button_text", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Accept & Continue"
        />
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

      {/* Configuración de navegación */}
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <h4 className="text-sm font-medium text-gray-800 mb-3">
          🧭 Navigation Configuration
        </h4>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <label className="w-24 text-sm text-gray-700">
              Accept Button →
            </label>
            <select
              value={
                localConfig.navigation_config?.accept_button
                  ?.target_screen_id || ""
              }
              onChange={(e) =>
                handleNavigationChange("accept_button", e.target.value)
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
            <label className="w-24 text-sm text-gray-700">EULA Link →</label>
            <select
              value={
                localConfig.navigation_config?.eula_link?.target_screen_id || ""
              }
              onChange={(e) =>
                handleNavigationChange("eula_link", e.target.value)
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
              Privacy Policy →{" "}
            </label>
            <select
              value={
                localConfig.navigation_config?.privacy_policy_link
                  ?.target_screen_id || ""
              }
              onChange={(e) =>
                handleNavigationChange("privacy_policy_link", e.target.value)
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

export default DataPrivacyConfig;
