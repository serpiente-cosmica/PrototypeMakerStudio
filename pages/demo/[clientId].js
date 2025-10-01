import { useRouter } from "next/router";
import { useAppConfig } from "../../hooks/useAppConfig";
import FoodboxLayout from "../../layouts/FoodboxLayout";

/**
 * Main demo page with conditional rendering based on approach
 * Route: /demo/[clientId]
 */
const DemoPage = () => {
  const router = useRouter();
  const { clientId } = router.query;
  const { config, isLoading, error } = useAppConfig(clientId);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Loading configuration...
          </h2>
          <p className="text-gray-500">Preparing demo for client: {clientId}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="text-red-600 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Error loading configuration
            </h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => router.push("/portal")}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Back to Portal
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No config found
  if (!config) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="text-yellow-600 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              Client not found
            </h3>
            <p className="text-yellow-600 mb-4">
              No configuration found for client: {clientId}
            </p>
            <button
              onClick={() => router.push("/portal")}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Back to Portal
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Renderizado condicional basado en el approach
  const renderLayout = () => {
    // Por ahora todos usan el mismo layout base (Approach 1)
    return (
      <FoodboxLayout config={config}>
        {/* Contenido específico del demo */}
        <div className="space-y-6">
          <div className="bg-blue-100 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">
              🚀 {config.approach} Features
            </h3>
            <ul className="text-blue-700 space-y-1">
              <li>• Dynamic white label configuration</li>
              <li>• Customizable colors</li>
              <li>• Custom logo and branding</li>
              <li>• Integrated admin panel</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">
                Active Configurations
              </h4>
              <p className="text-2xl font-bold text-blue-600">
                {Object.keys(config.features || {}).length}
              </p>
            </div>
            <div className="bg-white border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">Client Status</h4>
              <p className="text-2xl font-bold text-green-600 capitalize">
                {config.status}
              </p>
            </div>
          </div>
        </div>
      </FoodboxLayout>
    );
  };

  return renderLayout();
};

export default DemoPage;
