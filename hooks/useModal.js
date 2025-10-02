import { useState } from "react";

/**
 * Hook para manejar modales de confirmación, éxito y error
 * @returns {Object} { showModal, hideModal, modalProps }
 */
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState({});

  const showModal = (props) => {
    setModalProps(props);
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
    // Limpiar props después de la animación
    setTimeout(() => setModalProps({}), 300);
  };

  const showSuccess = (message, title = "Success") => {
    showModal({
      title,
      message,
      type: "success",
      onClose: hideModal,
    });
  };

  const showError = (message, title = "Error") => {
    showModal({
      title,
      message,
      type: "error",
      onClose: hideModal,
    });
  };

  const showWarning = (message, title = "Warning") => {
    showModal({
      title,
      message,
      type: "warning",
      onClose: hideModal,
    });
  };

  const showInfo = (message, title = "Information") => {
    showModal({
      title,
      message,
      type: "info",
      onClose: hideModal,
    });
  };

  const showConfirm = (message, onConfirm, title = "Confirm") => {
    showModal({
      title,
      message,
      type: "warning",
      onConfirm: () => {
        onConfirm();
        hideModal();
      },
      onClose: hideModal,
      confirmText: "Yes",
      cancelText: "No",
    });
  };

  return {
    isOpen,
    modalProps,
    showModal,
    hideModal,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm,
  };
};
