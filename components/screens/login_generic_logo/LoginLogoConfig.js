/**
 * LoginLogoConfig - Configuración específica para LoginLogoScreen
 * Maneja propiedades específicas de esta pantalla incluyendo el logo
 */
import React, { useState, useEffect } from "react";
import { useFileUpload } from "../../../hooks/useFileUpload";

const LoginLogoConfig = ({
  screenId,
  screenConfig,
  onConfigChange,
  onSave,
  onReset,
  isLoading = false,
  clientId,
}) => {
  const [localConfig, setLocalConfig] = useState(screenConfig);
  const { uploadFile, isLoading: uploadLoading } = useFileUpload();

  // Actualizar configuración local cuando cambie la prop
  useEffect(() => {
    setLocalConfig(screenConfig);
  }, [screenConfig]);

  const handleFieldChange = (field, value) => {
    const newConfig = { ...localConfig, [field]: value };
    setLocalConfig(newConfig);
    // Llamar inmediatamente para preview en tiempo real
    onConfigChange(newConfig);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadedUrl = await uploadFile(file, clientId);
        handleFieldChange("logo_url", uploadedUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file. Please try again.");
      }
    }
  };

  const handleReset = () => {
    onReset();
  };

  return (
    <div className="space-y-4">
      {/* Campo para cambiar el logo */}
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
            <label className="block text-xs text-gray-600 mb-1">Logo URL</label>
            <input
              type="url"
              value={localConfig.logo_url || ""}
              onChange={(e) => handleFieldChange("logo_url", e.target.value)}
              placeholder="https://example.com/logo.png"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Campos específicos de la pantalla */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Logo Size
        </label>
        <input
          type="text"
          value={localConfig.logo_size || "150px"}
          onChange={(e) => handleFieldChange("logo_size", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="150px"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Logo Position
        </label>
        <select
          value={localConfig.logo_position || "center"}
          onChange={(e) => handleFieldChange("logo_position", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="center">Center</option>
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
        </select>
      </div>

      {/* Información sobre configuración */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
        <h4 className="text-sm font-medium text-blue-800 mb-2">
          ℹ️ Screen Configuration
        </h4>
        <p className="text-xs text-blue-600">
          You can change the logo image, size, and position for this screen.
          Background color and brand colors are managed in the client's main
          configuration.
        </p>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          onClick={handleReset}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Reset
        </button>
        <div className="text-sm text-gray-500 flex items-center">
          💾 Changes are saved automatically when navigating
        </div>
      </div>
    </div>
  );
};

export default LoginLogoConfig;
