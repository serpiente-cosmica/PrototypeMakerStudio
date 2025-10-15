/**
 * DataPrivacyConfig - Configuration for Onboarding Screen
 * Allows customization of all onboarding elements
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

  useEffect(() => {
    setLocalConfig(screenConfig);
  }, [screenConfig]);

  const handleFieldChange = (field, value) => {
    const newConfig = { ...localConfig, [field]: value };
    setLocalConfig(newConfig);
    onConfigChange(newConfig);
  };

  const handleNavigationChange = (buttonId, targetScreenId) => {
    const currentNavigation = localConfig.navigation_config || {};
    const newNavigation = {
      ...currentNavigation,
      [buttonId]: {
        target_screen_id: targetScreenId || null,
        enabled: !!targetScreenId,
      },
    };

    if (!targetScreenId) {
      delete newNavigation[buttonId];
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
    <div className="space-y-6">
      {/* Top Bar Configuration */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-3">
          🎨 Top Bar
        </h4>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Top Bar Color
          </label>
          <input
            type="color"
            value={localConfig.top_bar_color || "#3B82F6"}
            onChange={(e) => handleFieldChange("top_bar_color", e.target.value)}
            className="w-full h-10 border border-gray-300 rounded cursor-pointer"
          />
        </div>
      </div>

      {/* Logo Configuration */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Logo URL (optional)
        </label>
        <input
          type="text"
          value={localConfig.logo_url || ""}
          onChange={(e) => handleFieldChange("logo_url", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://example.com/logo.png"
        />
        <p className="text-xs text-gray-500 mt-1">Leave empty to use client's default logo</p>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          📝 Main Content
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Title
            </label>
            <input
              type="text"
              value={localConfig.main_title || "Make the Most of Your Benefits"}
              onChange={(e) => handleFieldChange("main_title", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Main heading"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle / Description
            </label>
            <textarea
              value={localConfig.subtitle || ""}
              onChange={(e) => handleFieldChange("subtitle", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="2"
              placeholder="Subtitle or description text"
            />
          </div>
        </div>
      </div>

      {/* Section 1 */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-green-900 mb-3">
          ⭐ Section 1
        </h4>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Icon / Emoji
            </label>
            <input
              type="text"
              value={localConfig.section_1_icon || "⭐"}
              onChange={(e) => handleFieldChange("section_1_icon", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              placeholder="⭐"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={localConfig.section_1_title || ""}
              onChange={(e) => handleFieldChange("section_1_title", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              placeholder="Section title"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={localConfig.section_1_description || ""}
              onChange={(e) => handleFieldChange("section_1_description", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              rows="2"
              placeholder="Section description"
            />
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-purple-900 mb-3">
          📋 Section 2
        </h4>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Icon / Emoji
            </label>
            <input
              type="text"
              value={localConfig.section_2_icon || "📋"}
              onChange={(e) => handleFieldChange("section_2_icon", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              placeholder="📋"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={localConfig.section_2_title || ""}
              onChange={(e) => handleFieldChange("section_2_title", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              placeholder="Section title"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={localConfig.section_2_description || ""}
              onChange={(e) => handleFieldChange("section_2_description", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              rows="2"
              placeholder="Section description"
            />
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-orange-900 mb-3">
          🔔 Section 3
        </h4>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Icon / Emoji
            </label>
            <input
              type="text"
              value={localConfig.section_3_icon || "🔔"}
              onChange={(e) => handleFieldChange("section_3_icon", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              placeholder="🔔"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={localConfig.section_3_title || ""}
              onChange={(e) => handleFieldChange("section_3_title", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              placeholder="Section title"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={localConfig.section_3_description || ""}
              onChange={(e) => handleFieldChange("section_3_description", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              rows="2"
              placeholder="Section description"
            />
          </div>
        </div>
      </div>

      {/* Button Configuration */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-3">
          🔘 Buttons
        </h4>
        <div className="space-y-4">
          {/* Continue Button */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Continue Button
            </label>
            <input
              type="text"
              value={localConfig.continue_button_text || "Continue"}
              onChange={(e) => handleFieldChange("continue_button_text", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Button text"
            />
            <div className="flex gap-2">
              <input
                type="color"
                value={localConfig.continue_button_color || "#3B82F6"}
                onChange={(e) => handleFieldChange("continue_button_color", e.target.value)}
                className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <select
                value={localConfig.navigation_config?.continue_button?.target_screen_id || ""}
                onChange={(e) => handleNavigationChange("continue_button", e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">Select navigation target</option>
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

          {/* Close Button */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Close Button
            </label>
            <input
              type="text"
              value={localConfig.close_button_text || "Close"}
              onChange={(e) => handleFieldChange("close_button_text", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Button text"
            />
            <select
              value={localConfig.navigation_config?.close_button?.target_screen_id || ""}
              onChange={(e) => handleNavigationChange("close_button", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="">Select navigation target</option>
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
      </div>

      {/* Action Buttons */}
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

export default DataPrivacyConfig;
