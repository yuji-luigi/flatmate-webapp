import { Group, Burger, Box } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/router';
import links from '../../../../json/navbar/headerLinks.json';
import useLayoutContext from '../../../../hooks/useLayoutContext';
import { ColorSchemeToggle } from '../../../components/color-schemeToggle/ColorSchemeToggle';
import { LogoBanner } from '../../../components/banner/LogoBanner';
// import { useCurrentSpaceContext } from '../../context/CurrentSpaceContext';

import OrganizationSpaceSelect from '../../../components/select-custom/OrganizationSpaceSelect';
import { HeaderCreationModalWrapper } from '../../../components/modal/header-creation-modal/HeaderCreationModalWrapper';
import { TAB_LIST_CONFIG } from '../../../sections/dashboard/dashboard_top/sections-in-tabs/tabList';
import { useCustomMQuery } from '../../../../hooks/useCustomMQuery';
import { TabList } from '../../../components/tab/TabList';
import classesM from './DashboardHeaderSearch.module.css';
import { HeaderNotificationButton } from './notifications/HeaderNotificationButton';

export type JSONType = typeof links;

export function DashboardHeaderSearch() {
  // const [opened, { toggle }] = useDisclosure(false);
  // const [organizations, setOrganizations] = useState<SelectItem[] | []>([]);
  // const [spaces, setSpaces] = useState<SelectItem[] | []>([]);
  const router = useRouter();
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
      <TabList />
      {isMobile && (
        <Box className={classesM.deskTopExNav}>
          <HeaderNotificationButton />
        </Box>
      )}
      {!isMobile && (
        <Box className={classesM.deskTopExNav}>
          <HeaderNotificationButton />
          <OrganizationSpaceSelect className={classesM.selectGroup} />
          <ColorSchemeToggle />
        </Box>
      )}
    </header>
  );
}
