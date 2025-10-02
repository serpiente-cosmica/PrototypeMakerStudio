import { useState } from "react";
import { useRouter } from "next/router";
import { useClients } from "../hooks/useAppConfig";
import { useAppApproaches } from "../hooks/useAppApproaches";
import { useModal } from "../hooks/useModal";
import ClientCreationForm from "../components/ClientCreationForm";
import Modal from "../components/common/Modal";
import ImageTest from "../components/common/ImageTest";

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
  const [showClientForm, setShowClientForm] = useState(false);
  const [selectedApproach, setSelectedApproach] = useState(null);

  // Estados para ordenamiento y búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("appName");
  const [sortDirection, setSortDirection] = useState("asc");

  // Hook para modales
  const {
    isOpen: isModalOpen,
    modalProps,
    hideModal,
    showSuccess,
  } = useModal();

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
    const approach = approaches.find((a) => a.approach_id === approachId);
    if (approach) {
      setSelectedApproach(approach);
      setShowApproachesModal(false);
      setShowClientForm(true);
    }
  };

  const handleCloseClientForm = () => {
    setShowClientForm(false);
    setSelectedApproach(null);
  };

  const handleCloseModal = () => {
    setShowApproachesModal(false);
  };

  const handleCopyUrl = (clientId) => {
    const url = `${window.location.origin}/demo/${clientId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        showSuccess(`URL copied to clipboard!\n\n${url}`, "Success");
      })
      .catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        showSuccess(`URL copied to clipboard!\n\n${url}`, "Success");
      });
  };

  // Funciones para ordenamiento y búsqueda
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return "↕️";
    return sortDirection === "asc" ? "↑" : "↓";
  };

  // Filtrar y ordenar clientes
  const filteredAndSortedClients = clients
    .filter((client) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        client.appName.toLowerCase().includes(searchLower) ||
        client.clientId.toLowerCase().includes(searchLower) ||
        client.approach.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Manejar campos anidados
      if (sortField === "primaryColor") {
        aValue = a.primaryColor || "#000000";
        bValue = b.primaryColor || "#000000";
      }

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

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

            {/* Barra de búsqueda */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search clients by name, ID, or approach..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔍</span>
                </div>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading clients...</p>
              </div>
            ) : (
              <div>
                {/* Contador de resultados */}
                <div className="mb-4 text-sm text-gray-600">
                  {searchTerm ? (
                    <span>
                      Showing {filteredAndSortedClients.length} of{" "}
                      {clients.length} clients
                      {searchTerm && ` matching "${searchTerm}"`}
                    </span>
                  ) : (
                    <span>Total: {clients.length} clients</span>
                  )}
                </div>

                {filteredAndSortedClients.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">🔍</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No clients found
                    </h3>
                    <p className="text-gray-500">
                      {searchTerm
                        ? `No clients match "${searchTerm}". Try a different search term.`
                        : "No clients have been created yet."}
                    </p>
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="bg-gray-50">
                          <th
                            className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                            onClick={() => handleSort("appName")}
                          >
                            <div className="flex items-center">
                              Client {getSortIcon("appName")}
                            </div>
                          </th>
                          <th
                            className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                            onClick={() => handleSort("approach")}
                          >
                            <div className="flex items-center">
                              Approach {getSortIcon("approach")}
                            </div>
                          </th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredAndSortedClients.map((client) => (
                          <tr
                            key={client.clientId}
                            className="hover:bg-gray-50"
                          >
                            <td className="px-4 py-4">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 overflow-hidden">
                                  {client.logoUrl ? (
                                    <ImageTest
                                      src={client.logoUrl}
                                      alt={`${client.appName} Logo`}
                                      className="w-full h-full object-cover rounded-full"
                                    />
                                  ) : (
                                    <div
                                      className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-sm"
                                      style={{
                                        backgroundColor: client.primaryColor,
                                      }}
                                    >
                                      {client.appName.charAt(0)}
                                    </div>
                                  )}
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
                                  onClick={() =>
                                    handleClientDemo(client.clientId)
                                  }
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                                >
                                  👁️ Demo
                                </button>
                                <button
                                  onClick={() =>
                                    handleClientAdmin(client.clientId)
                                  }
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
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">
            © 2025 Advanta - Demo Customizer Platform
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

      {/* Client Creation Form */}
      {showClientForm && selectedApproach && (
        <ClientCreationForm
          approachId={selectedApproach.approach_id}
          approachName={selectedApproach.name}
          onClose={handleCloseClientForm}
        />
      )}

      {/* Modal para notificaciones */}
      <Modal
        isOpen={isModalOpen}
        title={modalProps.title}
        message={modalProps.message}
        type={modalProps.type}
        onClose={hideModal}
        onConfirm={modalProps.onConfirm}
        confirmText={modalProps.confirmText}
        cancelText={modalProps.cancelText}
      />
    </div>
  );
};

export default PortalPage;
