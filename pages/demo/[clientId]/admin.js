import { useEffect } from "react";
import { useRouter } from "next/router";

/**
 * Admin page for configuring a client
 * Route: /demo/[clientId]/admin
 * This page redirects to the screen configuration page
 */
const AdminPage = () => {
  const router = useRouter();
  const { clientId } = router.query;

  useEffect(() => {
    if (router.isReady && clientId) {
      // Redirect to the screen configuration page
      router.replace(`/portal/client/${clientId}/configure`);
    }
  }, [router.isReady, clientId]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to configuration page...</p>
      </div>
    </div>
  );
};

export default AdminPage;
