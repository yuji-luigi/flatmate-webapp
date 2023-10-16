import { Group, Burger, Box, ActionIcon } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@mantine/hooks';
import links from '../../../../json/navbar/headerLinks.json';
import useLayoutContext from '../../../../hooks/useLayoutContext';
import { ColorSchemeToggle } from '../../../components/color-schemeToggle/ColorSchemeToggle';
import { LogoBanner } from '../../../components/banner/LogoBanner';
// import { useCurrentSpaceContext } from '../../context/CurrentSpaceContext';
import { useCookieContext } from '../../../context/CookieContext';

import OrganizationSpaceSelect from '../../../components/select-custom/OrganizationSpaceSelect';
import { HeaderCreationModalWrapper } from '../../../components/modal/header-creation-modal/HeaderCreationModalWrapper';
import { TAB_LIST_CONFIG } from '../../../sections/@dashboard/dashboard_top/sections-in-tabs/tabList';
import { useCustomMQuery } from '../../../../hooks/useCustomMQuery';
import { TabList } from '../../../components/tab/TabList';
import classesM from './DashboardHeaderSearch.module.css';
import { Icons } from '../../../data/icons/icons';
import { HeaderNotificationButton } from './notifications/HeaderNotificationButton';

// const useStyles = createStyles((theme) => ({
//   // header: {
//   //   position: fixed,
//   //   paddingLeft: var(--mantine-spacing-md),
//   //   padding-right: var(--mantine-spacing-md),
//   // },
//   header: {
//     position: fixed,
//     paddingLeft: var(--mantine-spacing-md),
//     padding-right: var(--mantine-spacing-md),
//     height: 56,
//     display: 'flex',
//     justifyContent: 'space-between',
//     zIndex: 50,
//     // justifyContent: 'flex-start',
//     align-items: 'center',
//     //  @media (max-width: $mantine-breakpoint-md): {
//     //   height: 120,
//     // },
//   },

//   inner: {
//     height: 56,
//     display: 'flex',
//     justifyContent: 'space-between',
//     zIndex: 50,
//     // justifyContent: 'flex-start',
//     align-items: 'center',
//   },

//   burger: {
//     display: 'none',
//     zIndex: 100,
//      @media (max-width: $mantine-breakpoint-md): {
//       display: 'block',
//     },
//   },
//   links: {
//      @media (max-width: $mantine-breakpoint-md): {
//       display: 'none',
//     },
//   },

// header: {
//   position: fixed,
//   paddingLeft: var(--mantine-spacing-md),
//   padding-right: var(--mantine-spacing-md),
// },

// inner: {
//   height: 56,
//   display: 'grid',
//   gridTemplateColumns: '1fr 1fr 1fr', // Three equal columns
//   align-items: 'center',
//   zIndex: 50,
// },

// burger: {
//   display: 'none',
//   zIndex: 100,
//   gridColumn: 1, // Place on the first column
//    @media (max-width: $mantine-breakpoint-md): {
//     display: 'block',
//   },
// },

// links: {
//   gridColumn: 1, // Place on the first column
//    @media (max-width: $mantine-breakpoint-md): {
//     display: 'none',
//   },
// },

//   center: {
//     gridColumn: 2, // Place in the middle column
//     display: 'flex',
//     justifyContent: 'center',
//   },

//   OrganizationSpaceSelect: {
//     gridColumn: 3, // Place on the last column
//   },

//   ColorSchemeToggle: {
//     gridColumn: 3, // Place on the last column
//   },

//   logo: {
//     display: 'none',
//     @media (min-width: $mantine-breakpoint-md) {
//       display: 'block',
//     },
//   },

//   search: {
//     [theme.fn.smallerThan('xs')]: {
//       display: 'none',
//     },
//   },
//   spaceName: {
//     max-width: 200,
//     maxHeight: 56,
//     overflow: 'hidden',
//     textOverflow: 'ellipsis',
//     cursor: 'pointer',
//     // display: 'inline-block',
//     // whiteSpace: 'nowrap',
//   },

//   link: {
//     textDecoration: 'none',

//     display: 'block',
//     lineHeight: 1,
//     padding: '8px 12px',
//     border-radius: var(--mantine-radius-sm),
//     color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
//     fontSize: theme.fontSizes.sm,
//     fontWeight: 500,
//     fontStyle: 'normal',

//     '&:hover': {
//       background-color: light-dark(var(--mantine-color-gray-6), var(--mantine-color-dark-0)),
//     },
//   },
// }));

// interface DashboardHeaderSearchProps {
//     links: { link: string; label: string }[];
// }
export type JSONType = typeof links;

export function DashboardHeaderSearch() {
  // const [opened, { toggle }] = useDisclosure(false);
  // const [organizations, setOrganizations] = useState<SelectItem[] | []>([]);
  // const [spaces, setSpaces] = useState<SelectItem[] | []>([]);
  const router = useRouter();
  const { currentSpace, currentOrganization } = useCookieContext();
  const { isOpen, toggleBarOpen } = useLayoutContext();
  const isMediaScreen = useMediaQuery('(max-width: 750px)');
  const { isMobile } = useCustomMQuery();

  const menuHeight = /*  isMobile ? 120 : */ 56;
  return (
    <header className={classesM.header}>
      {/* <div className={classesM.inner}> */}
      {isMobile && (
        <Group>
          <Burger className={classesM.burger} opened={isOpen} onClick={toggleBarOpen} size="sm" />
          <HeaderCreationModalWrapper />
        </Group>
      )}
      {!isMobile && (
        <>
          <Group ml={5} gap={5} className={classesM.links}>
            <LogoBanner link="/" transparent />
          </Group>
        </>
      )}
      <Box className={classesM.center}>
        <TabList list={TAB_LIST_CONFIG} className={classesM.tabList} />
      </Box>
      {isMobile && <HeaderNotificationButton />}
      {!isMobile && (
        <Group>
          <>
            <HeaderNotificationButton />
            <OrganizationSpaceSelect /* className={classesM.OrganizationSpaceSelect} */ />
            <ColorSchemeToggle /* size="lg" */ />
          </>
        </Group>
      )}
      {/* </div> */}
    </header>
  );
  // return (
  //   <Header fixed height={56} className={classesM.header}>
  //     <div className={classesM.inner}>
  //       <Group>
  //         <Burger className={classesM.burger} opened={isOpen} onClick={toggleBarOpen} size="sm" />
  //         <LogoBanner link="/" transparent />
  //         <Group ml={5} spacing={5} className={classesM.links}>
  //           {items}
  //         </Group>
  //         <HeaderCreationModalWrapper />
  //         {/* <HeaderCreationModal /> */}
  //       </Group>
  //       <Group>
  //         {!isMediaScreen && (
  //           <>
  //             <OrganizationSpaceSelect />
  //             <ColorSchemeToggle size="lg" />
  //           </>
  //         )}
  //       </Group>
  //     </div>
  //   </Header>
  // );
}
