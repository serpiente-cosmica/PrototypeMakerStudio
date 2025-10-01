import { useState } from "react";
import { useRouter } from "next/router";
import { useAppConfig } from "../../../hooks/useAppConfig";
import Header from "../../../components/common/Header";

/**
 * Admin page for configuring a client
 * Route: /demo/[clientId]/admin
 */
const AdminPage = () => {
  const router = useRouter();
  const { clientId } = router.query;
  const { config, isLoading, error } = useAppConfig(clientId);
  const [isEditing, setIsEditing] = useState(false);
  const [editedConfig, setEditedConfig] = useState(null);

  // Inicializar configuración editada
  useState(() => {
    if (config) {
      setEditedConfig({ ...config });
    }
  }, [config]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedConfig({ ...config });
  };

  const handleSave = () => {
    // Here the configuration would be saved
    console.log("Saving configuration:", editedConfig);
    setIsEditing(false);
    // Simulate successful save
    alert("Configuration saved successfully");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedConfig({ ...config });
  };

  const handleInputChange = (field, value) => {
    setEditedConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleColorChange = (field, value) => {
    setEditedConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Loading configuration...
          </h2>
          <p className="text-gray-500">Preparing admin panel for: {clientId}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !config) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Error loading configuration
            </h3>
            <p className="text-red-600 mb-4">{error || "Client not found"}</p>
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

  const currentConfig = isEditing ? editedConfig : config;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header con configuración del cliente */}
      <Header config={currentConfig} />

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header de administración */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  ⚙️ Admin Panel
                </h1>
                <p className="text-gray-600">
                  Configuration for: <strong>{config.appName}</strong>
                </p>
              </div>
              <div className="flex space-x-3">
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    ✏️ Edit
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      ❌ Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      💾 Save
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Configuración del cliente */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Información básica */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                📋 Basic Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Application Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={currentConfig.appName}
                      onChange={(e) =>
                        handleInputChange("appName", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">
                      {config.appName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client ID
                  </label>
                  <p className="text-gray-500 font-mono text-sm">
                    {config.clientId}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Approach
                  </label>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {config.approach}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {config.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Configuración de colores */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                🎨 Color Configuration
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={currentConfig.primaryColor}
                      onChange={(e) =>
                        handleColorChange("primaryColor", e.target.value)
                      }
                      disabled={!isEditing}
                      className="w-12 h-10 border border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed"
                    />
                    {isEditing ? (
                      <input
                        type="text"
                        value={currentConfig.primaryColor}
                        onChange={(e) =>
                          handleColorChange("primaryColor", e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                      />
                    ) : (
                      <p className="text-gray-900 font-mono text-sm">
                        {config.primaryColor}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={currentConfig.secondaryColor}
                      onChange={(e) =>
                        handleColorChange("secondaryColor", e.target.value)
                      }
                      disabled={!isEditing}
                      className="w-12 h-10 border border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed"
                    />
                    {isEditing ? (
                      <input
                        type="text"
                        value={currentConfig.secondaryColor}
                        onChange={(e) =>
                          handleColorChange("secondaryColor", e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                      />
                    ) : (
                      <p className="text-gray-900 font-mono text-sm">
                        {config.secondaryColor}
                      </p>
                    )}
                  </div>
                </div>

                {/* Preview de colores */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color Preview
                  </label>
                  <div className="flex space-x-2">
                    <div
                      className="w-8 h-8 rounded border border-gray-300"
                      style={{ backgroundColor: currentConfig.primaryColor }}
                      title="Primary Color"
                    ></div>
                    <div
                      className="w-8 h-8 rounded border border-gray-300"
                      style={{ backgroundColor: currentConfig.secondaryColor }}
                      title="Secondary Color"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Características específicas */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              ⚙️ Características Específicas
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(config.features).map(([key, value]) => (
                <div key={key} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-2 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </h3>
                  {Array.isArray(value) ? (
                    <ul className="text-sm text-gray-600 space-y-1">
                      {value.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-600">{String(value)}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Información adicional */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              📊 Información Adicional
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">
                  URLs del Cliente
                </h3>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm text-gray-600">Demo URL:</label>
                    <p className="font-mono text-sm text-blue-600">
                      /demo/{config.clientId}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Admin URL:</label>
                    <p className="font-mono text-sm text-blue-600">
                      /demo/{config.clientId}/admin
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">Metadatos</h3>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm text-gray-600">Creado:</label>
                    <p className="text-sm text-gray-900">
                      {new Date(config.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">
                      Última actualización:
                    </label>
                    <p className="text-sm text-gray-900">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">
            © 2024 {config.appName} - Panel de Administración
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminPage;
