/**
 * Index file for my_activities
 * Registers the screen in the system
 */
import MyActivitiesScreen from "./MyActivitiesScreen";
import MyActivitiesConfig from "./MyActivitiesConfig";
import { registerScreen } from "../../../utils/screenRegistry";

// Default configuration specific to this screen
const defaultConfig = {
  // Top Bar Configuration
  top_bar_title: "My Activities",
  top_bar_bg_color: "#ffffff",
  top_bar_text_color: "#000000",
  
  // Status Cards Configuration
  status_cards: [
    { id: "goal_met", label: "Goal Met!", value: "12 / 12", color: "#065f46", bg_color: "#065f46" },
    { id: "accepted", label: "Accepted", value: "7", color: "#1e40af", bg_color: "#1e40af" },
    { id: "pending", label: "Pending", value: "4", color: "#ea580c", bg_color: "#ea580c" },
    { id: "rejected", label: "Rejected", value: "1", color: "#dc2626", bg_color: "#dc2626" },
  ],
  
  // Calendar Configuration
  calendar_month_year: "April 2025",
  calendar_day_labels: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
  calendar_days_data: [
    { day: 1, status: "pending" },
    { day: 3, status: "accepted" },
    { day: 4, status: "accepted" },
    { day: 5, status: "accepted" },
    { day: 8, status: "accepted" },
    { day: 11, status: "accepted" },
    { day: 15, status: "pending" },
    { day: 16, status: "pending" },
    { day: 20, status: "pending" },
    { day: 21, status: "accepted" },
    { day: 22, status: "accepted" },
    { day: 23, status: "rejected" },
    { day: 25, status: "accepted" },
  ],
  selected_day: 25,
  selected_date_text: "Monday, April 25, 2025",
  
  // Activity Cards Configuration
  activity_cards: [
    {
      id: 1,
      icon: "⌚",
      title: "SmartWalking",
      subtitle: "15046 steps",
      status: "Approved",
      status_color: "#1e40af",
    },
    {
      id: 2,
      icon: "📊",
      title: "iEnroll activity",
      subtitle: "Guided Health...",
      status: "Approved",
      status_color: "#1e40af",
    },
  ],
  
  // Bottom Bar Configuration
  bottom_bar_items: [
    { id: "home", label: "Home", icon: "🏠", active: false },
    { id: "activities", label: "Activities", icon: "📅", active: true },
    { id: "menu", label: "Menu", icon: "☰", active: false },
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
    bottom_nav_menu: {
      target_screen_id: "menu_dashboard",
      enabled: true,
    },
  },
  
  // Colors
  background_color: "#f3f4f6",
};

// Screen metadata
const metadata = {
  name: "My Activities Screen",
  description: "Activities tracking with calendar and status monitoring",
  version: "1.0.0",
  author: "Development Team",
  category: "Dashboard",
};

// Register the screen
registerScreen("my_activities", {
  component: MyActivitiesScreen,
  configComponent: MyActivitiesConfig,
  defaultConfig,
  dependencies: [],
  metadata,
});

// Export components for direct use if needed
export { MyActivitiesScreen, MyActivitiesConfig };
export default MyActivitiesScreen;

