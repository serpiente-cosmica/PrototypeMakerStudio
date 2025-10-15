/**
 * MyActivitiesConfig - Configuration for MyActivitiesScreen
 * Handles all configurable properties for the activities screen
 */
import React, { useState, useEffect } from "react";

const MyActivitiesConfig = ({
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

  const handleStatusCardChange = (index, field, value) => {
    const cards = [...(localConfig.status_cards || [])];
    cards[index] = { ...cards[index], [field]: value };
    handleFieldChange("status_cards", cards);
  };

  const handleActivityCardChange = (index, field, value) => {
    const cards = [...(localConfig.activity_cards || [])];
    cards[index] = { ...cards[index], [field]: value };
    handleFieldChange("activity_cards", cards);
  };

  const addActivityCard = () => {
    const cards = [
      ...(localConfig.activity_cards || []),
      {
        id: Date.now(),
        icon: "⭐",
        title: "New Activity",
        subtitle: "Activity description",
        status: "Approved",
        status_color: "#1e40af",
      },
    ];
    handleFieldChange("activity_cards", cards);
  };

  const removeActivityCard = (index) => {
    const cards = [...(localConfig.activity_cards || [])];
    cards.splice(index, 1);
    handleFieldChange("activity_cards", cards);
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
              value={localConfig.top_bar_title || "My Activities"}
              onChange={(e) => handleFieldChange("top_bar_title", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="My Activities"
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

      {/* Status Cards Configuration */}
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <h4 className="text-sm font-medium text-gray-800 mb-3">
          📊 Status Cards
        </h4>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {(localConfig.status_cards || []).map((card, index) => (
            <div
              key={card.id || index}
              className="bg-white border border-gray-300 rounded-md p-3"
            >
              <div className="mb-2">
                <span className="text-xs font-medium text-gray-700">
                  Card #{index + 1}
                </span>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Label
                  </label>
                  <input
                    type="text"
                    value={card.label || ""}
                    onChange={(e) =>
                      handleStatusCardChange(index, "label", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Status Label"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Value
                  </label>
                  <input
                    type="text"
                    value={card.value || ""}
                    onChange={(e) =>
                      handleStatusCardChange(index, "value", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={card.color || "#1e40af"}
                      onChange={(e) =>
                        handleStatusCardChange(index, "color", e.target.value)
                      }
                      className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={card.color || "#1e40af"}
                      onChange={(e) =>
                        handleStatusCardChange(index, "color", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="#1e40af"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Configuration */}
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <h4 className="text-sm font-medium text-gray-800 mb-3">
          📅 Calendar Configuration
        </h4>

        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Month & Year Display
            </label>
            <input
              type="text"
              value={localConfig.calendar_month_year || "April 2025"}
              onChange={(e) =>
                handleFieldChange("calendar_month_year", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="April 2025"
            />
            <p className="text-xs text-gray-500 mt-1">
              This is a display value. Calendar navigation is functional.
            </p>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Selected Day
            </label>
            <input
              type="number"
              value={localConfig.selected_day || 25}
              onChange={(e) =>
                handleFieldChange("selected_day", parseInt(e.target.value))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="25"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Selected Date Text
            </label>
            <input
              type="text"
              value={localConfig.selected_date_text || "Monday, April 25, 2025"}
              onChange={(e) =>
                handleFieldChange("selected_date_text", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Monday, April 25, 2023"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-2">
            <p className="text-xs text-blue-700">
              ℹ️ Calendar days with status are configured in the calendar_days_data array. 
              The calendar is navigable between months using arrow buttons.
            </p>
          </div>
        </div>
      </div>

      {/* Activity Cards Configuration */}
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-800">
            📋 Activity Cards
          </h4>
          <button
            onClick={addActivityCard}
            className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700"
          >
            + Add Activity
          </button>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {(localConfig.activity_cards || []).map((card, index) => (
            <div
              key={card.id || index}
              className="bg-white border border-gray-300 rounded-md p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">
                  Activity #{index + 1}
                </span>
                <button
                  onClick={() => removeActivityCard(index)}
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
                    value={card.icon || "⭐"}
                    onChange={(e) =>
                      handleActivityCardChange(index, "icon", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="⭐"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={card.title || ""}
                    onChange={(e) =>
                      handleActivityCardChange(index, "title", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Activity Title"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={card.subtitle || ""}
                    onChange={(e) =>
                      handleActivityCardChange(index, "subtitle", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Activity description"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Status Text
                  </label>
                  <input
                    type="text"
                    value={card.status || "Approved"}
                    onChange={(e) =>
                      handleActivityCardChange(index, "status", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Approved"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Status Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={card.status_color || "#1e40af"}
                      onChange={(e) =>
                        handleActivityCardChange(index, "status_color", e.target.value)
                      }
                      className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={card.status_color || "#1e40af"}
                      onChange={(e) =>
                        handleActivityCardChange(index, "status_color", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="#1e40af"
                    />
                  </div>
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

      {/* Navigation Configuration */}
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <h4 className="text-sm font-medium text-gray-800 mb-3">
          🧭 Navigation Configuration
        </h4>

        <div className="space-y-3">
          {(localConfig.activity_cards || []).map((card, index) => (
            <div key={card.id || index} className="flex items-center space-x-3">
              <label className="w-32 text-sm text-gray-700 truncate">
                {card.title} →
              </label>
              <select
                value={
                  localConfig.navigation_config?.[`activity_${index}`]
                    ?.target_screen_id || ""
                }
                onChange={(e) =>
                  handleNavigationChange(`activity_${index}`, e.target.value)
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
          Configure navigation for activity cards and bottom bar items.
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

export default MyActivitiesConfig;

