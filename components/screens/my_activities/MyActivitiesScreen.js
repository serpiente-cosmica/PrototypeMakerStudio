/**
 * MyActivitiesScreen Component
 * Screen ID: my_activities
 * Displays activities with calendar and status tracking
 */
import React, { useState } from "react";
import { useScreenNavigation } from "../../../hooks/useScreenNavigation";

const MyActivitiesScreen = ({ clientId, screenSettings = {} }) => {
  const { navigateToScreen } = useScreenNavigation(clientId);

  // Extract configuration with defaults
  const {
    // Top Bar Configuration
    top_bar_title = "My Activities",
    top_bar_bg_color = "#ffffff",
    top_bar_text_color = "#000000",
    
    // Status Cards Configuration
    status_cards = [
      { id: "goal_met", label: "Goal Met!", value: "12 / 12", color: "#065f46", bg_color: "#065f46" },
      { id: "accepted", label: "Accepted", value: "7", color: "#1e40af", bg_color: "#1e40af" },
      { id: "pending", label: "Pending", value: "4", color: "#ea580c", bg_color: "#ea580c" },
      { id: "rejected", label: "Rejected", value: "1", color: "#dc2626", bg_color: "#dc2626" },
    ],
    
    // Calendar Configuration
    calendar_month_year = "April 2025",
    calendar_day_labels = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
    calendar_days_data = [
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
    selected_day = 25,
    selected_date_text = "Monday, April 25, 2025",
    
    // Activity Cards Configuration
    activity_cards = [
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
    bottom_bar_items = [
      { id: "home", label: "Home", icon: "🏠", active: false },
      { id: "activities", label: "Activities", icon: "📅", active: true },
      { id: "menu", label: "Menu", icon: "☰", active: false },
    ],
    bottom_bar_bg_color = "#ffffff",
    bottom_bar_active_color = "#1e5a8e",
    bottom_bar_inactive_color = "#6b7280",
    
    // Navigation Configuration
    navigation_config = {},
    
    // Colors
    background_color = "#f3f4f6",
  } = screenSettings;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(selected_day);

  const handleNavigation = (elementId) => {
    const navConfig = navigation_config?.[elementId];
    if (navConfig?.target_screen_id) {
      console.log(`🔄 Navigating from ${elementId} to:`, navConfig.target_screen_id);
      navigateToScreen(navConfig.target_screen_id);
    } else {
      console.log(`⚠️ No navigation configured for: ${elementId}`);
    }
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const getDayStatus = (day) => {
    const dayData = calendar_days_data.find(d => d.day === day);
    return dayData?.status || null;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "#1e5a8e";
      case "pending":
        return "#ea580c";
      case "rejected":
        return "#dc2626";
      case "goal_met":
        return "#065f46";
      default:
        return "transparent";
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth();
    const firstDay = getFirstDayOfMonth();
    const days = [];

    // Add empty cells for days before the first day
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Add day cells
    for (let day = 1; day <= daysInMonth; day++) {
      const status = getDayStatus(day);
      const isSelected = day === selectedDay;
      
      days.push(
        <button
          key={day}
          onClick={() => setSelectedDay(day)}
          className="h-10 flex items-center justify-center rounded-full relative"
          style={{
            backgroundColor: status ? getStatusColor(status) : "transparent",
            border: isSelected ? "2px solid #000" : "none",
          }}
        >
          <span
            className="text-sm font-medium"
            style={{
              color: status ? "#fff" : "#000",
            }}
          >
            {day}
          </span>
        </button>
      );
    }

    return days;
  };

  return (
    <div 
      className="h-full w-full flex flex-col"
      style={{ backgroundColor: background_color }}
    >
      {/* Status Bar */}
      <div className="bg-white px-4 py-2 flex items-center justify-between text-sm">
        <span className="font-semibold">9:41</span>
        <div className="flex items-center gap-1">
          <svg width="17" height="12" viewBox="0 0 20 13" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M19.3652 1.53301C19.3652 0.899963 18.8876 0.38678 18.2985 0.38678H17.2318C16.6427 0.38678 16.1652 0.899963 16.1652 1.53301V11.467C16.1652 12.1 16.6427 12.6132 17.2318 12.6132H18.2985C18.8876 12.6132 19.3652 12.1 19.3652 11.467V1.53301ZM11.931 2.83206H12.9977C13.5868 2.83206 14.0644 3.35756 14.0644 4.0058V11.4395C14.0644 12.0877 13.5868 12.6132 12.9977 12.6132H11.931C11.3419 12.6132 10.8644 12.0877 10.8644 11.4395V4.0058C10.8644 3.35756 11.3419 2.83206 11.931 2.83206ZM7.59928 5.48111H6.53261C5.94351 5.48111 5.46594 6.0133 5.46594 6.66979V11.4245C5.46594 12.081 5.94351 12.6132 6.53261 12.6132H7.59928C8.18838 12.6132 8.66594 12.081 8.66594 11.4245V6.66979C8.66594 6.0133 8.18838 5.48111 7.59928 5.48111ZM2.29849 7.9264H1.23183C0.642724 7.9264 0.165161 8.45099 0.165161 9.0981V11.4415C0.165161 12.0886 0.642724 12.6132 1.23183 12.6132H2.29849C2.8876 12.6132 3.36516 12.0886 3.36516 11.4415V9.0981C3.36516 8.45099 2.8876 7.9264 2.29849 7.9264Z" fill="black"/>
          </svg>
          <svg width="15" height="11" viewBox="0 0 18 13" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.93641 2.80213C11.4235 2.80223 13.8155 3.72432 15.618 5.3778C15.7538 5.50545 15.9707 5.50384 16.1044 5.37419L17.4019 4.11072C17.4696 4.04496 17.5073 3.95588 17.5068 3.8632C17.5062 3.77052 17.4674 3.68187 17.3989 3.61688C12.6679 -0.757833 5.20418 -0.757833 0.473168 3.61688C0.404636 3.68183 0.365752 3.77044 0.36512 3.86313C0.364488 3.95581 0.402161 4.04491 0.469801 4.11072L1.76767 5.37419C1.90126 5.50404 2.11839 5.50565 2.25404 5.3778C4.05678 3.72421 6.44906 2.80212 8.93641 2.80213ZM8.93306 7.0224C10.2904 7.02232 11.5993 7.53406 12.6054 8.45819C12.7415 8.58934 12.9558 8.5865 13.0885 8.45178L14.3758 7.13247C14.4436 7.06327 14.4812 6.96939 14.4802 6.87184C14.4792 6.77429 14.4397 6.68121 14.3706 6.61342C11.3067 3.72257 6.56199 3.72257 3.49816 6.61342C3.42895 6.68121 3.38947 6.77434 3.38856 6.87192C3.38765 6.9695 3.4254 7.06337 3.49333 7.13247L4.78024 8.45178C4.91289 8.5865 5.12726 8.58934 5.26334 8.45819C6.26879 7.53467 7.57664 7.02297 8.93306 7.0224ZM11.4575 9.81596C11.4594 9.9213 11.4223 10.0229 11.355 10.0967L9.17838 12.5514C9.11458 12.6236 9.02758 12.6642 8.93681 12.6642C8.84604 12.6642 8.75905 12.6236 8.69524 12.5514L6.51822 10.0967C6.45096 10.0228 6.41397 9.92122 6.41596 9.81587C6.41796 9.71052 6.45877 9.61075 6.52875 9.54014C7.91885 8.22625 9.95478 8.22625 11.3449 9.54014C11.4148 9.61081 11.4556 9.7106 11.4575 9.81596Z" fill="black"/>
          </svg>
          <svg width="25" height="12" viewBox="0 0 28 13" fill="none">
            <rect opacity="0.35" x="1" y="0.5" width="24" height="12" rx="3.8" stroke="black"/>
            <path opacity="0.4" d="M26.5068 4.78113V8.8566C27.3116 8.51143 27.8349 7.70847 27.8349 6.81886C27.8349 5.92926 27.3116 5.1263 26.5068 4.78113Z" fill="black"/>
            <rect x="2.5" y="2" width="21" height="9" rx="2.5" fill="black"/>
          </svg>
        </div>
      </div>

      {/* Top Bar */}
      <div 
        className="flex items-center justify-center px-4 py-4 shadow-sm"
        style={{ 
          backgroundColor: top_bar_bg_color,
          color: top_bar_text_color 
        }}
      >
        <h1 className="text-2xl font-bold">{top_bar_title}</h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Status Cards */}
        <div className="px-4 py-4 grid grid-cols-4 gap-2">
          {status_cards.map((card, index) => (
            <div
              key={card.id || index}
              className="flex flex-col items-center p-2 rounded-lg"
              style={{
                backgroundColor: index === 0 ? card.bg_color : "#f3f4f6",
              }}
            >
              <div
                className="text-xs font-medium mb-1"
                style={{
                  color: index === 0 ? "#fff" : "#6b7280",
                }}
              >
                {card.label}
              </div>
              <div
                className="text-lg font-bold"
                style={{
                  color: index === 0 ? "#fff" : card.color,
                }}
              >
                {card.value}
              </div>
              {index === 0 && (
                <div
                  className="w-full h-1 rounded-full mt-1"
                  style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
                >
                  <div
                    className="h-full bg-white rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              )}
              {index > 0 && (
                <div
                  className="w-full h-1 rounded-full mt-1"
                  style={{ backgroundColor: card.color }}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Calendar Section */}
        <div className="px-4 py-4 bg-white">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePreviousMonth}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <h3 className="text-lg font-semibold text-gray-900">
              {calendar_month_year}
            </h3>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Day Labels */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {calendar_day_labels.map((label, index) => (
              <div
                key={index}
                className="text-xs text-center font-medium text-gray-600"
              >
                {label}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {renderCalendar()}
          </div>
        </div>

        {/* Selected Date */}
        <div className="px-4 py-4">
          <div className="text-center text-gray-600 font-medium">
            {selected_date_text}
          </div>
        </div>

        {/* Activity Cards */}
        <div className="px-4 pb-4 space-y-3">
          {activity_cards.map((card, index) => (
            <div
              key={card.id || index}
              onClick={() => handleNavigation(`activity_${index}`)}
              className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3 flex-1">
                <div className="text-3xl flex-shrink-0">
                  {card.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {card.subtitle}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium border"
                  style={{
                    color: card.status_color,
                    borderColor: card.status_color,
                  }}
                >
                  {card.status}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
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
            </div>
          ))}
        </div>
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

export default MyActivitiesScreen;

