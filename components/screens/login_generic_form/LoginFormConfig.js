/**
 * LoginFormConfig - Configuración específica para LoginFormScreen
 * Maneja todas las propiedades específicas de esta pantalla
 */
import React, { useState, useEffect } from "react";
import { useFileUpload } from "../../../hooks/useFileUpload";

const LoginFormConfig = ({
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

  const handleFileChange = async (e, field) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadedUrl = await uploadFile(file, clientId);
        handleFieldChange(field, uploadedUrl);
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
      {/* Imagen para pantalla 2 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Top Image
        </label>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Upload Image File
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "app_logo_url")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {uploadLoading && (
              <p className="text-xs text-blue-600 mt-1">Uploading...</p>
            )}
          </div>
          <div className="text-center text-gray-500 text-sm">OR</div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={localConfig.app_logo_url || ""}
              onChange={(e) =>
                handleFieldChange("app_logo_url", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.png"
            />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Image that appears at the top of the login form
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Placeholder
        </label>
        <input
          type="text"
          value={localConfig.email_placeholder || "dmorales@advantahealth.com"}
          onChange={(e) =>
            handleFieldChange("email_placeholder", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="dmorales@advantahealth.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password Placeholder
        </label>
        <input
          type="text"
          value={localConfig.password_placeholder || "**********"}
          onChange={(e) =>
            handleFieldChange("password_placeholder", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="**********"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Login Button Text
        </label>
        <input
          type="text"
          value={localConfig.login_button_text || "Log In"}
          onChange={(e) =>
            handleFieldChange("login_button_text", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Log In"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Button Color
        </label>
        <div className="flex items-center space-x-3">
          <input
            type="color"
            value={localConfig.button_color || "#017755"}
            onChange={(e) => handleFieldChange("button_color", e.target.value)}
            className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
          />
          <input
            type="text"
            value={localConfig.button_color || "#017755"}
            onChange={(e) => handleFieldChange("button_color", e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="#017755"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Button Border Radius
        </label>
        <input
          type="text"
          value={localConfig.button_radius || "12px"}
          onChange={(e) => handleFieldChange("button_radius", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="12px"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Forgot Password Text
        </label>
        <input
          type="text"
          value={localConfig.forgot_password_text || "Forgot Password?"}
          onChange={(e) =>
            handleFieldChange("forgot_password_text", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Forgot Password?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          New Account Text
        </label>
        <input
          type="text"
          value={
            localConfig.new_account_text ||
            "No account yet? Tap here to verify your eligibility."
          }
          onChange={(e) =>
            handleFieldChange("new_account_text", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="No account yet? Tap here to verify your eligibility."
        />
      </div>

      {/* Campos comunes para todas las pantallas */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Background Color
        </label>
        <div className="flex items-center space-x-3">
          <input
            type="color"
            value={localConfig.background_color || "#ffffff"}
            onChange={(e) =>
              handleFieldChange("background_color", e.target.value)
            }
            className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
          />
          <input
            type="text"
            value={localConfig.background_color || "#ffffff"}
            onChange={(e) =>
              handleFieldChange("background_color", e.target.value)
            }
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="#ffffff"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Primary Color
        </label>
        <div className="flex items-center space-x-3">
          <input
            type="color"
            value={localConfig.primary_color || "#3b82f6"}
            onChange={(e) => handleFieldChange("primary_color", e.target.value)}
            className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
          />
          <input
            type="text"
            value={localConfig.primary_color || "#3b82f6"}
            onChange={(e) => handleFieldChange("primary_color", e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="#3b82f6"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Secondary Color
        </label>
        <div className="flex items-center space-x-3">
          <input
            type="color"
            value={localConfig.secondary_color || "#64748b"}
            onChange={(e) =>
              handleFieldChange("secondary_color", e.target.value)
            }
            className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
          />
          <input
            type="text"
            value={localConfig.secondary_color || "#64748b"}
            onChange={(e) =>
              handleFieldChange("secondary_color", e.target.value)
            }
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="#64748b"
          />
        </div>
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

export default LoginFormConfig;
