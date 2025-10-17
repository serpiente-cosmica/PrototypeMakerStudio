/**
 * HomeDashboardScreen Component
 * Screen ID: home_dashboard
 * Displays a home dashboard with top bar, banner, alerts, and bottom navigation.
 */
import React, { useState } from "react";

const HomeDashboardScreen = ({ clientId, screenSettings = {}, onNavigate }) => {
  const [showNotification, setShowNotification] = useState(false);

  // Extract configuration with defaults
  const {
    // Top Bar Configuration
    top_bar_title = "Home",
    top_bar_bg_color = "#ffffff",
    top_bar_text_color = "#000000",
    show_menu_icon = true,
    
    // Banner Configuration
    banner_image_url = "",
    banner_height = "200px",
    show_banner = true,
    
    // Alerts Configuration
    alerts_title = "Alerts",
    alerts = [
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
    bottom_bar_items = [
      { id: "home", label: "Home", icon: "🏠", active: true },
      { id: "activities", label: "Activities", icon: "📅", active: false },
      { id: "menu", label: "Menu", icon: "☰", active: false },
    ],
    bottom_bar_bg_color = "#ffffff",
    bottom_bar_active_color = "#1e5a8e",
    bottom_bar_inactive_color = "#6b7280",
    
    // Navigation Configuration
    navigation_config = {},
    
    // Push Notification Configuration
    push_notification_enabled = true,
    push_notification_icon = "📱",
    push_notification_app_name = "ActiveFit+",
    push_notification_time = "now",
    push_notification_title = "New Activity Available",
    push_notification_message = "You have a new wellness challenge! Tap to view details.",
    push_notification_bg_color = "#ffffff",
    push_notification_duration = 5000,
    
    // Colors
    background_color = "#f3f4f6",
    primary_color = "#1e5a8e",
  } = screenSettings;

  const handleClockClick = () => {
    if (push_notification_enabled) {
      setShowNotification(true);
      // Auto-hide notification after duration
      setTimeout(() => {
        setShowNotification(false);
      }, push_notification_duration);
    }
  };

  const handleNavigation = (elementId) => {
    const navConfig = navigation_config?.[elementId];
    if (navConfig?.target_screen_id && onNavigate) {
      console.log(`🔄 [HomeDashboard] Navigating from ${elementId} to:`, navConfig.target_screen_id);
      onNavigate(navConfig.target_screen_id);
    } else {
      console.log(`⚠️ [HomeDashboard] No navigation configured for: ${elementId}`, { navConfig, hasOnNavigate: !!onNavigate });
    }
  };

  return (
    <div 
      className="h-full w-full flex flex-col relative"
      style={{ backgroundColor: background_color }}
    >
      {/* Status Bar with clickable clock */}
      <div className="bg-white px-4 py-2 flex items-center justify-between text-sm">
        <button 
          onClick={handleClockClick}
          className="font-semibold hover:opacity-70 transition-opacity"
          title="Click to trigger notification"
        >
          9:41
        </button>
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
          </svg>
        </div>
      </div>

      {/* Push Notification Overlay */}
      {showNotification && (
        <div 
          className="absolute top-12 left-4 right-4 z-50 animate-slide-down shadow-2xl rounded-2xl overflow-hidden"
          style={{ 
            backgroundColor: push_notification_bg_color,
            animation: "slideDown 0.3s ease-out"
          }}
          onClick={() => setShowNotification(false)}
        >
          <div className="p-4">
            <div className="flex items-start space-x-3">
              <div className="text-3xl flex-shrink-0">
                {push_notification_icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-gray-900">
                    {push_notification_app_name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {push_notification_time}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {push_notification_title}
                </h3>
                <p className="text-sm text-gray-700">
                  {push_notification_message}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div 
        className="flex items-center justify-between px-4 py-3 shadow-sm"
        style={{ 
          backgroundColor: top_bar_bg_color,
          color: top_bar_text_color 
        }}
      >
        <h1 className="text-2xl font-bold">{top_bar_title}</h1>
        {show_menu_icon && (
          <button
            onClick={() => handleNavigation("menu_icon")}
            className="p-2"
            style={{ color: top_bar_text_color }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" 
              />
            </svg>
          </button>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Banner - Clickable */}
        {show_banner && (
          <div 
            onClick={() => handleNavigation("banner")}
            className="w-full overflow-hidden cursor-pointer hover:opacity-95 transition-opacity"
            style={{ height: banner_height }}
          >
            {banner_image_url ? (
              <img
                src={banner_image_url}
                alt="Banner"
                className="w-full h-full object-cover"
              />
            ) : (
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{ backgroundColor: "#e5e7eb" }}
              >
                <div className="text-center p-6">
                  <div className="text-4xl mb-2">🖼️</div>
                  <p className="text-gray-600 text-sm">Click to upload banner image</p>
                  <p className="text-gray-400 text-xs mt-1">(Clickable & navigable)</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Alerts Section */}
        <div className="px-4 py-4">
          <h2 className="text-lg font-semibold text-gray-600 mb-3">
            {alerts_title} ({alerts.length})
          </h2>

          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div
                key={alert.id || index}
                onClick={() => handleNavigation(`alert_${index}`)}
                className="rounded-lg p-4 shadow-sm flex items-start space-x-3 cursor-pointer hover:shadow-md transition-shadow"
                style={{
                  backgroundColor: alert.bgColor || "#ffffff",
                }}
              >
                <div className="text-3xl flex-shrink-0">
                  {alert.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    {alert.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {alert.description}
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom padding for bottom bar */}
        <div className="h-20"></div>
      </div>

      {/* Bottom Navigation Bar - Fixed to phone container */}
      <div 
        className="absolute bottom-0 left-0 right-0 border-t shadow-lg"
        style={{ backgroundColor: bottom_bar_bg_color }}
      >
        <div className="flex items-center justify-around py-2 px-2">
          {bottom_bar_items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(`bottom_nav_${item.id}`)}
              className="flex flex-col items-center justify-center px-3 py-2 flex-1 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span className="text-2xl mb-1">{item.icon}</span>
              <span
                className="text-xs font-medium"
                style={{
                  color: item.active
                    ? bottom_bar_active_color
                    : bottom_bar_inactive_color,
                }}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
        
        {/* Home Indicator */}
        <div className="flex justify-center pb-2">
          <div className="w-32 h-1 bg-black rounded-full opacity-30" />
        </div>
      </div>
    </div>
  );
};

export default HomeDashboardScreen;

