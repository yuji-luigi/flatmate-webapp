import { Button, TextInput } from "@mantine/core";
import React, { useRef } from "react";
import { FrontendEntity } from "../../../../../types/redux/CrudSliceInterfaces";
import { SectionConfig } from "../../../../../types/data/json/sections-json";
import { useCustomModalContext } from "../../../../../context/modal-context/_ModalContext";
import { InviteModal } from "./InviteModal";

export const InviteButton = (props: { section: SectionConfig; entity: FrontendEntity }) => {
  const { entity, section } = props;
  const { openModal } = useCustomModalContext();
  const handleOpenModal = () => {
    openModal({
      title: section.createButton,
      type: "custom",
      centered: true,
      children: <InviteModal entity={entity} />,
    });
  };

  return <Button onClick={handleOpenModal}>{section.createButton}</Button>;
};
