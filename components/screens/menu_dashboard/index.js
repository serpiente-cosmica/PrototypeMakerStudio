/**
 * Index file for menu_dashboard
 * Registers the screen in the system
 */
import MenuDashboardScreen from "./MenuDashboardScreen";
import MenuDashboardConfig from "./MenuDashboardConfig";
import { registerScreen } from "../../../utils/screenRegistry";

// Default configuration specific to this screen
const defaultConfig = {
  // Top Bar Configuration
  top_bar_title: "Menu",
  top_bar_bg_color: "#ffffff",
  top_bar_text_color: "#000000",
  
  // Profile Configuration
  profile_name: "Alexa Jones",
  profile_subtitle: "Edit your Profile",
  show_profile: true,
  profile_bg_color: "#ffffff",
  
  // Tiles Configuration
  tiles: [
    { id: "smartwalking", icon: "⌚", label: "SmartWalking" },
    { id: "activefit", icon: "👤", label: "ActiveFit@Home" },
    { id: "map", icon: "🗺️", label: "Map" },
    { id: "facilities", icon: "🏢", label: "My Facilities" },
    { id: "ienrollment", icon: "📊", label: "iEnrollment+" },
  ],
  tiles_per_row: 2,
  tile_bg_color: "#ffffff",
  tile_border_color: "#e5e7eb",
  
  // Footer Links Configuration
  show_footer_links: true,
  help_support_text: "Help & Support",
  settings_privacy_text: "Settings & Privacy",
  footer_link_color: "#6b7280",
  
  // Bottom Bar Configuration
  bottom_bar_items: [
    { id: "home", label: "Home", icon: "🏠", active: false },
    { id: "activities", label: "Activities", icon: "📅", active: false },
    { id: "menu", label: "Menu", icon: "☰", active: true },
  ],
  bottom_bar_bg_color: "#ffffff",
  bottom_bar_active_color: "#1e5a8e",
  bottom_bar_inactive_color: "#6b7280",
  
  // Navigation Configuration
  navigation_config: {
    bottom_nav_home: {
      target_screen_id: "home_dashboard",
      enabled: true,
    },
    bottom_nav_activities: {
      target_screen_id: "my_activities",
      enabled: true,
    },
  },
  
  // Colors
  background_color: "#f3f4f6",
};

// Screen metadata
const metadata = {
  name: "Menu Dashboard Screen",
  description: "Menu with profile, tiles, and navigation options",
  version: "1.0.0",
  author: "Development Team",
  category: "Dashboard",
};

// Register the screen
registerScreen("menu_dashboard", {
  component: MenuDashboardScreen,
  configComponent: MenuDashboardConfig,
  defaultConfig,
  dependencies: [],
  metadata,
});

// Export components for direct use if needed
export { MenuDashboardScreen, MenuDashboardConfig };
export default MenuDashboardScreen;

