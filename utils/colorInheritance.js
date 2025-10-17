/**
 * Color Inheritance System
 * Merges global colors from client config with screen-specific colors
 * Screen-specific colors override global colors if set
 */

/**
 * Merge global colors with screen-specific colors
 * @param {Object} globalColors - colors_json from client_configs
 * @param {Object} screenSettings - screen-specific configuration
 * @returns {Object} - Merged configuration with inherited colors
 */
export const inheritColors = (globalColors = {}, screenSettings = {}) => {
  // Define color mappings from global to screen-specific properties
  const colorMappings = {
    // Background colors
    background: ['background_color', 'bg_color', 'profile_bg_color', 'tile_bg_color'],
    
    // Primary/Button colors
    primary: [
      'button_color',
      'primary_color',
      'continue_button_color',
      'top_bar_bg_color',
      'bottom_bar_bg_color',
      'bottom_bar_active_color'
    ],
    
    // Secondary colors
    secondary: ['secondary_color', 'bottom_bar_inactive_color', 'tile_border_color'],
    
    // Accent colors
    accent: ['accent_color', 'top_bar_color']
  };

  // Create a new object with inherited colors
  const mergedSettings = { ...screenSettings };

  // Apply global colors only if screen-specific color is not set
  Object.entries(colorMappings).forEach(([globalKey, screenKeys]) => {
    const globalValue = globalColors[globalKey];
    
    if (globalValue) {
      screenKeys.forEach(screenKey => {
        // Only apply global color if screen-specific color is not set or is empty
        if (!mergedSettings[screenKey] || mergedSettings[screenKey] === '') {
          mergedSettings[screenKey] = globalValue;
        }
      });
    }
  });

  return mergedSettings;
};

/**
 * Get colors summary for UI display
 * @param {Object} globalColors - colors_json from client_configs
 * @returns {Object} - Color summary
 */
export const getColorsSummary = (globalColors = {}) => {
  return {
    background: globalColors.background || '#ffffff',
    primary: globalColors.primary || '#1e5a8e',
    secondary: globalColors.secondary || '#64748b',
    accent: globalColors.accent || '#f97316'
  };
};

