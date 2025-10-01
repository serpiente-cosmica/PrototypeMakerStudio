import { useRouter } from "next/router";

/**
 * New Client page - Approach selection
 * Route: /portal/new-client
 */
const NewClientPage = () => {
  const router = useRouter();

  const approaches = [
    {
      id: 1,
      name: "Approach 1",
      description: "Base configuration with dynamic white label settings",
      color: "blue",
      available: true,
    },
    {
      id: 2,
      name: "Approach 2",
      description: "Advanced customization features",
      color: "purple",
      available: false,
    },
    {
      id: 3,
      name: "Approach 3",
      description: "Enterprise-level configurations",
      color: "green",
      available: false,
    },
    {
      id: 4,
      name: "Approach 4",
      description: "Mobile-first design approach",
      color: "orange",
      available: false,
    },
    {
      id: 5,
      name: "Approach 5",
      description: "Custom integrations and APIs",
      color: "red",
      available: false,
    },
  ];

  const handleApproachSelect = (approachId) => {
    if (approachId === 1) {
      // Generate a unique client ID
      const clientId = `new-client-${Date.now()}`;
      router.push(`/demo/${clientId}`);
    }
  };

  const handleBackToPortal = () => {
    router.push("/portal");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create New Client
            </h1>
            <p className="text-gray-600">
              Select an approach for your new client demo
            </p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <button
              onClick={handleBackToPortal}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span className="mr-2">←</span>
              Back to Portal
            </button>
          </div>

          {/* Approaches grid */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Available Approaches
            </h2>
            <p className="text-gray-600 mb-8">
              Choose the approach that best fits your client's needs
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approaches.map((approach) => (
                <div
                  key={approach.id}
                  className={`relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                    approach.available
                      ? "hover:shadow-xl hover:scale-105"
                      : "opacity-60 cursor-not-allowed"
                  }`}
                  onClick={() => handleApproachSelect(approach.id)}
                >
                  {/* Header with gradient */}
                  <div
                    className={`h-24 bg-gradient-to-r ${
                      approach.color === "blue"
                        ? "from-blue-400 to-blue-600"
                        : approach.color === "purple"
                        ? "from-purple-400 to-purple-600"
                        : approach.color === "green"
                        ? "from-green-400 to-green-600"
                        : approach.color === "orange"
                        ? "from-orange-400 to-orange-600"
                        : "from-red-400 to-red-600"
                    } relative`}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl">
                        {approach.available ? "🚀" : "🔒"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {approach.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {approach.description}
                    </p>
                    {approach.available ? (
                      <div className="mt-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ✅ Available
                        </span>
                      </div>
                    ) : (
                      <div className="mt-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          🔒 Coming Soon
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">Advanta - Demo Customizer Platform</p>
        </div>
      </footer>
    </div>
  );
};

export default NewClientPage;
