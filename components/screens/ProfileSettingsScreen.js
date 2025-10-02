import { useAppConfig } from "../../hooks/useAppConfig";

/**
 * ProfileSettingsScreen Component
 * Screen ID: profile_settings
 * Displays user profile and settings.
 */
const ProfileSettingsScreen = () => {
  const { config, isLoading } = useAppConfig();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  const colors = config?.colors_json || {};
  const primaryColor = colors.primary || "#3b82f6";
  const backgroundColor = colors.background || "#ffffff";

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor }}>
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="flex items-center">
          <span className="text-white text-lg mr-3">←</span>
          <h1 className="text-white text-lg font-semibold">Profile Settings</h1>
        </div>
      </div>

      {/* Profile Section */}
      <div className="px-6 py-8">
        <div className="text-center mb-8">
          <div
            className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: primaryColor + "20" }}
          >
            {config?.logo_url ? (
              <img
                src={config.logo_url}
                alt="Profile"
                className="w-12 h-12 object-contain"
              />
            ) : (
              <span
                className="text-2xl font-bold"
                style={{ color: primaryColor }}
              >
                {config?.appName?.charAt(0) || "U"}
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-1">
            {config?.appName || "User Profile"}
          </h2>
          <p className="text-gray-600 text-sm">Manage your account settings</p>
        </div>

        {/* Settings Options */}
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2">
              Account Information
            </h3>
            <p className="text-gray-600 text-sm">
              Update your personal details
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2">Preferences</h3>
            <p className="text-gray-600 text-sm">
              Customize your app experience
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2">Notifications</h3>
            <p className="text-gray-600 text-sm">
              Manage notification settings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsScreen;
