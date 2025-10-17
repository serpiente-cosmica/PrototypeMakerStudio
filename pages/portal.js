import { useState } from "react";
import { useRouter } from "next/router";
import { useClients } from "../hooks/useAppConfig";
import { useAppApproaches } from "../hooks/useAppApproaches";
import { useModal } from "../hooks/useModal";
import { useDeleteClient } from "../hooks/useDeleteClient";
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
  const { deleteClient, isDeleting } = useDeleteClient();
  const [showApproachesModal, setShowApproachesModal] = useState(false);
  const [showClientForm, setShowClientForm] = useState(false);
  const [selectedApproach, setSelectedApproach] = useState(null);
  const [clientToDelete, setClientToDelete] = useState(null);

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

  const handleDeleteClient = (client) => {
    setClientToDelete(client);
  };

  const confirmDelete = async () => {
    if (!clientToDelete) return;

    const result = await deleteClient(clientToDelete.clientId);
    
    if (result.success) {
      showSuccess(
        `Prototype "${clientToDelete.appName}" has been deleted successfully.`,
        "Deleted"
      );
      setClientToDelete(null);
      // Reload the page to refresh the client list
      router.reload();
    } else {
      showSuccess(
        `Failed to delete prototype: ${result.error}`,
        "Error"
      );
    }
  };

  const cancelDelete = () => {
    setClientToDelete(null);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex flex-col">
      {/* Header del portal - Compact version */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <div className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 p-2 rounded-xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
              Prototype Maker Studio
            </h1>
            <p className="text-gray-500 text-sm">
              Manage clients • Configure screens • Build demos
            </p>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 hover:shadow-3xl transition-shadow duration-300">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent flex items-center gap-3">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  Your Prototypes
                </h2>
                <p className="text-gray-500 text-sm mt-1">Manage and configure your client prototypes</p>
              </div>
              <button
                onClick={handleCreateClient}
                className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
              >
                <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                New Prototype
              </button>
            </div>

            {/* Enhanced Search Bar */}
            <div className="mb-8">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search by name, ID, or approach..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-14 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-400 shadow-sm hover:shadow-md"
                />
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
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
                                <button
                                  onClick={() => handleDeleteClient(client)}
                                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center gap-1"
                                  title="Delete prototype"
                                >
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                  Delete
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

      {/* Delete Confirmation Modal */}
      {clientToDelete && (
        <Modal
          isOpen={true}
          title="Delete Prototype"
          message={`Are you sure you want to delete "${clientToDelete.appName}"?\n\nThis action cannot be undone. All screen configurations for this prototype will be permanently deleted.`}
          type="error"
          onClose={cancelDelete}
          onConfirm={confirmDelete}
          confirmText={isDeleting ? "Deleting..." : "Delete"}
          cancelText="Cancel"
        />
      )}
    </div>
  );
};

export default PortalPage;
