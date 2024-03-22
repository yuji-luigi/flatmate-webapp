import React from "react";
import { Modal } from "@mantine/core";
import HeaderModalForm from "./HeaderModalForm";
import { useSimpleDisclosureCtx } from "../../../../hooks/useSimpleDisclosureCtx";
import { SectionDataJsonWithRoles } from "../../../types/general/data/data-table/sectionsJson-type";

export const HeaderCreationModal = ({
  modalType,
  section,
}: {
  section?: SectionDataJsonWithRoles | null;
  modalType?: "threads" | "maintenances" | null;
}) => {
  const { close, opened } = useSimpleDisclosureCtx();

  if (!modalType || !section || !opened) return null;

  return (
    <Modal
      opened={opened}
      onClose={close}
      size="lg"
      title={section?.createButton}
      classNames={{
        title: "modalTitle",
        header: "modalHeader",
        body: "modalBody",
      }}
    >
      <HeaderModalForm entity={modalType} />
    </Modal>
  );
};
