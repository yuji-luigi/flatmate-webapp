import { ModalRoot } from '@mantine/core/lib/Modal/ModalRoot/ModalRoot';
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { Box } from '@mantine/core';
import {
  _ModalContextStates,
  CustomModalProps,
  OpenConfirmModalParams,
} from '../../types/modal/modal-context-type';

const defaultModalValues: CustomModalProps = {
  title: '',
  centered: false,
  children: <></>,
  sx: {
    confirm: {},
    cancel: {},
  },
  onCancel() {},
  onConfirm() {},
  labels: { confirm: '', cancel: '' },
  type: 'confirm',
  id: '',
};

export const _ModalContext = createContext<_ModalContextStates>({
  isOpenModal: false,
  toggleOpenModal() {},
  closeModal() {},
  openModal() {},
  openConfirmModal() {},
  modals: defaultModalValues,
});

const useStore = () => {
  const [isOpenModal, setIsModalOpen] = useState<boolean>(false);
  const [modals, setModals] = useState<CustomModalProps>(defaultModalValues);

  // Function to open a confirm modal
  const openConfirmModal = useCallback(
    (
      params: // ...otherProps
      OpenConfirmModalParams
    ) => {
      setIsModalOpen(true);
      // Generate a unique modal ID
      const modalId = Math.random().toString(36).substr(2, 9);

      const newModalValues: CustomModalProps = {
        id: modalId,
        centered: true,
        sx: {},
        labels: {},
        ...params,
      };

      // Add the modal to the modals array
      setModals(newModalValues);
      // setModals(modal);

      // Return the modal ID for future reference
      return modalId;
    },
    []
  );
  return {
    modals,
    openConfirmModal,
    isOpenModal,
    toggleOpenModal: () => setIsModalOpen(!isOpenModal),
    closeModal: () => setIsModalOpen(false),
    openModal: () => setIsModalOpen(true),
  };
};

export const _ModalContextProvider = ({ children }: { children: ReactNode }) => (
  <_ModalContext.Provider value={useStore()}>{children}</_ModalContext.Provider>
);

export const useCustomModalContext = () => useContext(_ModalContext);
