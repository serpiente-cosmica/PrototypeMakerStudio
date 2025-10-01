import Header from "../components/common/Header";

/**
 * Layout for approach 1 (Base configuration)
 * @param {Object} props
 * @param {Object} props.config - Client configuration
 * @param {React.ReactNode} props.children - Content to render
 */
const FoodboxLayout = ({ config, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header con configuración del cliente */}
      <Header config={config} />

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Placeholder para contenido específico del approach */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🚀 {config?.appName} Demo
            </h2>
            <p className="text-gray-600 mb-6">
              This is the base layout for {config?.approach || "Approach 1"}.
            </p>

            {/* Información de configuración */}
            <div className="bg-orange-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-orange-800 mb-2">
                Active Configuration:
              </h3>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>
                  <strong>App Name:</strong> {config?.appName}
                </li>
                <li>
                  <strong>Primary Color:</strong> {config?.primaryColor}
                </li>
                <li>
                  <strong>Approach:</strong> {config?.approach}
                </li>
                <li>
                  <strong>Client ID:</strong> {config?.clientId}
                </li>
              </ul>
            </div>

            {/* Contenido dinámico */}
            {children}
          </div>
        </div>
      </main>

      {/* Footer específico del approach */}
      <footer className="bg-orange-600 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-orange-100">
            © 2024 {config?.appName || "Demo App"} -{" "}
            {config?.approach || "Approach 1"}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FoodboxLayout;
