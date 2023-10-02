import { createStyles, Header, Group, Burger, Box, ActionIcon } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@mantine/hooks';
import links from '../../../json/navbar/headerLinks.json';
import useLayoutContext from '../../../hooks/useLayoutContext';
import { ColorSchemeToggle } from '../../components/color-schemeToggle/ColorSchemeToggle';
import { LogoBanner } from '../../components/banner/LogoBanner';
// import { useCurrentSpaceContext } from '../../context/CurrentSpaceContext';
import { useCookieContext } from '../../context/CookieContext';

import OrganizationSpaceSelect from '../../components/select-custom/OrganizationSpaceSelect';
import { HeaderCreationModalWrapper } from './header-creation-modal/HeaderCreationModalWrapper';
import { TAB_LIST_CONFIG } from '../../sections/@dashboard/dashboard_top/sections-in-tabs/tabList';
import { useCustomMQuery } from '../../../hooks/useCustomMQuery';
import { TabList } from '../../components/tab/TabList';
import classesM from './DashboardHeaderSearch.module.css';
import { Icons } from '../../data/icons/icons';

const useStyles = createStyles((theme) => ({
  // header: {
  //   position: 'fixed',
  //   paddingLeft: theme.spacing.md,
  //   paddingRight: theme.spacing.md,
  // },
  header: {
    position: 'fixed',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    zIndex: 50,
    // justifyContent: 'flex-start',
    alignItems: 'center',
    // [theme.fn.smallerThan('md')]: {
    //   height: 120,
    // },
  },

  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    zIndex: 50,
    // justifyContent: 'flex-start',
    alignItems: 'center',
  },

  burger: {
    display: 'none',
    zIndex: 100,
    [theme.fn.smallerThan('md')]: {
      display: 'block',
    },
  },
  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  // header: {
  //   position: 'fixed',
  //   paddingLeft: theme.spacing.md,
  //   paddingRight: theme.spacing.md,
  // },

  // inner: {
  //   height: 56,
  //   display: 'grid',
  //   gridTemplateColumns: '1fr 1fr 1fr', // Three equal columns
  //   alignItems: 'center',
  //   zIndex: 50,
  // },

  // burger: {
  //   display: 'none',
  //   zIndex: 100,
  //   gridColumn: 1, // Place on the first column
  //   [theme.fn.smallerThan('md')]: {
  //     display: 'block',
  //   },
  // },

  // links: {
  //   gridColumn: 1, // Place on the first column
  //   [theme.fn.smallerThan('md')]: {
  //     display: 'none',
  //   },
  // },

  center: {
    gridColumn: 2, // Place in the middle column
    display: 'flex',
    justifyContent: 'center',
  },

  OrganizationSpaceSelect: {
    gridColumn: 3, // Place on the last column
  },

  ColorSchemeToggle: {
    gridColumn: 3, // Place on the last column
  },

  logo: {
    display: 'none',
    [theme.fn.largerThan('md')]: {
      display: 'block',
    },
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },
  spaceName: {
    maxWidth: 200,
    maxHeight: 56,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    cursor: 'pointer',
    // display: 'inline-block',
    // whiteSpace: 'nowrap',
  },

  link: {
    textDecoration: 'none',

    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    fontStyle: 'normal',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
}));

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
  const { classes } = useStyles();
  const { isOpen, toggleBarOpen } = useLayoutContext();
  const isMediaScreen = useMediaQuery('(max-width: 750px)');
  const { isMobile } = useCustomMQuery();

  // useEffect(() => {
  //   const organizationNameCookie = getCookie('organizationName');
  //   if (typeof organizationNameCookie === 'string') {
  //     setOrganizations([{ label: organizationNameCookie, value: currentOrganization || '' }]);
  //   }

  //   const spaceNameCookie = getCookie('spaceName');
  //   if (typeof spaceNameCookie === 'string') {
  //     const spaceId = currentSpace?._id || '';
  //     setSpaces([{ label: spaceNameCookie, value: spaceId }]);
  //   }
  // }, []);
  // const menuContent = isMobile ? (
  //   <Box className={classesM.mobileNavContainer}>
  //     <Group>
  //       <Burger className={classes.burger} opened={isOpen} onClick={toggleBarOpen} size="sm" />
  //       <TabList list={TAB_LIST_CONFIG} className={classesM.tabList} />
  //     </Group>
  //     <TabList list={TAB_LIST_CONFIG} className={classesM.tabList} />
  //   </Box>
  // ) : (
  //   <Box className={classesM.center}>
  //     <TabList list={TAB_LIST_CONFIG} className={classesM.tabList} />
  //   </Box>
  // );
  const menuHeight = /*  isMobile ? 120 : */ 56;
  return (
    <Header fixed className={classes.header} height={menuHeight}>
      {/* <div className={classes.inner}> */}
      <Burger className={classes.burger} opened={isOpen} onClick={toggleBarOpen} size="sm" />
      {!isMobile && (
        <>
          <Group ml={5} spacing={5} className={classes.links}>
            <LogoBanner link="/" transparent />
          </Group>
        </>
      )}
      <Box className={classesM.center}>
        <TabList list={TAB_LIST_CONFIG} className={classesM.tabList} />
      </Box>
      {isMobile && (
        <ActionIcon>
          <Icons.bell />
        </ActionIcon>
      )}
      <Group>
        <HeaderCreationModalWrapper />

        {!isMobile && (
          <>
            <OrganizationSpaceSelect /* className={classes.OrganizationSpaceSelect} */ />
            <ColorSchemeToggle size="lg" />
          </>
        )}
      </Group>
      {/* </div> */}
    </Header>
  );
  // return (
  //   <Header fixed height={56} className={classes.header}>
  //     <div className={classes.inner}>
  //       <Group>
  //         <Burger className={classes.burger} opened={isOpen} onClick={toggleBarOpen} size="sm" />
  //         <LogoBanner link="/" transparent />
  //         <Group ml={5} spacing={5} className={classes.links}>
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
