import { Group, Burger, Box } from "@mantine/core";
// import { useDisclosure } from '@mantine/hooks';
import links from "../../../../json/navbar/headerLinks.json";
import useLayoutContext from "../../../../hooks/useLayoutContext";
import { ColorSchemeToggle } from "../../../components/color-schemeToggle/ColorSchemeToggle";
import { LogoBanner } from "../../../components/banner/LogoBanner";
// import { useCurrentSpaceContext } from '../../context/CurrentSpaceContext';

import { HeaderCreationModalWrapper } from "../../../components/modal/header-creation-modal/HeaderCreationModalWrapper";
import { TAB_LIST_CONFIG } from "../sections-in-tabs/adm-tabs/adm-tabList";
import { useCustomMQuery } from "../../../../hooks/useCustomMQuery";
import { TabList } from "../../../components/tab/TabList";
import classesM from "./AdministratorHeader.module.css";
import { HeaderNotificationButton } from "./notifications/HeaderNotificationButton";
import HeaderSpaceSelect from "../../../components/input/custom-inputs/HeaderSpaceSelect";

export type JSONType = typeof links;

export function AdministratorHeader() {
  const { isOpen, toggleBarOpen } = useLayoutContext();
  const { isMobile } = useCustomMQuery();

  return (
    <header className={classesM.header}>
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
      <TabList list={TAB_LIST_CONFIG} />
      {isMobile && (
        <Box className={classesM.deskTopExNav}>
          <HeaderNotificationButton />
        </Box>
      )}
      {!isMobile && (
        <Box className={classesM.deskTopExNav}>
          <HeaderNotificationButton />
          {/* <OrganizationSpaceSelect className={classesM.selectGroup} /> */}
          <HeaderSpaceSelect />
          <ColorSchemeToggle />
        </Box>
      )}
    </header>
  );
}
