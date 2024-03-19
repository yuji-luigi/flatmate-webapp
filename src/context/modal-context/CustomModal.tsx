import React from "react";
import { Box, Button, Modal, Stack } from "@mantine/core";
import { useCustomModalContext } from "./_ModalContext";
import { CustomModalData } from "../../types/modal/modal-context-type";

type CustomModalProps = {
  modalData: CustomModalData;
};

const CustomModal = (props: CustomModalProps) => {
  const { modalData } = props;
  const { isOpenModal: opened, closeModal: close } = useCustomModalContext();
  if (!opened) return null;

  return <>{modalData.children}</>;
};

export default CustomModal;
