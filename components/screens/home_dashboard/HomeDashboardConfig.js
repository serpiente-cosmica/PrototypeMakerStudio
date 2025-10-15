/**
 * HomeDashboardConfig - Configuration for HomeDashboardScreen
 * Handles all configurable properties for the home dashboard
 */
import React, { useState, useEffect } from "react";
import { useFileUpload } from "../../../hooks/useFileUpload";

const HomeDashboardConfig = ({
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

  const handleAlertChange = (index, field, value) => {
    const alerts = [...(localConfig.alerts || [])];
    alerts[index] = { ...alerts[index], [field]: value };
    handleFieldChange("alerts", alerts);
  };

  const addAlert = () => {
    const alerts = [
      ...(localConfig.alerts || []),
      {
        id: Date.now(),
        icon: "📢",
        title: "New Alert",
        description: "Alert description here",
      },
    ];
    handleFieldChange("alerts", alerts);
  };

  const removeAlert = (index) => {
    const alerts = [...(localConfig.alerts || [])];
    alerts.splice(index, 1);
    handleFieldChange("alerts", alerts);
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
              value={localConfig.top_bar_title || "Home"}
              onChange={(e) => handleFieldChange("top_bar_title", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Home"
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

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={localConfig.show_menu_icon !== false}
              onChange={(e) =>
                handleFieldChange("show_menu_icon", e.target.checked)
              }
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-xs text-gray-700">Show Menu Icon</label>
          </div>
        </div>
      </div>

      {/* Banner Configuration */}
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <h4 className="text-sm font-medium text-gray-800 mb-3">
          🖼️ Banner Configuration
        </h4>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={localConfig.show_banner !== false}
              onChange={(e) =>
                handleFieldChange("show_banner", e.target.checked)
              }
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-xs text-gray-700">Show Banner</label>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Upload Banner Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "banner_image_url")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {uploadLoading && (
              <p className="text-xs text-blue-600 mt-1">Uploading...</p>
            )}
          </div>

          <div className="text-center text-gray-500 text-xs">OR</div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Banner Image URL
            </label>
            <input
              type="url"
              value={localConfig.banner_image_url || ""}
              onChange={(e) =>
                handleFieldChange("banner_image_url", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="https://example.com/banner.jpg"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Banner Height
            </label>
            <input
              type="text"
              value={localConfig.banner_height || "200px"}
              onChange={(e) =>
                handleFieldChange("banner_height", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="200px"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Banner Click Navigation
            </label>
            <select
              value={localConfig.navigation_config?.banner?.target_screen_id || ""}
              onChange={(e) => handleNavigationChange("banner", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
            <p className="text-xs text-gray-500 mt-1">
              Select where users go when they click the banner
            </p>
          </div>
        </div>
      </div>

      {/* Alerts Configuration */}
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-800">
            🔔 Alerts Configuration
          </h4>
          <button
            onClick={addAlert}
            className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700"
          >
            + Add Alert
          </button>
        </div>

        <div className="mb-3">
          <label className="block text-xs text-gray-600 mb-1">
            Alerts Section Title
          </label>
          <input
            type="text"
            value={localConfig.alerts_title || "Alerts"}
            onChange={(e) => handleFieldChange("alerts_title", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Alerts"
          />
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {(localConfig.alerts || []).map((alert, index) => (
            <div
              key={alert.id || index}
              className="bg-white border border-gray-300 rounded-md p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">
                  Alert #{index + 1}
                </span>
                <button
                  onClick={() => removeAlert(index)}
                  className="text-red-600 hover:text-red-800 text-xs"
                >
                  Remove
                </button>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Icon (emoji or select)
                  </label>
                  <div className="flex items-center space-x-2">
                    <select
                      value={alert.icon || "📢"}
                      onChange={(e) =>
                        handleAlertChange(index, "icon", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="📢">📢 Announcement</option>
                      <option value="📊">📊 Chart</option>
                      <option value="🔧">🔧 Settings</option>
                      <option value="🏆">🏆 Trophy</option>
                      <option value="⚠️">⚠️ Warning</option>
                      <option value="✅">✅ Check</option>
                      <option value="❤️">❤️ Heart</option>
                      <option value="🎯">🎯 Target</option>
                      <option value="📅">📅 Calendar</option>
                      <option value="💡">💡 Lightbulb</option>
                      <option value="🔔">🔔 Bell</option>
                      <option value="⭐">⭐ Star</option>
                      <option value="🎉">🎉 Party</option>
                      <option value="💪">💪 Muscle</option>
                    </select>
                    <input
                      type="text"
                      value={alert.icon || "📢"}
                      onChange={(e) =>
                        handleAlertChange(index, "icon", e.target.value)
                      }
                      className="w-16 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg"
                      placeholder="📢"
                      maxLength="2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Background Color
                  </label>
                  <select
                    value={alert.bgColor || "#ffffff"}
                    onChange={(e) =>
                      handleAlertChange(index, "bgColor", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="#ffffff">⚪ White</option>
                    <option value="#f3f4f6">⚪ Light Gray</option>
                    <option value="#e5e7eb">⚪ Gray</option>
                    <option value="#d1d5db">⚪ Medium Gray</option>
                    <option value="#f0f9ff">🔵 Light Blue</option>
                    <option value="#fef3c7">🟡 Light Yellow</option>
                    <option value="#fef2f2">🔴 Light Red</option>
                    <option value="#f0fdf4">🟢 Light Green</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={alert.title || ""}
                    onChange={(e) =>
                      handleAlertChange(index, "title", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Alert Title"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Description
                  </label>
                  <textarea
                    value={alert.description || ""}
                    onChange={(e) =>
                      handleAlertChange(index, "description", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    rows="2"
                    placeholder="Alert description"
                  />
                </div>
              </div>
            </div>
          ))}
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

      {/* Push Notification Configuration */}
      <div className="bg-purple-50 border border-purple-200 rounded-md p-4">
        <h4 className="text-sm font-medium text-purple-800 mb-3">
          🔔 Push Notification Configuration
        </h4>

        <div className="space-y-3">
          <div className="flex items-center space-x-2 mb-3">
            <input
              type="checkbox"
              checked={localConfig.push_notification_enabled !== false}
              onChange={(e) =>
                handleFieldChange("push_notification_enabled", e.target.checked)
              }
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label className="text-xs text-gray-700 font-medium">
              Enable Push Notification (Click clock "9:41" to trigger)
            </label>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Notification Icon (emoji)
            </label>
            <input
              type="text"
              value={localConfig.push_notification_icon || "📱"}
              onChange={(e) =>
                handleFieldChange("push_notification_icon", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="📱"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              App Name
            </label>
            <input
              type="text"
              value={localConfig.push_notification_app_name || "ActiveFit+"}
              onChange={(e) =>
                handleFieldChange("push_notification_app_name", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="ActiveFit+"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Time Display
            </label>
            <input
              type="text"
              value={localConfig.push_notification_time || "now"}
              onChange={(e) =>
                handleFieldChange("push_notification_time", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="now"
            />
            <p className="text-xs text-gray-500 mt-1">
              Examples: "now", "5m ago", "2:30 PM"
            </p>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Notification Title
            </label>
            <input
              type="text"
              value={localConfig.push_notification_title || "New Activity Available"}
              onChange={(e) =>
                handleFieldChange("push_notification_title", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="New Activity Available"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Notification Message
            </label>
            <textarea
              value={
                localConfig.push_notification_message ||
                "You have a new wellness challenge! Tap to view details."
              }
              onChange={(e) =>
                handleFieldChange("push_notification_message", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              rows="3"
              placeholder="You have a new wellness challenge! Tap to view details."
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Background Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={localConfig.push_notification_bg_color || "#ffffff"}
                onChange={(e) =>
                  handleFieldChange("push_notification_bg_color", e.target.value)
                }
                className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={localConfig.push_notification_bg_color || "#ffffff"}
                onChange={(e) =>
                  handleFieldChange("push_notification_bg_color", e.target.value)
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="#ffffff"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Display Duration (milliseconds)
            </label>
            <input
              type="number"
              value={localConfig.push_notification_duration || 5000}
              onChange={(e) =>
                handleFieldChange("push_notification_duration", parseInt(e.target.value))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="5000"
              min="1000"
              step="500"
            />
            <p className="text-xs text-gray-500 mt-1">
              How long the notification stays visible (default: 5000ms = 5 seconds)
            </p>
          </div>

          <div className="bg-purple-100 border border-purple-200 rounded p-3 mt-3">
            <p className="text-xs text-purple-700">
              💡 <strong>Testing Tip:</strong> When previewing the prototype, click on the 
              clock time "9:41" at the top of the screen to trigger the push notification!
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Configuration */}
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <h4 className="text-sm font-medium text-gray-800 mb-3">
          🧭 Navigation Configuration
        </h4>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <label className="w-32 text-sm text-gray-700">Menu Icon →</label>
            <select
              value={
                localConfig.navigation_config?.menu_icon?.target_screen_id || ""
              }
              onChange={(e) =>
                handleNavigationChange("menu_icon", e.target.value)
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
          Configure navigation for menu icon, bottom bar items, and alert cards.
        </p>
      </div>

      {/* Color Configuration Info */}
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

export default HomeDashboardConfig;

