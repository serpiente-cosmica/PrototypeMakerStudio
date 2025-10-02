/**
 * LoginLogoScreen - Pantalla de logo de login
 * Configuración aislada y escalable
 */
import React from "react";
import ImageTest from "../../common/ImageTest";

const LoginLogoScreen = ({
  screenSettings = {},
  clientId,
  config,
  screenId,
  ...props
}) => {
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
  const logoUrl = screenSettings?.logo_url || config?.logoUrl || null;
  const backgroundColor =
    screenSettings?.background_color ||
    config?.colors_json?.background ||
    "#ffffff";
  const logoSize = screenSettings?.logo_size || "150px";
  const logoPosition = screenSettings?.logo_position || "center";

  const getPositionClasses = () => {
    switch (logoPosition) {
      case "top":
        return "items-start pt-8";
      case "bottom":
        return "items-end pb-8";
      case "center":
      default:
        return "items-center";
    }
  };

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Logo perfectamente centrado vertical y horizontalmente */}
      {logoUrl ? (
        <div
          style={{
            width: logoSize,
            height: logoSize,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ImageTest
            src={logoUrl}
            alt={config?.appName ? `${config.appName} Logo` : "App Logo"}
          />
        </div>
      ) : (
        <div
          style={{
            width: logoSize,
            height: logoSize,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#e5e7eb",
            borderRadius: "8px",
            color: "#6b7280",
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          No Logo Available
        </div>
      )}
    </div>
  );
};

export default LoginLogoScreen;
