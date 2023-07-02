import React from 'react';
import { use_ModalContext } from './_ModalContext';
import { Box, Button, Modal, Stack } from '@mantine/core';

const CustomModal = () => {
  const { modals, isOpenModal: opened, closeModal: close } = use_ModalContext();
  if (!opened) return null;
  if (modals.type !== 'custom') return <>something went wrong</>;

  return (
    <Modal opened={opened} centered={modals.centered} onClose={close} title={modals.title}>
      {modals.children}
    </Modal>
  );
};

export default CustomModal;
