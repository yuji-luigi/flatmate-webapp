import { Group, Burger, Box, Text, Badge } from "@mantine/core";
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
import { useCookieContext } from "../../../context/CookieContext";

export type JSONType = typeof links;

export function SystemAdminDashboardHeaderSearch() {
  const { isOpen, toggleBarOpen } = useLayoutContext();
  const { currentSpace } = useCookieContext();
  const { isMobile } = useCustomMQuery();
  return (
    <header className={`${classesM.header} app-bar`}>
      {isMobile && (
        <Group className={classesM.links}>
          <Burger className={classesM.burger} opened={isOpen} onClick={toggleBarOpen} size="sm" />
        </Group>
      )}
      {!isMobile && (
        <>
          <Group ml={5} gap={5} className={classesM.links}>
            <LogoBanner link="/" transparent />
            <Badge color="" size="xl">
              {currentSpace?.name}
            </Badge>
          </Group>
        </>
      )}
      <Box className={classesM.deskTopExNav}>
        <ColorSchemeToggle />
      </Box>
    </header>
  );
}
