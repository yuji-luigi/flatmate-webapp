import { Menu, ActionIcon, Tooltip } from "@mantine/core";

import { useState } from "react";
import { Icons } from "../../../data/icons/icons";

import { FONT_SIZES } from "../../../lib/enums";
import { useSimpleDisclosureCtx } from "../../../../hooks/useSimpleDisclosureCtx";
import { HeaderCreationModal } from "./HeaderCreationModal";
import classes from "./HeaderCreationButton.module.css";
import useAuth from "../../../../hooks/useAuth";
import { sectionsJson } from "../../../json/section-config/sectionsConfig";
import { SectionConfig } from "../../../types/data/json/sections-json";
import { useLocale } from "../../../../hooks/useLocale";

export function HeaderCreationButton() {
  const { user } = useAuth();
  const { t } = useLocale();
  const { close, open, opened } = useSimpleDisclosureCtx();
  const [modalType, setModalType] = useState<"threads" | "maintenances" | null>(null);
  const [section, setSection] = useState<SectionConfig | null>(null);

  if (!user) return null;
  const handleOpenModal = (type: "threads" | "maintenances") => {
    const found = sectionsJson.dataTable[type];
    setSection(found);
    setModalType(type);
    open();
  };
  return (
    <>
      <Menu shadow="lg">
        <Menu.Target>
          <ActionIcon className={classes.icon} variant="gradient">
            <Icons.plus />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label style={{ textAlign: "center" }}>Create something</Menu.Label>
          <Menu.Item
            onClick={() => handleOpenModal("threads")}
            style={{ fontSize: FONT_SIZES.menuItems }}
            leftSection={<Icons.article size={FONT_SIZES.menuItems} />}
          >
            New post
          </Menu.Item>
          <Menu.Item
            style={{ fontSize: FONT_SIZES.menuItems }}
            onClick={() => handleOpenModal("maintenances")}
            leftSection={<Icons.maintenance size={FONT_SIZES.menuItems} />}
          >
            Add maintenance
          </Menu.Item>
          <Tooltip label={t("Coming soon")}>
            <Menu.Item
              style={{ fontSize: FONT_SIZES.menuItems, opacity: 0.5, cursor: "default" }}
              leftSection={<Icons.messageDots size={FONT_SIZES.menuItems} />}
            >
              Send message
            </Menu.Item>
          </Tooltip>
        </Menu.Dropdown>
      </Menu>
      <HeaderCreationModal modalType={modalType} section={section} />
    </>
  );
}
