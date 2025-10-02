import { useState } from "react";
import { useRouter } from "next/router";
import { useCreateClient } from "../hooks/useCreateClient";
import { useFileUpload } from "../hooks/useFileUpload";

/**
 * ClientCreationForm Component
 * Formulario simplificado para crear un nuevo cliente
 * @param {Object} props
 * @param {string} props.approachId - UUID del approach seleccionado
 * @param {string} props.approachName - Nombre del approach
 * @param {Function} props.onClose - Función para cerrar el modal
 */
const ClientCreationForm = ({ approachId, approachName, onClose }) => {
  const router = useRouter();
  const { createClient, isLoading, error } = useCreateClient();
  const { uploadFile, isLoading: uploadLoading } = useFileUpload();

  const [formData, setFormData] = useState({
    client_id: "",
    app_name: "",
    colors_json: {
      primary: "#3b82f6",
      secondary: "#64748b",
      accent: "#f59e0b",
      background: "#ffffff",
    },
    logo_url: "",
    logo_file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleColorChange = (colorKey, value) => {
    setFormData((prev) => ({
      ...prev,
      colors_json: {
        ...prev.colors_json,
        [colorKey]: value,
      },
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Generar un clientId temporal para organizar el archivo
        const tempClientId =
          formData.client_id.toLowerCase().replace(/\s+/g, "-") ||
          "temp-client";

        const uploadedUrl = await uploadFile(file, tempClientId);
        setFormData((prev) => ({
          ...prev,
          logo_url: uploadedUrl,
          logo_file: file,
        }));
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file. Please try again.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.client_id.trim() || !formData.app_name.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const clientId = formData.client_id.toLowerCase().replace(/\s+/g, "-");

      await createClient({
        ...formData,
        client_id: clientId,
        approach_id: approachId,
      });

      // Redirigir directamente a la configuración
      router.push(`/portal/client/${clientId}/configure`);
      onClose(); // Cerrar el modal
    } catch (err) {
      console.error("Error creating client:", err);
      alert("Error creating client. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Create New Client
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 text-sm">
              Approach: <span className="font-semibold">{approachName}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Name *
              </label>
              <input
                type="text"
                name="client_id"
                value={formData.client_id}
                onChange={handleInputChange}
                placeholder="e.g., My Company Demo"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                This will be used in the demo URL
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                App Name *
              </label>
              <input
                type="text"
                name="app_name"
                value={formData.app_name}
                onChange={handleInputChange}
                placeholder="e.g., My Awesome App"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo
              </label>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Upload Logo File
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {uploadLoading && (
                    <p className="text-xs text-blue-600 mt-1">Uploading...</p>
                  )}
                </div>
                <div className="text-center text-gray-500 text-sm">OR</div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    name="logo_url"
                    value={formData.logo_url}
                    onChange={handleInputChange}
                    placeholder="https://example.com/logo.png"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Brand Colors
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Primary
                  </label>
                  <input
                    type="color"
                    value={formData.colors_json.primary}
                    onChange={(e) =>
                      handleColorChange("primary", e.target.value)
                    }
                    className="w-full h-10 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Secondary
                  </label>
                  <input
                    type="color"
                    value={formData.colors_json.secondary}
                    onChange={(e) =>
                      handleColorChange("secondary", e.target.value)
                    }
                    className="w-full h-10 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Accent
                  </label>
                  <input
                    type="color"
                    value={formData.colors_json.accent}
                    onChange={(e) =>
                      handleColorChange("accent", e.target.value)
                    }
                    className="w-full h-10 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Background
                  </label>
                  <input
                    type="color"
                    value={formData.colors_json.background}
                    onChange={(e) =>
                      handleColorChange("background", e.target.value)
                    }
                    className="w-full h-10 border border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || uploadLoading}
                className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors ${
                  isLoading || uploadLoading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isLoading || uploadLoading
                  ? "Creating Client..."
                  : "Create Client"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientCreationForm;
