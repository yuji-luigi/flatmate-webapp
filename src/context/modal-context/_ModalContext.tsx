import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { _ModalContextStates, ModalDataTypes } from '../../types/modal/modal-context-type';

const defaultModalValues: ModalDataTypes = {
  title: '',
  opened: false,
  centered: true,
  children: <></>,
  style: {
    confirm: {},
    cancel: {},
  },
  onCancel() {},
  onConfirm() {},
  labels: { confirm: '', cancel: '' },
  type: 'confirm',
};

export const _ModalContext = createContext<_ModalContextStates>({
  isOpenModal: false,
  toggleOpenModal() {},
  closeModal() {},
  openModal() {},
  openConfirmModal() {},
  modalData: defaultModalValues,
});

const useStore = () => {
  const [isOpenModal, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModals] = useState<ModalDataTypes>(defaultModalValues);

  // Function to open a confirm modal
  const openConfirmModal = useCallback(
    (
      params: // ...otherProps
      ModalDataTypes
    ) => {
      setIsModalOpen(true);
      // Generate a unique modal ID
      const modalId = Math.random().toString(36).substr(2, 9);

      const newModalValues: ModalDataTypes = {
        // id: modalId,
        centered: true,
        // style: {},
        // labels: {},
        ...params,
      };

      // Add the modal to the modalData array
      setModals(newModalValues);
      // setModals(modal);

      // Return the modal ID for future reference
      return modalId;
    },
    []
  );
  return {
    modalData,
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
