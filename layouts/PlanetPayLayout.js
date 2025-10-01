import Header from "../components/common/Header";

/**
 * Layout para el approach PlanetPay (Pagos/Fintech)
 * @param {Object} props
 * @param {Object} props.config - Configuración del cliente
 * @param {React.ReactNode} props.children - Contenido a renderizar
 */
const PlanetPayLayout = ({ config, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header con configuración de PlanetPay */}
      <Header config={config} />

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Placeholder para contenido específico de PlanetPay */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              💳 PlanetPay Fintech Demo
            </h2>
            <p className="text-gray-600 mb-6">
              Este es el layout para aplicaciones de pagos y fintech.
            </p>

            {/* Información de configuración */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">
                Configuración Activa:
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>
                  <strong>App Name:</strong> {config?.appName}
                </li>
                <li>
                  <strong>Primary Color:</strong> {config?.primaryColor}
                </li>
                <li>
                  <strong>Approach:</strong> {config?.approach}
                </li>
                {config?.features?.supportedCurrencies && (
                  <li>
                    <strong>Monedas:</strong>{" "}
                    {config.features.supportedCurrencies.join(", ")}
                  </li>
                )}
                {config?.features?.transactionTypes && (
                  <li>
                    <strong>Tipos de Transacción:</strong>{" "}
                    {config.features.transactionTypes.join(", ")}
                  </li>
                )}
              </ul>
            </div>

            {/* Contenido dinámico */}
            {children}
          </div>
        </div>
      </main>

      {/* Footer específico de PlanetPay */}
      <footer className="bg-blue-600 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-blue-100">
            © 2024 {config?.appName || "PlanetPay"} - Financial Platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PlanetPayLayout;
