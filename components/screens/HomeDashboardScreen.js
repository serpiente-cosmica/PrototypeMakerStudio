import { useAppConfig } from "../../hooks/useAppConfig";

/**
 * HomeDashboardScreen Component
 * Screen ID: home_dashboard
 * Displays a home dashboard with app branding.
 */
const HomeDashboardScreen = () => {
  const { config, isLoading } = useAppConfig();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <p className="text-gray-600">Loading dashboard...</p>
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
        className="px-6 py-4 flex items-center justify-center"
        style={{ backgroundColor: primaryColor }}
      >
        {config?.logo_url && (
          <img
            src={config.logo_url}
            alt={`${config?.appName || "App"} Logo`}
            className="w-8 h-8 object-contain mr-3"
          />
        )}
        <h1 className="text-white text-lg font-semibold">
          {config?.appName || "App Name"}
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome to {config?.appName || "Your App"}
          </h2>
          <p className="text-gray-600">This is your personalized dashboard</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 gap-4">
          <div
            className="p-6 rounded-lg shadow-sm"
            style={{ backgroundColor: primaryColor + "20" }}
          >
            <h3 className="font-semibold text-gray-800 mb-2">Quick Actions</h3>
            <p className="text-gray-600 text-sm">
              Access your most used features
            </p>
          </div>

          <div
            className="p-6 rounded-lg shadow-sm"
            style={{ backgroundColor: primaryColor + "20" }}
          >
            <h3 className="font-semibold text-gray-800 mb-2">
              Recent Activity
            </h3>
            <p className="text-gray-600 text-sm">
              Your latest updates and notifications
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboardScreen;
