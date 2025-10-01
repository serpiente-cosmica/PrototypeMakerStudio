/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Configuración para imágenes
  images: {
    domains: ["localhost"],
    unoptimized: true, // Para desarrollo
  },

  // Configuración de rutas
  async redirects() {
    return [
      {
        source: "/",
        destination: "/portal",
        permanent: false,
      },
    ];
  },

  // Variables de entorno
  env: {
    CUSTOM_KEY: "demo-customizer",
  },
};

module.exports = nextConfig;
