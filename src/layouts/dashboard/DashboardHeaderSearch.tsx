import { createStyles, Header, Group, Burger, Box } from '@mantine/core';
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

const useStyles = createStyles((theme) => ({
  header: {
    position: 'fixed',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
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
  logo: {
    display: 'none',
    [theme.fn.largerThan('md')]: {
      display: 'block',
    },
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
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
  return (
    <Header fixed height={56} className={classes.header}>
      <div className={classes.inner}>
        <Burger className={classes.burger} opened={isOpen} onClick={toggleBarOpen} size="sm" />
        {!isMobile && (
          <Group ml={5} spacing={5} className={classes.links}>
            <LogoBanner link="/" transparent />
          </Group>
        )}
        <Box className={classesM.center}>
          <TabList list={TAB_LIST_CONFIG} className={classesM.tabList} />
        </Box>
        <Group>
          <HeaderCreationModalWrapper />

          {!isMobile && (
            <>
              <OrganizationSpaceSelect />
              <ColorSchemeToggle size="lg" />
            </>
          )}
        </Group>
      </div>
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
