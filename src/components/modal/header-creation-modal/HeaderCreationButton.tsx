import { Menu, ActionIcon } from "@mantine/core";

import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { Icons } from "../../../data/icons/icons";
import { allSectionArrayWithRoles, navConfigs } from "../../../json/nav-config";

import { FONT_SIZES } from "../../../lib/enums";
import { useCrudSelectors, useCrudSliceStore } from "../../../redux/features/crud/crudSlice";
import { SectionDataJsonWithRoles } from "../../../types/general/data/data-table/sectionsJson-type";
import { useSimpleDisclosureCtx } from "../../../../hooks/useSimpleDisclosureCtx";
import { HeaderCreationModal } from "./HeaderCreationModal";
import classes from "./HeaderCreationButton.module.css";
import useAuth from "../../../../hooks/useAuth";
import useRouterWithCustomQuery from "../../../hooks/useRouterWithCustomQuery";

export function HeaderCreationButton() {
  const { user } = useAuth();
  const { close, open, opened } = useSimpleDisclosureCtx();
  const [modalType, setModalType] = useState<"threads" | "maintenances" | null>(null);
  const [section, setSection] = useState<SectionDataJsonWithRoles | null>(null);
  const {
    query: { entity },
  } = useRouterWithCustomQuery();
  const { setSubmitting } = useCrudSliceStore();
  const { submitting } = useCrudSelectors(entity!);
  if (!user) return null;
  const handleOpenModal = (type: "threads" | "maintenances") => {
    const found = navConfigs[user.loggedAs].flatMap((json) =>
      json.contents.find((content) => content.sectionKey === type)
    );
    setSection();
    setModalType(type);
    open();
  };
  const handleClose = () => {
    close();
    if (submitting) {
      notifications.hide("submit");
      notifications.show({
        title: "Upload is cancelled",
        message: "Upload cancelled because you closed a popup",
      });
    }
    setSubmitting(false);
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
          <Menu.Item
            style={{ fontSize: FONT_SIZES.menuItems }}
            leftSection={<Icons.messageDots size={FONT_SIZES.menuItems} />}
          >
            Send message
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <HeaderCreationModal modalType={modalType} section={section} />
    </>
  );
}
