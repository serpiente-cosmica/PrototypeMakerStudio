/**
 * MenuDashboardConfig - Configuration for MenuDashboardScreen
 * Handles all configurable properties for the menu dashboard
 */
import React, { useState, useEffect } from "react";

const MenuDashboardConfig = ({
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

  const handleNavigationChange = (elementId, targetScreenId) => {
    const currentNavigation = localConfig.navigation_config || {};
    const newNavigation = {
      ...currentNavigation,
      [elementId]: {
        target_screen_id: targetScreenId || null,
        enabled: !!targetScreenId,
      },
    };

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

  const handleTileChange = (index, field, value) => {
    const tiles = [...(localConfig.tiles || [])];
    tiles[index] = { ...tiles[index], [field]: value };
    handleFieldChange("tiles", tiles);
  };

  const addTile = () => {
    const tiles = [
      ...(localConfig.tiles || []),
      {
        id: `tile_${Date.now()}`,
        icon: "⭐",
        label: "New Tile",
      },
    ];
    handleFieldChange("tiles", tiles);
  };

  const removeTile = (index) => {
    const tiles = [...(localConfig.tiles || [])];
    tiles.splice(index, 1);
    handleFieldChange("tiles", tiles);
  };

  const handleBottomBarItemChange = (index, field, value) => {
    const items = [...(localConfig.bottom_bar_items || [])];
    items[index] = { ...items[index], [field]: value };
    handleFieldChange("bottom_bar_items", items);
  };

  const addBottomBarItem = () => {
    const items = [
      ...(localConfig.bottom_bar_items || []),
      {
        id: `item_${Date.now()}`,
        label: "New Item",
        icon: "⭐",
        active: false,
      },
    ];
    handleFieldChange("bottom_bar_items", items);
  };

  const removeBottomBarItem = (index) => {
    const items = [...(localConfig.bottom_bar_items || [])];
    items.splice(index, 1);
    handleFieldChange("bottom_bar_items", items);
  };

  const handleReset = () => {
    onReset();
  };

  return (
    <div className="space-y-4">
      {/* Top Bar Configuration */}
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <h4 className="text-sm font-medium text-gray-800 mb-3">
          📱 Top Bar Configuration
        </h4>

        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Title</label>
            <input
              type="text"
              value={localConfig.top_bar_title || "Menu"}
              onChange={(e) => handleFieldChange("top_bar_title", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Menu"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Background Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={localConfig.top_bar_bg_color || "#ffffff"}
                onChange={(e) =>
                  handleFieldChange("top_bar_bg_color", e.target.value)
                }
                className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={localConfig.top_bar_bg_color || "#ffffff"}
                onChange={(e) =>
                  handleFieldChange("top_bar_bg_color", e.target.value)
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="#ffffff"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Text Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={localConfig.top_bar_text_color || "#000000"}
                onChange={(e) =>
                  handleFieldChange("top_bar_text_color", e.target.value)
                }
                className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={localConfig.top_bar_text_color || "#000000"}
                onChange={(e) =>
                  handleFieldChange("top_bar_text_color", e.target.value)
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="#000000"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Profile Configuration */}
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <h4 className="text-sm font-medium text-gray-800 mb-3">
          👤 Profile Section
        </h4>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={localConfig.show_profile !== false}
              onChange={(e) =>
                handleFieldChange("show_profile", e.target.checked)
              }
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-xs text-gray-700">Show Profile Section</label>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Profile Name
            </label>
            <input
              type="text"
              value={localConfig.profile_name || "Alexa Jones"}
              onChange={(e) =>
                handleFieldChange("profile_name", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Alexa Jones"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Profile Subtitle
            </label>
            <input
              type="text"
              value={localConfig.profile_subtitle || "Edit your Profile"}
              onChange={(e) =>
                handleFieldChange("profile_subtitle", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Edit your Profile"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Background Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={localConfig.profile_bg_color || "#ffffff"}
                onChange={(e) =>
                  handleFieldChange("profile_bg_color", e.target.value)
                }
                className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={localConfig.profile_bg_color || "#ffffff"}
                onChange={(e) =>
                  handleFieldChange("profile_bg_color", e.target.value)
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="#ffffff"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tiles Configuration */}
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-800">
            🎯 Menu Tiles Configuration
          </h4>
          <button
            onClick={addTile}
            className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700"
          >
            + Add Tile
          </button>
        </div>

        <div className="space-y-3 mb-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Tiles Per Row
            </label>
            <select
              value={localConfig.tiles_per_row || 2}
              onChange={(e) =>
                handleFieldChange("tiles_per_row", parseInt(e.target.value))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="1">1 tile per row</option>
              <option value="2">2 tiles per row</option>
              <option value="3">3 tiles per row</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Tile Background Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={localConfig.tile_bg_color || "#ffffff"}
                onChange={(e) =>
                  handleFieldChange("tile_bg_color", e.target.value)
                }
                className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={localConfig.tile_bg_color || "#ffffff"}
                onChange={(e) =>
                  handleFieldChange("tile_bg_color", e.target.value)
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="#ffffff"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Tile Border Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={localConfig.tile_border_color || "#e5e7eb"}
                onChange={(e) =>
                  handleFieldChange("tile_border_color", e.target.value)
                }
                className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={localConfig.tile_border_color || "#e5e7eb"}
                onChange={(e) =>
                  handleFieldChange("tile_border_color", e.target.value)
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="#e5e7eb"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {(localConfig.tiles || []).map((tile, index) => (
            <div
              key={tile.id || index}
              className="bg-white border border-gray-300 rounded-md p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">
                  Tile #{index + 1}
                </span>
                <button
                  onClick={() => removeTile(index)}
                  className="text-red-600 hover:text-red-800 text-xs"
                >
                  Remove
                </button>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Icon (emoji)
                  </label>
                  <input
                    type="text"
                    value={tile.icon || "⭐"}
                    onChange={(e) =>
                      handleTileChange(index, "icon", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="⭐"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Label
                  </label>
                  <input
                    type="text"
                    value={tile.label || ""}
                    onChange={(e) =>
                      handleTileChange(index, "label", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Tile Label"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Links Configuration */}
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <h4 className="text-sm font-medium text-gray-800 mb-3">
          🔗 Footer Links
        </h4>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={localConfig.show_footer_links !== false}
              onChange={(e) =>
                handleFieldChange("show_footer_links", e.target.checked)
              }
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-xs text-gray-700">Show Footer Links</label>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Help & Support Text
            </label>
            <input
              type="text"
              value={localConfig.help_support_text || "Help & Support"}
              onChange={(e) =>
                handleFieldChange("help_support_text", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Help & Support"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Settings & Privacy Text
            </label>
            <input
              type="text"
              value={localConfig.settings_privacy_text || "Settings & Privacy"}
              onChange={(e) =>
                handleFieldChange("settings_privacy_text", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Settings & Privacy"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Link Text Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={localConfig.footer_link_color || "#6b7280"}
                onChange={(e) =>
                  handleFieldChange("footer_link_color", e.target.value)
                }
                className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={localConfig.footer_link_color || "#6b7280"}
                onChange={(e) =>
                  handleFieldChange("footer_link_color", e.target.value)
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="#6b7280"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar Configuration */}
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-800">
            📊 Bottom Navigation Bar
          </h4>
          <button
            onClick={addBottomBarItem}
            className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700"
          >
            + Add Item
          </button>
        </div>

        <div className="space-y-3 mb-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Background Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={localConfig.bottom_bar_bg_color || "#ffffff"}
                onChange={(e) =>
                  handleFieldChange("bottom_bar_bg_color", e.target.value)
                }
                className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={localConfig.bottom_bar_bg_color || "#ffffff"}
                onChange={(e) =>
                  handleFieldChange("bottom_bar_bg_color", e.target.value)
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="#ffffff"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Active Item Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={localConfig.bottom_bar_active_color || "#1e5a8e"}
                onChange={(e) =>
                  handleFieldChange("bottom_bar_active_color", e.target.value)
                }
                className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={localConfig.bottom_bar_active_color || "#1e5a8e"}
                onChange={(e) =>
                  handleFieldChange("bottom_bar_active_color", e.target.value)
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="#1e5a8e"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Inactive Item Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={localConfig.bottom_bar_inactive_color || "#6b7280"}
                onChange={(e) =>
                  handleFieldChange("bottom_bar_inactive_color", e.target.value)
                }
                className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={localConfig.bottom_bar_inactive_color || "#6b7280"}
                onChange={(e) =>
                  handleFieldChange("bottom_bar_inactive_color", e.target.value)
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="#6b7280"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {(localConfig.bottom_bar_items || []).map((item, index) => (
            <div
              key={item.id || index}
              className="bg-white border border-gray-300 rounded-md p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">
                  Item #{index + 1}
                </span>
                <button
                  onClick={() => removeBottomBarItem(index)}
                  className="text-red-600 hover:text-red-800 text-xs"
                >
                  Remove
                </button>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Icon (emoji)
                  </label>
                  <input
                    type="text"
                    value={item.icon || "⭐"}
                    onChange={(e) =>
                      handleBottomBarItemChange(index, "icon", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="⭐"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Label
                  </label>
                  <input
                    type="text"
                    value={item.label || ""}
                    onChange={(e) =>
                      handleBottomBarItemChange(index, "label", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Label"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={item.active || false}
                    onChange={(e) =>
                      handleBottomBarItemChange(
                        index,
                        "active",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="text-xs text-gray-700">
                    Active (highlighted)
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Configuration */}
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <h4 className="text-sm font-medium text-gray-800 mb-3">
          🧭 Navigation Configuration
        </h4>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <label className="w-32 text-sm text-gray-700">Profile →</label>
            <select
              value={
                localConfig.navigation_config?.profile?.target_screen_id || ""
              }
              onChange={(e) =>
                handleNavigationChange("profile", e.target.value)
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

          {(localConfig.tiles || []).map((tile, index) => (
            <div key={tile.id || index} className="flex items-center space-x-3">
              <label className="w-32 text-sm text-gray-700 truncate">
                {tile.label} →
              </label>
              <select
                value={
                  localConfig.navigation_config?.[`tile_${tile.id}`]
                    ?.target_screen_id || ""
                }
                onChange={(e) =>
                  handleNavigationChange(`tile_${tile.id}`, e.target.value)
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
          ))}

          <div className="flex items-center space-x-3">
            <label className="w-32 text-sm text-gray-700">Help & Support →</label>
            <select
              value={
                localConfig.navigation_config?.help_support?.target_screen_id || ""
              }
              onChange={(e) =>
                handleNavigationChange("help_support", e.target.value)
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
            <label className="w-32 text-sm text-gray-700">Settings & Privacy →</label>
            <select
              value={
                localConfig.navigation_config?.settings_privacy?.target_screen_id || ""
              }
              onChange={(e) =>
                handleNavigationChange("settings_privacy", e.target.value)
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

          {(localConfig.bottom_bar_items || []).map((item, index) => (
            <div key={item.id || index} className="flex items-center space-x-3">
              <label className="w-32 text-sm text-gray-700 truncate">
                {item.label} →
              </label>
              <select
                value={
                  localConfig.navigation_config?.[`bottom_nav_${item.id}`]
                    ?.target_screen_id || ""
                }
                onChange={(e) =>
                  handleNavigationChange(`bottom_nav_${item.id}`, e.target.value)
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
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Configure navigation for all interactive elements.
        </p>
      </div>

      {/* General Colors */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
        <h4 className="text-sm font-medium text-blue-800 mb-2">
          ℹ️ General Colors
        </h4>
        <div className="space-y-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Background Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={localConfig.background_color || "#f3f4f6"}
                onChange={(e) =>
                  handleFieldChange("background_color", e.target.value)
                }
                className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={localConfig.background_color || "#f3f4f6"}
                onChange={(e) =>
                  handleFieldChange("background_color", e.target.value)
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="#f3f4f6"
              />
            </div>
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

export default MenuDashboardConfig;

