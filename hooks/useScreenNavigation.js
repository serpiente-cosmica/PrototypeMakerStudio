import { useState, useCallback } from "react";

/**
 * Hook para manejar la navegación entre pantallas en el demo
 * @param {string} initialScreen - Pantalla inicial
 * @param {Array} availableScreens - Lista de pantallas disponibles
 * @returns {Object} Objeto con funciones de navegación
 */
export const useScreenNavigation = (initialScreen = 'login_generic_logo', availableScreens = []) => {
  const [currentScreen, setCurrentScreen] = useState(initialScreen);
  const [screenHistory, setScreenHistory] = useState([initialScreen]);

  const navigateToScreen = useCallback((screenId) => {
    // Verificar que la pantalla existe en la lista disponible
    if (availableScreens.includes(screenId)) {
      setCurrentScreen(screenId);
      setScreenHistory(prev => [...prev, screenId]);
    } else {
      console.warn(`Screen ${screenId} not available in current approach`);
    }
  }, [availableScreens]);

  const goBack = useCallback(() => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop(); // Remover la pantalla actual
      const previousScreen = newHistory[newHistory.length - 1];
      setCurrentScreen(previousScreen);
      setScreenHistory(newHistory);
    }
  }, [screenHistory]);

  const resetNavigation = useCallback(() => {
    setCurrentScreen(initialScreen);
    setScreenHistory([initialScreen]);
  }, [initialScreen]);

  return {
    currentScreen,
    screenHistory,
    navigateToScreen,
    goBack,
    resetNavigation,
    canGoBack: screenHistory.length > 1
  };
};