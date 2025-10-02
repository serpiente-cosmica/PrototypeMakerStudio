/**
 * LoginFormScreen - Pantalla de formulario de login
 * Configuración aislada y escalable
 */
import React, { useState, useEffect } from "react";
import ImageTest from "../../common/ImageTest";

const LoginFormScreen = ({
  screenSettings = {},
  clientId,
  config,
  screenId,
  onNavigate,
  ...props
}) => {
  const [formData, setFormData] = useState({
    email: screenSettings?.email_placeholder || "dmorales@advantahealth.com",
    password: screenSettings?.password_placeholder || "**********",
  });

  // Actualizar formData cuando cambien los screenSettings
  useEffect(() => {
    setFormData({
      email: screenSettings?.email_placeholder || "dmorales@advantahealth.com",
      password: screenSettings?.password_placeholder || "**********",
    });
  }, [screenSettings?.email_placeholder, screenSettings?.password_placeholder]);

  if (!config) {
    return (
      <div className="h-full flex items-center justify-center bg-white">
        <div className="text-center text-gray-600">
          <p>Loading configuration...</p>
        </div>
      </div>
    );
  }

  // Configuración específica de la pantalla
  const backgroundColor =
    screenSettings?.background_color ||
    config?.colors_json?.background ||
    "#ffffff";
  const primaryColor =
    screenSettings?.primary_color || config?.colors_json?.primary || "#3b82f6";
  const secondaryColor =
    screenSettings?.secondary_color ||
    config?.colors_json?.secondary ||
    "#64748b";
  const buttonColor = screenSettings?.button_color || "#017755"; // Color de Figma

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = () => {
    // Demo functionality - just navigate to next screen
    if (onNavigate) {
      onNavigate("home_dashboard");
    }
  };

  const handleForgotPassword = () => {
    // Demo functionality - show placeholder
    console.log("Forgot Password - Demo functionality");
  };

  const handleNewAccount = () => {
    // Demo functionality - show placeholder
    console.log("New Account - Demo functionality");
  };

  return (
    <div
      className="h-full w-full flex flex-col bg-white px-6 py-8"
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      {/* Status Bar */}
      <div className="flex justify-between items-center mb-8">
        <span className="text-black text-sm font-medium">9:41</span>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-2 bg-black rounded-sm"></div>
          <div className="w-4 h-2 bg-black rounded-sm"></div>
          <div className="w-4 h-2 bg-black rounded-sm"></div>
        </div>
      </div>

      {/* Segunda imagen/logo en la parte superior */}
      {screenSettings?.second_logo_url && (
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24">
            <ImageTest src={screenSettings.second_logo_url} alt="Second Logo" />
          </div>
        </div>
      )}

      {/* Logo principal */}
      <div className="flex justify-center mb-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-900 mb-2">
            activefit
            <span className="text-green-500 text-2xl">+</span>
          </div>
        </div>
      </div>

      {/* Introductory Text */}
      <div className="text-center mb-8">
        <p className="text-black text-base leading-relaxed">
          Access your personalized health and wellness platform.
        </p>
      </div>

      {/* Input Fields */}
      <div className="space-y-4 mb-8">
        {/* Email Field */}
        <div>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={
              screenSettings?.email_placeholder || "Enter your email"
            }
          />
        </div>

        {/* Password Field */}
        <div>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={
              screenSettings?.password_placeholder || "Enter your password"
            }
          />
        </div>
      </div>

      {/* Log In Button */}
      <button
        onClick={handleLogin}
        className="w-full py-3 rounded-lg text-white font-semibold mb-4 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
        style={{
          backgroundColor: buttonColor,
          borderRadius: screenSettings?.button_radius || "12px",
        }}
      >
        {screenSettings?.login_button_text || "Log In"}
      </button>

      {/* Secondary Links */}
      <div className="text-center space-y-3">
        <button
          onClick={handleForgotPassword}
          className="text-sm hover:underline focus:outline-none"
          style={{ color: primaryColor }}
        >
          {screenSettings?.forgot_password_text || "Forgot Password?"}
        </button>

        <button
          onClick={handleNewAccount}
          className="text-sm hover:underline focus:outline-none block"
          style={{ color: primaryColor }}
        >
          {screenSettings?.new_account_text ||
            "No account yet? Tap here to verify your eligibility."}
        </button>
      </div>

      {/* Navigation Bar */}
      <div className="mt-auto flex justify-center">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
};

export default LoginFormScreen;
