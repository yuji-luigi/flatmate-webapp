import { Modal } from "@mantine/core";
import React, { ReactNode } from "react";
import { useCustomModalContext } from "../../../context/modal-context/_ModalContext";

export const HeadlessModal = ({ children }: { children: ReactNode }) => {
  const { modalData, isOpenModal: opened, closeModal: close } = useCustomModalContext();
  return (
    <Modal {...modalData} opened={opened} onClose={close}>
      {children && children}
    </Modal>
  );
};
