import Image from "next/image";

/**
 * Reusable Header component that uses client configuration
 * @param {Object} props
 * @param {Object} props.config - Client configuration (appName, logoUrl, primaryColor)
 */
const Header = ({ config }) => {
  const primaryColor = config?.primaryColor || "#3b82f6";
  const appName = config?.appName || "Demo App";
  const logoUrl = config?.logoUrl || "/logos/default-logo.png";

  return (
    <header
      className="bg-white shadow-sm border-b border-gray-200"
      style={{
        borderBottomColor: primaryColor + "20", // 20% opacity
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo y nombre de la app */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={`${appName} logo`}
                  width={40}
                  height={40}
                  className="object-contain"
                  onError={(e) => {
                    // Fallback si la imagen no se carga
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
              ) : null}
              <div
                className="w-full h-full flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: primaryColor }}
                style={{ display: logoUrl ? "none" : "flex" }}
              >
                {appName.charAt(0).toUpperCase()}
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{ color: primaryColor }}>
                {appName}
              </h1>
              <p className="text-sm text-gray-500">Demo Customizer</p>
            </div>
          </div>

          {/* Información de configuración */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">
                {config?.approach || "Default"} Approach
              </p>
              <p className="text-xs text-gray-500">
                Client ID: {config?.clientId || "unknown"}
              </p>
            </div>

            {/* Indicador de color primario */}
            <div className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: primaryColor }}
                title={`Primary Color: ${primaryColor}`}
              ></div>
              <span className="text-xs text-gray-500 font-mono">
                {primaryColor}
              </span>
            </div>
          </div>

          {/* Menú móvil */}
          <div className="md:hidden">
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              style={{ color: primaryColor }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
