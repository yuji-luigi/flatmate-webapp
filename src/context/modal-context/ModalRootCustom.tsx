import { Modal, Box } from '@mantine/core';

import { CrudModal } from './CrudModal';
import CustomModal from './CustomModal';
import { useCustomModalContext } from './_ModalContext';
import { RegularModal } from './RegularModal';
import classes from './CrudModal.module.css';

export function ModalRootCustom() {
  const { isOpenModal: opened, closeModal: close, modalData } = useCustomModalContext();
  if (!opened) return null;

  let modalContent;

  switch (modalData.type) {
    case 'custom':
      modalContent = <CustomModal modalData={modalData} />;
      break;
    case 'crud':
      modalContent = <CrudModal modalData={modalData} />;
      break;
    default:
      modalContent = <RegularModal modalData={modalData} />;
  }
  const withinPortal = modalData.withinPortal !== false;

  return (
    <Modal
      opened={opened}
      withinPortal={withinPortal}
      centered={modalData.centered}
      onClose={close}
      title={modalData.title}
    >
      <Box className={classes.container}>{modalContent}</Box>
    </Modal>
  );
}
