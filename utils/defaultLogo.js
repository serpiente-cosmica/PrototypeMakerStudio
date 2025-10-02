/**
 * Logo por defecto de Advanta - EXACTO como @logo.png
 * Recreado basado en la imagen proporcionada
 */
export const DEFAULT_ADVANTA_LOGO = `
<svg width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
  <!-- Fondo del logo - cuadrado con esquinas redondeadas -->
  <rect width="150" height="150" rx="25" fill="#017755"/>
  
  <!-- Letra 'a' principal - grande y centrada -->
  <text x="75" y="95" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle">a</text>
  
  <!-- Símbolo '+' pequeño en círculo verde -->
  <circle cx="110" cy="40" r="12" fill="#10b981"/>
  <text x="110" y="46" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle">+</text>
</svg>
`;

/**
 * Convierte el SVG a data URL para usar como imagen
 */
export const getDefaultLogoDataUrl = () => {
  const svgData = DEFAULT_ADVANTA_LOGO.trim();
  const encodedSvg = encodeURIComponent(svgData);
  return `data:image/svg+xml,${encodedSvg}`;
};

/**
 * URL del logo por defecto - Imagen real @logo.png
 * Apunta directamente al archivo en public/images/
 */
export const DEFAULT_LOGO_URL = "/images/logo.png";
