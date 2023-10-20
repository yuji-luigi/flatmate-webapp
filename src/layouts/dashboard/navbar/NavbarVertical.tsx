import { Fragment, useEffect, useRef, useState } from 'react';
import { ScrollArea, Button, Stack, Drawer, Box, Group, Code } from '@mantine/core';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import useLayoutContext from '../../../../hooks/useLayoutContext';
import useAuth from '../../../../hooks/useAuth';
import { sectionData } from '../../../data';

import { Icons } from '../../../data/icons/icons';
import { PATH_CLIENT } from '../../../path/path-frontend';
import { ProfilePopover } from '../../../components/navigation/ProfilePopover';
import { useCookieContext } from '../../../context/CookieContext';
import { NavbarVerticalItem } from './NavbarVerticalItem';
// import classes from './navbarStyle.module.css';
import { ColorSchemeToggle } from '../../../components/color-schemeToggle/ColorSchemeToggle';
import LogoutButton from './LogoutButton';
import OrganizationSpaceSelect from '../../../components/select-custom/OrganizationSpaceSelect';
import classes from './NavbarVertical.module.css';
import { useCustomMQuery } from '../../../../hooks/useCustomMQuery';
import { getEntityOrUndefinedFromUrl } from '../../../utils/helpers/helper-functions';

// type NavbarConfig = { link: string; label: string; icon: TablerIcon };
// const navBarConfig: NavbarConfig[] = [];

// Object.keys(sectionData).forEach((key: string): void => {
//   const typedKey = key as Sections;
//   const config: NavbarConfig = {
//     link: sectionData[typedKey].link,
//     label: sectionData[typedKey].navbarTitle,
//     icon: /*  Icons[sectionData[typedKey].slice as IconsType] || Icons, */ Icons.home,
//   };
//   navBarConfig.push(config);
// });

// export function NavbarVertical() {
//   const { user, logout } = useAuth();
//   const [active, setActive] = useState('');
//   const { isOpen, closeBar } = useLayoutContext();
//   const { asPath, query } = useRouter();
//   const isMediaScreen = useMediaQuery('(max-width: 750px)');
//   const isSuperAdmin = user?.role === 'super_admin';
//   const { isMobile } = useCustomMQuery();
//   const chooseText = isSuperAdmin ? 'Organization' : 'Space';
//   // const isMobile = useMediaQuery('(max-width: 600px)');

//   const chooseHref = isSuperAdmin ? PATH_CLIENT.chooseOrganization : PATH_CLIENT.chooseRootSpace;

//   if (!user) return null;
//   const links = sectionData.map((section, i) => {
//     return (
//       <Fragment key={section.name}>
//         {section.roles?.includes(user.role) && !section.hide && (
//           <>
//             <p>{section.name}</p>
//             {/* contents are sections: Top, posts,,, */}
//             {section.contents.map((navbarContent) => (
//               <NavbarVerticalItem
//                 key={navbarContent.navbarTitle}
//                 navbarContent={navbarContent}
//                 active={active}
//               />
//             ))}
//           </>
//         )}
//       </Fragment>
//     );
//   });

//   return (
//     <>
//       <nav className={classes.navbar}>
//         <ScrollArea>
//           <div className={classes.navbarMain}>
//             <ProfilePopover />
//             {links.map((navbarData) => navbarData)}
//           </div>

//           <div className={classes.footer}>
//             <Stack>
//               <LogoutButton />
//               {isMediaScreen && (
//                 <>
//                   <Button
//                     className={`${classes.button} ${classes.link}`}
//                     component={Link}
//                     href={chooseHref}
//                   >
//                     Choose {chooseText}
//                   </Button>
//                   <ColorSchemeToggle /* size="lg" */ /*  style={{ alignSelf: 'end' }} */ />
//                 </>
//               )}
//             </Stack>
//           </div>
//         </ScrollArea>
//       </nav>

//       {isMobile && (
//         <Box className={`${classes.invBox} ${isOpen ? classes.fadeIn : ''}`} onClick={closeBar} />
//       )}
//     </>
//   );
// }

const data = [
  { link: '', label: 'Notifications', icon: IconBellRinging },
  { link: '', label: 'Billing', icon: IconReceipt2 },
  { link: '', label: 'Security', icon: IconFingerprint },
  { link: '', label: 'SSH Keys', icon: IconKey },
  { link: '', label: 'Databases', icon: IconDatabaseImport },
  { link: '', label: 'Authentication', icon: Icon2fa },
  { link: '', label: 'Other Settings', icon: IconSettings },
];

export function NavbarVertical() {
  const [active, setActive] = useState('Billing');
  const { user, logout } = useAuth();
  const { isOpen, closeBar } = useLayoutContext();
  const { asPath, query } = useRouter();
  const isMediaScreen = useMediaQuery('(max-width: 750px)');
  const isSuperAdmin = user?.role === 'super_admin';
  const { isMobile } = useCustomMQuery();
  const chooseText = isSuperAdmin ? 'Organization' : 'Space';
  // const isMobile = useMediaQuery('(max-width: 600px)');

  const chooseHref = isSuperAdmin ? PATH_CLIENT.chooseOrganization : PATH_CLIENT.chooseRootSpace;
  const pageEntity = getEntityOrUndefinedFromUrl();
  useEffect(() => {
    if (!pageEntity) {
      setActive('');
    }
  }, [pageEntity]);
  if (!user) return null;
  const _links = sectionData.map((section, i) => {
    return (
      <Fragment key={section.name}>
        {section.roles?.includes(user.role) && !section.hide && (
          <Stack align="start">
            <p>{section.name}</p>
            {/* contents are sections: Top, posts,,, */}
            {section.contents.map((navbarContent) => (
              <NavbarVerticalItem
                key={navbarContent.navbarTitle}
                navbarContent={navbarContent}
                active={active}
                setActive={setActive}
              />
            ))}
          </Stack>
        )}
      </Fragment>
    );
  });
  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar} data-show={isOpen} data-hidden={!isOpen}>
      <ScrollArea>
        <div className={classes.navbarMain}>
          <ProfilePopover />
          {/* {links.map((navbarData) => navbarData)} */}
          {_links}
        </div>

        <div className={classes.footer}>
          <Stack>
            <LogoutButton />
            {isMediaScreen && (
              <>
                <Button
                  className={`${classes.button} ${classes.link}`}
                  component={Link}
                  href={chooseHref}
                >
                  Choose {chooseText}
                </Button>
                <ColorSchemeToggle />
              </>
            )}
          </Stack>
        </div>
      </ScrollArea>
    </nav>
  );
}
