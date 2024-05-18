import { Button, TextInput } from "@mantine/core";
import React, { useRef } from "react";
import { FrontendEntity } from "../../../../../types/redux/CrudSliceInterfaces";
import { SectionConfig } from "../../../../../types/data/json/sections-json";
import { useCustomModalContext } from "../../../../../context/modal-context/_ModalContext";
import { InviteModal } from "./InviteModal";
import { useLocale } from "../../../../../../hooks/useLocale";
import { UserType } from "../../../../../lib/enums";

export const InviteButton = (props: { label: string; entity: UserType; className?: string }) => {
  const { entity, label, className } = props;
  const { openModal } = useCustomModalContext();
  const { t } = useLocale();
  const handleOpenModal = () => {
    openModal({
      // title: t(section.createButton),
      type: "headless",
      centered: true,
      children: <InviteModal entity={entity} />,
    });
  };

  return (
    <Button className={className} onClick={handleOpenModal}>
      {label}
    </Button>
  );
};
