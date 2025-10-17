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
    email: screenSettings?.email_placeholder || "",
    password: screenSettings?.password_placeholder || "**********",
  });

  // Actualizar formData cuando cambien los screenSettings
  useEffect(() => {
    setFormData({
      email: screenSettings?.email_placeholder || "",
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
  // Los colores se toman de screenSettings (que incluye colores globales)
  const backgroundColor =
    screenSettings?.background_color ||
    config?.colors_json?.background ||
    "#ffffff";
  const primaryColor =
    screenSettings?.primary_color || config?.colors_json?.primary || "#017755";
  const secondaryColor =
    screenSettings?.secondary_color ||
    config?.colors_json?.secondary ||
    "#64748b";
  const accentColor =
    screenSettings?.accent_color || config?.colors_json?.accent || "#f97316";
  const buttonColor =
    screenSettings?.button_color || config?.colors_json?.primary || "#017755"; // Color de Figma

  // Debug logs para verificar colores
  console.log("🎨 LoginFormScreen colors:", {
    screenId,
    backgroundColor,
    primaryColor,
    secondaryColor,
    accentColor,
    buttonColor,
    screenSettings: {
      background_color: screenSettings?.background_color,
      primary_color: screenSettings?.primary_color,
      secondary_color: screenSettings?.secondary_color,
      accent_color: screenSettings?.accent_color,
      button_color: screenSettings?.button_color,
    },
    configColors: config?.colors_json,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Configuración de navegación
  const navigationConfig = screenSettings?.navigation_config || {};
  const logoNavigation = navigationConfig?.logo_click;
  const loginButtonNavigation = navigationConfig?.login_button;
  const forgotPasswordNavigation = navigationConfig?.forgot_password;
  const newAccountNavigation = navigationConfig?.new_account;

  const handleLogoClick = () => {
    if (logoNavigation?.target_screen_id && onNavigate) {
      console.log("🔄 Navigating to:", logoNavigation.target_screen_id);
      onNavigate(logoNavigation.target_screen_id);
    }
  };

  const handleLogin = () => {
    if (loginButtonNavigation?.target_screen_id && onNavigate) {
      console.log("🔄 Navigating to:", loginButtonNavigation.target_screen_id);
      onNavigate(loginButtonNavigation.target_screen_id);
    } else {
      // Demo functionality - just navigate to next screen
      if (onNavigate) {
        onNavigate("home_dashboard");
      }
    }
  };

  const handleForgotPassword = () => {
    if (forgotPasswordNavigation?.target_screen_id && onNavigate) {
      console.log(
        "🔄 Navigating to:",
        forgotPasswordNavigation.target_screen_id
      );
      onNavigate(forgotPasswordNavigation.target_screen_id);
    } else {
      // Demo functionality - show placeholder
      console.log("Forgot Password - Demo functionality");
    }
  };

  const handleNewAccount = () => {
    if (newAccountNavigation?.target_screen_id && onNavigate) {
      console.log("🔄 Navigating to:", newAccountNavigation.target_screen_id);
      onNavigate(newAccountNavigation.target_screen_id);
    } else {
      // Demo functionality - show placeholder
      console.log("New Account - Demo functionality");
    }
  };

  return (
    <div
      className="h-full w-full flex flex-col px-6 py-8"
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

      {/* Imagen principal */}
      <div className="flex justify-center mb-8">
        <div className="text-center">
          {screenSettings?.app_logo_url ? (
            <div
              className="w-32 h-16 flex items-center justify-center"
              style={{
                cursor: logoNavigation?.target_screen_id
                  ? "pointer"
                  : "default",
              }}
              onClick={
                logoNavigation?.target_screen_id ? handleLogoClick : undefined
              }
            >
              <ImageTest src={screenSettings.app_logo_url} alt="Top Image" />
            </div>
          ) : (
            <div
              className="text-3xl font-bold text-blue-900 mb-2"
              style={{
                cursor: logoNavigation?.target_screen_id
                  ? "pointer"
                  : "default",
              }}
              onClick={
                logoNavigation?.target_screen_id ? handleLogoClick : undefined
              }
            >
              activefit
              <span className="text-green-500 text-2xl">+</span>
            </div>
          )}
        </div>
      </div>

      {/* Introductory Text */}
      <div className="text-center mb-8">
        <p className="text-black text-base leading-relaxed">
          Access your personalized health and wellness platform.
        </p>
      </div>

      {/* Input Fields */}
      <div className="space-y-4 mb-16">
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

      {/* Log In Button - Pushed down to match Figma */}
      <button
        onClick={handleLogin}
        className="w-full py-4 rounded-lg text-white font-semibold mb-4 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
        style={{
          backgroundColor: buttonColor,
          borderRadius: screenSettings?.button_radius || "12px",
          cursor: loginButtonNavigation?.target_screen_id
            ? "pointer"
            : "default",
        }}
      >
        {screenSettings?.login_button_text || "Log In"}
      </button>

      {/* Secondary Links */}
      <div className="text-center space-y-3">
        <button
          onClick={handleForgotPassword}
          className="text-sm hover:underline focus:outline-none"
          style={{
            color: primaryColor,
            cursor: forgotPasswordNavigation?.target_screen_id
              ? "pointer"
              : "default",
          }}
        >
          {screenSettings?.forgot_password_text || "Forgot Password?"}
        </button>

        <button
          onClick={handleNewAccount}
          className="text-sm hover:underline focus:outline-none block"
          style={{
            color: primaryColor,
            cursor: newAccountNavigation?.target_screen_id
              ? "pointer"
              : "default",
          }}
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
