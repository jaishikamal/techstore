import { useState, useCallback } from 'react';

interface ModalConfig {
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

interface UseModalReturn {
  modalConfig: ModalConfig;
  openModal: (config: Omit<ModalConfig, 'isOpen'>) => void;
  closeModal: () => void;
  confirmModal: () => void;
  cancelModal: () => void;
}

const defaultConfig: ModalConfig = {
  isOpen: false,
  title: '',
  content: null,
  onConfirm: undefined,
  onCancel: undefined,
  confirmText: 'Confirm',
  cancelText: 'Cancel',
};

export function useModal(): UseModalReturn {
  const [modalConfig, setModalConfig] = useState<ModalConfig>(defaultConfig);

  const openModal = useCallback(
    (config: Omit<ModalConfig, 'isOpen'>) => {
      setModalConfig({ ...defaultConfig, ...config, isOpen: true });
    },
    []
  );

  const closeModal = useCallback(() => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const confirmModal = useCallback(() => {
    if (modalConfig.onConfirm) {
      modalConfig.onConfirm();
    }
    closeModal();
  }, [modalConfig, closeModal]);

  const cancelModal = useCallback(() => {
    if (modalConfig.onCancel) {
      modalConfig.onCancel();
    }
    closeModal();
  }, [modalConfig, closeModal]);

  return {
    modalConfig,
    openModal,
    closeModal,
    confirmModal,
    cancelModal,
  };
}

// Example usage:
// const { modalConfig, openModal, closeModal, confirmModal, cancelModal } = useModal();
//
// // Open a confirmation modal
// openModal({
//   title: 'Delete Item',
//   content: 'Are you sure you want to delete this item?',
//   onConfirm: () => {
//     // Handle confirmation
//     deleteItem(itemId);
//   },
//   confirmText: 'Delete',
//   cancelText: 'Cancel',
// });
//
// // Open an info modal
// openModal({
//   title: 'Information',
//   content: 'Operation completed successfully',
//   confirmText: 'OK',
//   onConfirm: closeModal,
// }); 