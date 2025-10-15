/**
 * DataPrivacyScreen - Now redesigned as Onboarding Screen
 * Matches the iEnroll onboarding design with customizable content
 */
import React from "react";

const DataPrivacyScreen = ({
  screenSettings = {},
  clientId,
  config,
  screenId,
  onNavigate,
  availableScreens = [],
  ...props
}) => {
  if (!config) {
    return (
      <div className="h-full flex items-center justify-center bg-white">
        <div className="text-center text-gray-600">
          <p>Loading configuration...</p>
        </div>
      </div>
    );
  }

  // Configuration
  const topBarColor = screenSettings?.top_bar_color || "#3B82F6";
  const logoUrl = screenSettings?.logo_url || config?.logo_url || "";
  const mainTitle = screenSettings?.main_title || "Make the Most of Your Benefits";
  const subtitle = screenSettings?.subtitle || "Easily explore, compare, and manage your benefits — all from one place within the app.";
  
  // Three configurable sections
  const sections = [
    {
      icon: screenSettings?.section_1_icon || "⭐",
      title: screenSettings?.section_1_title || "Discover Your Plan Options",
      description: screenSettings?.section_1_description || "Browse your available benefits and find the health, dental, or vision plan that works for your lifestyle and budget."
    },
    {
      icon: screenSettings?.section_2_icon || "📋",
      title: screenSettings?.section_2_title || "Enroll with Ease",
      description: screenSettings?.section_2_description || "Follow simple steps to enroll in your chosen plan. No paperwork, no stress — just a smooth, digital experience."
    },
    {
      icon: screenSettings?.section_3_icon || "🔔",
      title: screenSettings?.section_3_title || "Stay Informed Year-Round",
      description: screenSettings?.section_3_description || "Review your coverage details, get reminders for important dates, and make updates when your needs change."
    }
  ];

  // Button configuration
  const continueButtonText = screenSettings?.continue_button_text || "Continue";
  const continueButtonColor = screenSettings?.continue_button_color || "#3B82F6";
  const closeButtonText = screenSettings?.close_button_text || "Close";
  
  // Navigation
  const navigationConfig = screenSettings?.navigation_config || {};
  const continueNavigation = navigationConfig?.continue_button;
  const closeNavigation = navigationConfig?.close_button;

  const handleContinueClick = () => {
    if (continueNavigation?.target_screen_id && onNavigate) {
      onNavigate(continueNavigation.target_screen_id);
    }
  };

  const handleCloseClick = () => {
    if (closeNavigation?.target_screen_id && onNavigate) {
      onNavigate(closeNavigation.target_screen_id);
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-white">
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

      {/* Customizable Top Bar - Rounded top corners and half height */}
      <div 
        className="w-full h-8 flex-shrink-0 rounded-t-3xl"
        style={{ backgroundColor: topBarColor }}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-6 py-8 overflow-y-auto">
        {/* Logo */}
        {logoUrl && (
          <div className="flex justify-center mb-6">
            <img 
              src={logoUrl} 
              alt="Logo" 
              className="h-12 w-auto object-contain"
            />
          </div>
        )}

        {/* Main Title */}
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-4 leading-tight">
          {mainTitle}
        </h1>

        {/* Subtitle */}
        <p className="text-center text-gray-600 mb-8 px-2">
          {subtitle}
        </p>

        {/* Three Feature Sections */}
        <div className="space-y-6 mb-8">
          {sections.map((section, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-50 rounded-full text-2xl">
                {section.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {section.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {section.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Spacer to push buttons to bottom */}
        <div className="flex-1" />

        {/* Buttons */}
        <div className="space-y-3 pt-4">
          <button
            onClick={handleContinueClick}
            className="w-full py-4 rounded-xl text-white font-semibold text-lg shadow-lg transition-all hover:shadow-xl active:scale-98"
            style={{ backgroundColor: continueButtonColor }}
          >
            {continueButtonText}
          </button>
          
          <button
            onClick={handleCloseClick}
            className="w-full py-4 rounded-xl bg-gray-100 text-gray-700 font-semibold text-lg transition-all hover:bg-gray-200 active:scale-98"
          >
            {closeButtonText}
          </button>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="flex justify-center py-2">
        <div className="w-32 h-1 bg-black rounded-full" />
      </div>
    </div>
  );
};

export default DataPrivacyScreen;
