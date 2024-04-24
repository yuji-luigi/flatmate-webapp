import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { set } from "nprogress";
import { _ModalContextStates, ModalDataTypes } from "../../types/modal/modal-context-type";

const defaultModalValues: ModalDataTypes = {
  title: "",
  opened: false,
  centered: true,
  children: <></>,
  style: {
    confirm: {},
    cancel: {},
  },
  onCancel() {},
  onConfirm() {},
  labels: { confirm: "", cancel: "" },
  type: "confirm",
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
  const [modalData, setModalData] = useState<ModalDataTypes>(defaultModalValues);

  // Function to open a confirm modal
  const openConfirmModal = useCallback(
    (
      params: // ...otherProps
      ModalDataTypes
    ) => {
      const modalId = handleSetModalProps(params);
      setIsModalOpen(true);
      return modalId;
    },
    []
  );
  const handleSetModalProps = useCallback(
    (
      params: // ...otherProps
      ModalDataTypes
    ) => {
      const modalId = Math.random().toString(36).substr(2, 9);
      const newModalValues: ModalDataTypes = {
        centered: true,
        ...params,
      };

      setModalData(newModalValues);

      return modalId;
    },
    []
  );

  const handleOpenModal = (modalProps?: ModalDataTypes) => {
    if (modalProps) {
      setModalData(modalProps);
    }
    setIsModalOpen(true);
  };

  return {
    modalData,
    openConfirmModal,
    isOpenModal,
    toggleOpenModal: () => setIsModalOpen(!isOpenModal),
    closeModal: () => setIsModalOpen(false),
    openModal: handleOpenModal,
  };
};

export const _ModalContextProvider = ({ children }: { children: ReactNode }) => (
  <_ModalContext.Provider value={useStore()}>{children}</_ModalContext.Provider>
);

export const useCustomModalContext = () => useContext(_ModalContext);
