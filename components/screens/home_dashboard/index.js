/**
 * Index file for home_dashboard
 * Registers the screen in the system
 */
import HomeDashboardScreen from "./HomeDashboardScreen";
import HomeDashboardConfig from "./HomeDashboardConfig";
import { registerScreen } from "../../../utils/screenRegistry";

// Default configuration specific to this screen
const defaultConfig = {
  // Top Bar Configuration
  top_bar_title: "Home",
  top_bar_bg_color: "#ffffff",
  top_bar_text_color: "#000000",
  show_menu_icon: true,
  
  // Banner Configuration
  banner_image_url: "",
  banner_height: "200px",
  show_banner: true,
  
  // Alerts Configuration
  alerts_title: "Alerts",
  alerts: [
    {
      id: 1,
      icon: "📊",
      title: "Activating Engagement",
      description: "Got 3 minutes? Compare plan options now in iEnroll and earn progress toward your goal.",
    },
    {
      id: 2,
      icon: "🔧",
      title: "Scheduled Maintenance Today",
      description: "Our servers will undergo maintenance at 8 PM tonight. Some features may be temporarily unavailable.",
    },
    {
      id: 3,
      icon: "🏆",
      title: "You Did It!",
      description: "Congrats on reaching your monthly goal! Check your rewards to see what you've unlocked.",
    },
  ],
  
  // Bottom Bar Configuration
  bottom_bar_items: [
    { id: "home", label: "Home", icon: "🏠", active: true },
    { id: "activities", label: "Activities", icon: "📅", active: false },
    { id: "menu", label: "Menu", icon: "☰", active: false },
  ],
  bottom_bar_bg_color: "#ffffff",
  bottom_bar_active_color: "#1e5a8e",
  bottom_bar_inactive_color: "#6b7280",
  
  // Navigation Configuration
  navigation_config: {
    bottom_nav_activities: {
      target_screen_id: "my_activities",
      enabled: true,
    },
    bottom_nav_menu: {
      target_screen_id: "menu_dashboard",
      enabled: true,
    },
  },
  
  // Push Notification Configuration
  push_notification_enabled: true,
  push_notification_icon: "📱",
  push_notification_app_name: "ActiveFit+",
  push_notification_time: "now",
  push_notification_title: "New Activity Available",
  push_notification_message: "You have a new wellness challenge! Tap to view details.",
  push_notification_bg_color: "#ffffff",
  push_notification_duration: 5000,
  
  // Colors
  background_color: "#f3f4f6",
  primary_color: "#1e5a8e",
};

// Screen metadata
const metadata = {
  name: "Home Dashboard Screen",
  description: "Home dashboard with top bar, banner, alerts, and bottom navigation",
  version: "1.0.0",
  author: "Development Team",
  category: "Dashboard",
};

// Register the screen
registerScreen("home_dashboard", {
  component: HomeDashboardScreen,
  configComponent: HomeDashboardConfig,
  defaultConfig,
  dependencies: [],
  metadata,
});

// Export components for direct use if needed
export { HomeDashboardScreen, HomeDashboardConfig };
export default HomeDashboardScreen;

