import { useEffect } from "react";
import { useRouter } from "next/router";

/**
 * Página de inicio que redirige automáticamente al portal de selección
 */
const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirigir automáticamente al portal
    router.replace("/portal");
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirigiendo al portal...</p>
      </div>
    </div>
  );
};

export default HomePage;
