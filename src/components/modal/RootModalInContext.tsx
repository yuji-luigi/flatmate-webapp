import { Modal, Box } from '@mantine/core';

import { CrudModal } from '../../context/modal-context/CrudModal';
import CustomModal from '../../context/modal-context/CustomModal';
import { useCustomModalContext } from '../../context/modal-context/_ModalContext';
import { RegularModal } from '../../context/modal-context/RegularModal';

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
      {...modalData}
      opened={opened}
      withinPortal={withinPortal}
      centered={modalData.centered}
      onClose={close}
      title={modalData.title}
      classNames={{
        title: 'modalTitle',
        header: 'modalHeader',
        body: 'modalBody',
      }}
    >
      <Box>{modalContent}</Box>
    </Modal>
  );
}
