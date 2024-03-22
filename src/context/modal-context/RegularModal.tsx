import { Modal, Stack, Box, Button, LoadingOverlay } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import React, { useState } from "react";
import { constructErrorNotificationData } from "../../data/showNofification/notificationObjects";
import { BaseModalData, RegularModalParams } from "../../types/modal/modal-context-type";
import { useCustomModalContext } from "./_ModalContext";

type RegularModalProps = {
  modalData: RegularModalParams;
};
export const RegularModal = (props: RegularModalProps) => {
  const { modalData } = props;
  const { isOpenModal: opened, closeModal: close } = useCustomModalContext();

  const isMobile = useMediaQuery("(max-width: 600px)");
  const isAlert = modalData.type === "alert";
  const [submitting, setSubmitting] = useState(false);
  const handleCancel = () => {
    modalData.onCancel?.();
    close();
  };
  const handleConfirm = async (data: any) => {
    try {
      setSubmitting(true);
      await modalData.onConfirm(data);
      close();
    } catch (error: any) {
      showNotification(constructErrorNotificationData(error.message || error));
    } finally {
      setSubmitting(false);
    }
  };
  const confirmStyle = modalData.style?.confirm ? modalData.style.confirm : {};
  return (
    <>
      {modalData.children}
      <Stack>
        <Box
          display="flex"
          style={{ flexDirection: isMobile ? "column" : "row", gap: 8, justifyContent: "end" }}
        >
          <Button variant="outline" style={modalData.style?.cancel} onClick={handleCancel}>
            {modalData.labels?.cancel || "Cancel"}
          </Button>
          <Button
            style={{ backgroundColor: isAlert ? "red" : "", ...confirmStyle }}
            onClick={handleConfirm}
          >
            {modalData.labels?.confirm || "Confirm"}
          </Button>
        </Box>
      </Stack>
      {submitting && <LoadingOverlay visible />}
    </>
  );
};
