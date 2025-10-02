import ImageTest from "../common/ImageTest";

/**
 * LoginLogoScreen Component
 * Screen ID: login_generic_logo
 * Displays the application logo centered on the screen.
 *
 * This component is mapped in utils/screenMapper.js
 * and will be rendered when the screen ID 'login_generic_logo'
 * is found in the approach's screen_list_json.
 */
const LoginLogoScreen = ({ screenSettings = {}, clientId, config }) => {
  // Ya no necesitamos useAppConfig porque recibimos config como prop

  // Verificar que tenemos config
  if (!config) {
    return (
      <div className="h-full flex items-center justify-center bg-white">
        <div className="text-center text-gray-600">
          <p>Loading configuration...</p>
        </div>
      </div>
    );
  }

  // Usar el logo de configuración de pantalla si existe y no está vacío, sino el del cliente, sino el por defecto
  const logoUrl =
    screenSettings?.logo_url && screenSettings.logo_url.trim() !== ""
      ? screenSettings.logo_url
      : config?.logoUrl || null;
  const backgroundColor = screenSettings?.background_color || "#ffffff";

  return (
    <div
      className="h-full w-full flex items-center justify-center px-6"
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      {logoUrl ? (
        <ImageTest
          src={logoUrl}
          alt={config?.appName ? `${config.appName} Logo` : "App Logo"}
        />
      ) : (
        <div className="w-[150px] h-[150px] flex items-center justify-center bg-gray-200 rounded-lg text-gray-500 text-sm text-center">
          No Logo Available
        </div>
      )}
    </div>
  );
};

export default LoginLogoScreen;
