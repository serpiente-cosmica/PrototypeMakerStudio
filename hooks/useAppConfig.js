import { useState, useEffect } from "react";

// Simulación de datos de configuración hardcodeados
const MOCK_CLIENT_CONFIGS = {
  "foodbox-demo": {
    clientId: "foodbox-demo",
    appName: "Foodbox Delivery",
    logoUrl: "/logos/foodbox-logo.png",
    approach: "Approach 1",
    primaryColor: "#ff6b35",
    secondaryColor: "#f7931e",
    features: {
      deliveryRadius: 5,
      categories: ["Pizza", "Burgers", "Asian", "Mexican"],
      paymentMethods: ["Credit Card", "Cash", "PayPal"],
    },
    createdAt: "2024-01-15",
    status: "active",
  },
  "planetpay-demo": {
    clientId: "planetpay-demo",
    appName: "PlanetPay",
    logoUrl: "/logos/planetpay-logo.png",
    approach: "Approach 1",
    primaryColor: "#4f46e5",
    secondaryColor: "#06b6d4",
    features: {
      supportedCurrencies: ["USD", "EUR", "BTC", "ETH"],
      transactionTypes: ["Transfer", "Payment", "Investment"],
      securityLevel: "high",
    },
    createdAt: "2024-01-20",
    status: "active",
  },
  "techcorp-demo": {
    clientId: "techcorp-demo",
    appName: "TechCorp Solutions",
    logoUrl: "/logos/techcorp-logo.png",
    approach: "Approach 1",
    primaryColor: "#10b981",
    secondaryColor: "#059669",
    features: {
      services: ["Consulting", "Development", "Support"],
      industries: ["Healthcare", "Finance", "Education"],
    },
    createdAt: "2024-02-01",
    status: "active",
  },
  "default-client": {
    clientId: "default-client",
    appName: "Demo App",
    logoUrl: "/logos/default-logo.png",
    approach: "Approach 1",
    primaryColor: "#3b82f6",
    secondaryColor: "#64748b",
    features: {
      defaultFeature: true,
    },
    createdAt: "2024-01-01",
    status: "active",
  },
};

/**
 * Hook para cargar la configuración de white label del cliente
 * @param {string} clientId - ID del cliente
 * @returns {Object} { config, isLoading, error }
 */
export const useAppConfig = (clientId) => {
  const [config, setConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadClientConfig = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Simular delay de API
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Buscar configuración del cliente
        const clientConfig =
          MOCK_CLIENT_CONFIGS[clientId] ||
          MOCK_CLIENT_CONFIGS["default-client"];

        if (!clientConfig) {
          throw new Error(`Cliente con ID '${clientId}' no encontrado`);
        }

        setConfig(clientConfig);
      } catch (err) {
        console.error("Error cargando configuración del cliente:", err);
        setError(err.message);
        // Fallback a configuración por defecto
        setConfig(MOCK_CLIENT_CONFIGS["default-client"]);
      } finally {
        setIsLoading(false);
      }
    };

    if (clientId) {
      loadClientConfig();
    } else {
      setIsLoading(false);
      setError("ClientId es requerido");
    }
  }, [clientId]);

  return {
    config,
    isLoading,
    error,
  };
};

/**
 * Hook para obtener todos los clientes disponibles
 * @returns {Object} { clients, isLoading }
 */
export const useClients = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadClients = async () => {
      try {
        setIsLoading(true);

        // Simular delay de API
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Convertir configuraciones a lista de clientes
        const clientsList = Object.values(MOCK_CLIENT_CONFIGS).map(
          (client) => ({
            ...client,
            demoUrl: `/demo/${client.clientId}`,
            adminUrl: `/demo/${client.clientId}/admin`,
          })
        );

        setClients(clientsList);
      } catch (err) {
        console.error("Error cargando clientes:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadClients();
  }, []);

  return {
    clients,
    isLoading,
  };
};

export default useAppConfig;
