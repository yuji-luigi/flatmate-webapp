import { Button, TextInput } from "@mantine/core";
import React, { useRef } from "react";
import { FrontendEntity } from "../../../../../types/redux/CrudSliceInterfaces";
import { SectionConfig } from "../../../../../types/data/json/sections-json";
import { useCustomModalContext } from "../../../../../context/modal-context/_ModalContext";
import { InviteModal } from "./InviteModal";
import { useLocale } from "../../../../../../hooks/useLocale";

export const InviteButton = (props: { section: SectionConfig; entity: FrontendEntity }) => {
  const { entity, section } = props;
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

  return <Button onClick={handleOpenModal}>{section.createButton}</Button>;
};
