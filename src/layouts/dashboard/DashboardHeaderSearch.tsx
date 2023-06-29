import { createStyles, Header, Group, Burger, Select, SelectItem } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import links from '../../../json/navbar/headerLinks.json';
import useLayoutContext from '../../../hooks/useLayoutContext';
import { ColorSchemeToggle } from '../../components/color-schemeToggle/ColorSchemeToggle';
import { LogoBanner } from '../../components/banner/LogoBanner';
import { Icons } from '../../data/icons';
import { HeaderCreationModal } from './header-creation-modal/HeaderCreationModal';
import useAuth from '../../../hooks/useAuth';
import { PATH_DASHBOARD } from '../../path/page-paths';
// import { useCurrentSpaceContext } from '../../context/CurrentSpaceContext';
import { useCookieContext } from '../../context/CookieContext';
import { lowerFirst, useMediaQuery } from '@mantine/hooks';
import axiosInstance from '../../utils/axios-instance';
import { useEffect, useState } from 'react';
import { PATH_API } from '../../path/api-routes';
import { convertToSelectItems } from '../../utils/helper-functions';
import { getCookies, getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';
import { kMaxLength } from 'buffer';
import OrganizationSpaceSelect from '../../components/select-custom/OrganizationSpaceSelect';
import { HeaderCreationModalWrapper } from './header-creation-modal/HeaderCreationModalWrapper';

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
    // justifyContent: 'flex-start',
    // alignItems: 'center',
  },

  burger: {
    display: 'none',
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
  const [organizations, setOrganizations] = useState<SelectItem[] | []>([]);
  const [spaces, setSpaces] = useState<SelectItem[] | []>([]);
  const router = useRouter();
  const pageEntity = router.query.entity || router.pathname.split('/').pop();
  const { currentSpace, currentOrganization } = useCookieContext();
  const { classes } = useStyles();
  const { isOpen, toggleBarOpen } = useLayoutContext();
  const { user } = useAuth();
  const isMediaScreen = useMediaQuery('(max-width: 750px)');

  const items = links.map((link) => (
    <Link key={link.label} className={classes.link} href={link.link}>
      {link.label}
    </Link>
  ));

  useEffect(() => {
    const organizationNameCookie = getCookie('organizationName');
    if (typeof organizationNameCookie === 'string') {
      setOrganizations([{ label: organizationNameCookie, value: currentOrganization || '' }]);
    }

    const spaceNameCookie = getCookie('spaceName');
    if (typeof spaceNameCookie === 'string') {
      const spaceId = currentSpace?._id || '';
      setSpaces([{ label: spaceNameCookie, value: spaceId }]);
    }
  }, []);
  return (
    <Header fixed height={56} className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger className={classes.burger} opened={isOpen} onClick={toggleBarOpen} size="sm" />
          <LogoBanner transparent />
          <Group ml={5} spacing={5} className={classes.links}>
            {items}
          </Group>
          <HeaderCreationModalWrapper />
          {/* <HeaderCreationModal /> */}
        </Group>
        <Group>
          {!isMediaScreen && (
            <>
              <OrganizationSpaceSelect />
              <ColorSchemeToggle size="lg" />
            </>
          )}
        </Group>
      </div>
    </Header>
  );
}
