import { Group, Burger, Box } from "@mantine/core";
import links from "../../../json/navbar/headerLinks.json";
import useLayoutContext from "../../../../hooks/useLayoutContext";
import { ColorSchemeToggle } from "../../../components/color-schemeToggle/ColorSchemeToggle";
import { LogoBanner } from "../../../components/banner/LogoBanner";

import { HeaderCreationModalWrapper } from "../../../components/modal/header-creation-modal/HeaderCreationModalWrapper";
import { useCustomMQuery } from "../../../../hooks/useCustomMQuery";
import classesM from "./SystemAdminDashboardHeaderSearch.module.css";
import { HeaderNotificationButton } from "./notifications/HeaderNotificationButton";
import HeaderSpaceSelect from "../../../components/input/custom-inputs/HeaderSpaceSelect";
import useAuth from "../../../../hooks/useAuth";

export type JSONType = typeof links;

export function SystemAdminDashboardHeaderSearch() {
  const { isOpen, toggleBarOpen } = useLayoutContext();
  const { isMobile } = useCustomMQuery();
  return (
    <header className={`${classesM.header} app-bar`}>
      {isMobile && (
        <Group className={classesM.links}>
          <Burger className={classesM.burger} opened={isOpen} onClick={toggleBarOpen} size="sm" />
          <HeaderCreationModalWrapper />
        </Group>
      )}
      {!isMobile && (
        <>
          <Group ml={5} gap={5} className={classesM.links}>
            <LogoBanner link="/" transparent />
            <HeaderCreationModalWrapper />
          </Group>
        </>
      )}
      {isMobile && (
        <Box className={classesM.deskTopExNav}>
          <HeaderNotificationButton />
        </Box>
      )}
      {!isMobile && (
        <Box className={classesM.deskTopExNav}>
          <ColorSchemeToggle />
        </Box>
      )}
    </header>
  );
}
