import { useState, useEffect } from "react";
import { useAppConfig } from "./useAppConfig";
import { getScreenComponent, hasScreenComponent } from "../utils/screenMapper";

/**
 * Hook para manejar la navegación entre pantallas de un approach
 * @param {string} clientId - ID del cliente
 * @returns {Object} { currentScreen, currentScreenComponent, isLoading, error, nextScreen, previousScreen }
 */
export const useScreenNavigation = (clientId) => {
  const {
    config,
    isLoading: configLoading,
    error: configError,
  } = useAppConfig(clientId);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [screens, setScreens] = useState([]);

  useEffect(() => {
    if (config?.screen_list_json) {
      try {
        // Parsear el JSON de pantallas del approach
        const screenList =
          typeof config.screen_list_json === "string"
            ? JSON.parse(config.screen_list_json)
            : config.screen_list_json;

        setScreens(screenList);
        setCurrentScreenIndex(0); // Resetear al primer screen
      } catch (error) {
        console.error("Error parsing screen_list_json:", error);
        setScreens([]);
      }
    }
  }, [config?.screen_list_json]);

  const currentScreen = screens[currentScreenIndex];
  const currentScreenComponent = currentScreen
    ? getScreenComponent(currentScreen.id)
    : null;

  const nextScreen = () => {
    if (currentScreenIndex < screens.length - 1) {
      setCurrentScreenIndex(currentScreenIndex + 1);
    }
  };

  const previousScreen = () => {
    if (currentScreenIndex > 0) {
      setCurrentScreenIndex(currentScreenIndex - 1);
    }
  };

  const goToScreen = (index) => {
    if (index >= 0 && index < screens.length) {
      setCurrentScreenIndex(index);
    }
  };

  const goToScreenById = (screenId) => {
    const index = screens.findIndex((screen) => screen.id === screenId);
    if (index !== -1) {
      setCurrentScreenIndex(index);
    }
  };

  return {
    // Estado actual
    currentScreen,
    currentScreenComponent,
    currentScreenIndex,
    screens,

    // Estados de carga
    isLoading: configLoading,
    error: configError,

    // Navegación
    nextScreen,
    previousScreen,
    goToScreen,
    goToScreenById,

    // Información de navegación
    hasNextScreen: currentScreenIndex < screens.length - 1,
    hasPreviousScreen: currentScreenIndex > 0,
    totalScreens: screens.length,

    // Verificación de componente
    hasCurrentScreenComponent: currentScreenComponent !== null,
    screenExists: currentScreen ? hasScreenComponent(currentScreen.id) : false,
  };
};
