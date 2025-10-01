import { useState } from "react";
import { useRouter } from "next/router";
import { useClients } from "../hooks/useAppConfig";
import { useAppApproaches } from "../hooks/useAppApproaches";

/**
 * Portal de gestión de clientes con tabla y tabs de approaches
 */
const PortalPage = () => {
  const router = useRouter();
  const { clients, isLoading } = useClients();
  const {
    approaches,
    isLoading: approachesLoading,
    error: approachesError,
  } = useAppApproaches();
  const [showApproachesModal, setShowApproachesModal] = useState(false);

  const handleClientDemo = (clientId) => {
    window.open(`/demo/${clientId}`, "_blank");
  };

  const handleClientAdmin = (clientId) => {
    window.open(`/demo/${clientId}/admin`, "_blank");
  };

  const handleCreateClient = () => {
    setShowApproachesModal(true);
  };

  const handleApproachSelect = (approachId) => {
    // Permitir cualquier approach que venga de la base de datos
    // Generate a unique client ID
    const clientId = `new-client-${Date.now()}`;
    router.push(`/demo/${clientId}`);
    setShowApproachesModal(false);
  };

  const handleCloseModal = () => {
    setShowApproachesModal(false);
  };

  const handleCopyUrl = (clientId) => {
    const url = `${window.location.origin}/demo/${clientId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("URL copied to clipboard!");
      })
      .catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert("URL copied to clipboard!");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header del portal */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Demo Customizer Portal
            </h1>
            <p className="text-gray-600">
              Manage your clients and configure white label demos
            </p>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Registered Clients
              </h2>
              <button
                onClick={handleCreateClient}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                ➕ New Client
              </button>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading clients...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Client
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Approach
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {clients.map((client) => (
                      <tr key={client.clientId} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3"
                              style={{ backgroundColor: client.primaryColor }}
                            >
                              {client.appName.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {client.appName}
                              </p>
                              <p className="text-sm text-gray-500">
                                {client.clientId}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {client.approach}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => handleClientDemo(client.clientId)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                            >
                              👁️ Demo
                            </button>
                            <button
                              onClick={() => handleClientAdmin(client.clientId)}
                              className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                            >
                              ⚙️ Admin
                            </button>
                            <button
                              onClick={() => handleCopyUrl(client.clientId)}
                              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                              title="Copy demo URL"
                            >
                              📋 Copy URL
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">
            © 2024 Advanta - Demo Customizer Platform
          </p>
        </div>
      </footer>

      {/* Modal de Approaches */}
      {showApproachesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Select Approach for New Client
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {approachesLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading approaches...</p>
                </div>
              ) : approachesError ? (
                <div className="text-center py-12">
                  <p className="text-red-600 mb-4">
                    Error loading approaches: {approachesError}
                  </p>
                  <p className="text-gray-600">Using fallback data...</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {approaches.map((approach) => (
                    <div
                      key={approach.approach_id}
                      className={`relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                        approach.available
                          ? "hover:shadow-xl hover:scale-105"
                          : "opacity-60 cursor-not-allowed"
                      }`}
                      onClick={() => handleApproachSelect(approach.approach_id)}
                    >
                      {/* Header with gradient */}
                      <div
                        className={`h-24 bg-gradient-to-r ${
                          approach.color === "blue"
                            ? "from-blue-400 to-blue-600"
                            : approach.color === "purple"
                            ? "from-purple-400 to-purple-600"
                            : approach.color === "green"
                            ? "from-green-400 to-green-600"
                            : approach.color === "orange"
                            ? "from-orange-400 to-orange-600"
                            : "from-red-400 to-red-600"
                        } relative`}
                      >
                        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl">
                            {approach.available ? "🚀" : "🔒"}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {approach.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {approach.description}
                        </p>
                        {approach.available ? (
                          <div className="mt-3">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              ✅ Available
                            </span>
                          </div>
                        ) : (
                          <div className="mt-3">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                              🔒 Coming Soon
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortalPage;
