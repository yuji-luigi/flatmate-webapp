import { Modal, Box, LoadingOverlay } from "@mantine/core";

import { CrudModal } from "../../context/modal-context/CrudModal";
import CustomModal from "../../context/modal-context/CustomModal";
import { useCustomModalContext } from "../../context/modal-context/_ModalContext";
import { RegularModal } from "../../context/modal-context/RegularModal";

export function ModalRootCustom() {
  const { isOpenModal: opened, closeModal: close, modalData } = useCustomModalContext();
  if (!opened) return null;

  let modalContent;

  switch (modalData.type) {
    case "headless":
      return modalData.children;
    case "custom":
      modalContent = <CustomModal modalData={modalData} />;
      break;
    case "crud":
      modalContent = <CrudModal modalData={modalData} />;
      break;
    case "loading":
      return <LoadingModal />;
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
      size={modalData.size || "lg"}
      title={modalData.title}
      classNames={{
        // content: "modalContent",
        // root: "modalRoot",
        title: "modalTitle",
        header: "modalHeader",
        body: "modalBody",
      }}
    >
      <Box>{modalContent}</Box>
    </Modal>
  );
}

function LoadingModal() {
  const { isOpenModal: opened, closeModal: close, modalData } = useCustomModalContext();
  return (
    <Modal
      fullScreen
      opened={opened}
      withinPortal={modalData.withinPortal}
      centered={modalData.centered}
      onClose={close}
      onClick={close}
      styles={{
        root: { background: "transparent" },
        body: { background: "transparent" },
        content: { background: "transparent" },
        header: { background: "transparent" },
      }}
    >
      <LoadingOverlay
        styles={{
          overlay: { background: "transparent" },
        }}
        visible
      />
    </Modal>
  );
}
